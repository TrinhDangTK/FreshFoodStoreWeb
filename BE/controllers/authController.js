const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const GOOGLE_AUTH_BASE_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo';

const createAuthToken = (user) => jwt.sign(
  { userId: user._id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);

const getValidRedirectUrl = (rawRedirect) => {
  const fallback = 'http://localhost:5173';

  if (!rawRedirect) return fallback;

  try {
    const url = new URL(rawRedirect);
    if (!['http:', 'https:'].includes(url.protocol)) return fallback;
    return url.toString();
  } catch (error) {
    return fallback;
  }
};

// Hàm xử lý Đăng ký
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!password) {
      return res.status(400).json({ message: 'Vui lòng nhập mật khẩu!' });
    }
    
    // 1. Kiểm tra xem email đã tồn tại trong DB chưa
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Email này đã được sử dụng!' });
    }

    // 2. Băm mật khẩu ra thành chuỗi mã hoá
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Khởi tạo đối tượng User mới
    user = new User({
      name,
      email,
      password: hashedPassword,
      authProvider: 'local'
    });

    // Lệnh .save() này chính là lúc MongoDB TỰ ĐỘNG TẠO Database "freshstore" 
    // và Table "users" nếu chúng chưa tồn tại!
    await user.save(); 

    res.status(201).json({ message: 'Tạo tài khoản thành công!' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

// Hàm xử lý Đăng nhập
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // 1. Tìm người dùng theo Email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Tài khoản không tồn tại!' });
    }
    if (!user.password || user.authProvider === 'google') {
      return res.status(400).json({ message: 'Tài khoản này đăng nhập bằng Google, vui lòng chọn "Đăng nhập với Google".' });
    }

    // 2. So sánh mật khẩu gốc với mật khẩu đã băm trong DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mật khẩu không chính xác!' });
    }

    // 3. Mật khẩu đúng -> Tạo thẻ Token
    const token = createAuthToken(user);

    // 4. Trả kết quả kèm Token và thông tin user về cho Frontend
    res.json({
      message: 'Đăng nhập thành công!',
      token,
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

// Bước 1: Chuyển người dùng tới Google OAuth Consent
exports.googleAuth = async (req, res) => {
  try {
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CALLBACK_URL) {
      return res.status(500).json({ message: 'Thiếu cấu hình Google OAuth trong .env' });
    }

    const redirect = getValidRedirectUrl(req.query.redirect);
    const state = Buffer.from(JSON.stringify({ redirect }), 'utf8').toString('base64url');

    const query = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: process.env.GOOGLE_CALLBACK_URL,
      response_type: 'code',
      scope: 'openid email profile',
      access_type: 'offline',
      prompt: 'consent',
      state
    });

    return res.redirect(`${GOOGLE_AUTH_BASE_URL}?${query.toString()}`);
  } catch (error) {
    return res.status(500).json({ message: 'Không thể bắt đầu đăng nhập Google', error: error.message });
  }
};

// Bước 2: Google callback -> lấy thông tin user -> tạo JWT -> redirect về FE
exports.googleCallback = async (req, res) => {
  try {
    const { code, state } = req.query;

    if (!code) {
      return res.status(400).json({ message: 'Thiếu mã xác thực từ Google' });
    }
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.GOOGLE_CALLBACK_URL) {
      return res.status(500).json({ message: 'Thiếu cấu hình GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET / GOOGLE_CALLBACK_URL' });
    }

    let redirect = 'http://localhost:5173';
    if (state) {
      try {
        const parsedState = JSON.parse(Buffer.from(state, 'base64url').toString('utf8'));
        redirect = getValidRedirectUrl(parsedState.redirect);
      } catch (error) {
        redirect = 'http://localhost:5173';
      }
    }

    let tokenData;
    try {
      const tokenRes = await axios.post(
        GOOGLE_TOKEN_URL,
        new URLSearchParams({
          code,
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          redirect_uri: process.env.GOOGLE_CALLBACK_URL,
          grant_type: 'authorization_code'
        }).toString(),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
      tokenData = tokenRes.data;
    } catch (error) {
      console.error('Google token exchange failed:', error.response?.data || error.message);
      return res.redirect(`${redirect}?error=google_token_exchange_failed`);
    }
    if (!tokenData?.access_token) return res.redirect(`${redirect}?error=google_token_exchange_failed`);

    let profile;
    try {
      const profileRes = await axios.get(GOOGLE_USERINFO_URL, {
        headers: { Authorization: `Bearer ${tokenData.access_token}` }
      });
      profile = profileRes.data;
    } catch (error) {
      console.error('Google profile fetch failed:', error.response?.data || error.message);
      return res.redirect(`${redirect}?error=google_profile_fetch_failed`);
    }
    if (!profile?.email) {
      return res.redirect(`${redirect}?error=google_profile_fetch_failed`);
    }

    const googleId = profile.sub;
    if (!googleId) {
      return res.redirect(`${redirect}?error=google_id_missing`);
    }

    console.log('[Google OAuth] Callback profile:', {
      email: profile.email,
      googleId,
      name: profile.name
    });

    let user;
    try {
      user = await User.findOneAndUpdate(
        {
          $or: [
            { googleId },
            { email: profile.email }
          ]
        },
        {
          $set: {
            name: profile.name || profile.email.split('@')[0],
            email: profile.email,
            googleId,
            authProvider: 'google'
          },
          $setOnInsert: {
            role: 'user'
          }
        },
        {
          upsert: true,
          new: true,
          runValidators: true
        }
      );
      console.log('[Google OAuth] Upsert success:', {
        userId: user?._id?.toString(),
        email: user?.email,
        provider: user?.authProvider
      });
    } catch (error) {
      console.error('Upsert Google user failed:', {
        message: error.message,
        code: error.code,
        keyPattern: error.keyPattern,
        keyValue: error.keyValue
      });
      return res.redirect(`${redirect}?error=google_user_upsert_failed`);
    }

    const appToken = createAuthToken(user);
    const redirectUrl = new URL(redirect);
    redirectUrl.searchParams.set('token', appToken);
    redirectUrl.searchParams.set('login', 'success');
    return res.redirect(redirectUrl.toString());
  } catch (error) {
    return res.status(500).json({ message: 'Lỗi đăng nhập Google', error: error.message });
  }
};
