const express = require('express');
const router = express.Router();

// Nhập khẩu các hàm xử lý từ Controller
const { register, login } = require('../controllers/authController');

// Khai báo các đường dẫn
// Gửi yêu cầu POST lên /api/auth/register sẽ chạy hàm "register"
router.post('/register', register);

// Gửi yêu cầu POST lên /api/auth/login sẽ chạy hàm "login"
router.post('/login', login);

module.exports = router;
