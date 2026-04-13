const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Hàm xử lý Đăng ký
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
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
      password: hashedPassword
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

    // 2. So sánh mật khẩu gốc với mật khẩu đã băm trong DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mật khẩu không chính xác!' });
    }

    // 3. Mật khẩu đúng -> Tạo thẻ Token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' } // Mặc định ở lại đăng nhập 7 ngày
    );

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
