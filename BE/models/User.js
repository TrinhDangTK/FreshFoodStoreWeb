const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Vui lòng nhập tên đăng nhập'],
  },
  email: {
    type: String,
    required: [true, 'Vui lòng nhập định dạng email'],
    unique: true, // Không cho phép 2 tài khoản trùng email
  },
  password: {
    type: String,
    required: [true, 'Vui lòng nhập mật khẩu'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // Quy định đối tượng sử dụng
    default: 'user',
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
