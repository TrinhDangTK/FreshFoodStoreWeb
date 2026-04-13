// ======= KHỞI TẠO MÁY CHỦ BẰNG EXPRESS =======
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Lệnh này giúp đọc file .env

const app = express();

// ======= CẤU HÌNH BẢO VỆ & DỮ LIỆU =======
// Cho phép Frontend React (cổng 5173) gọi API từ Server này (cổng 5000)
app.use(cors());

// Giúp Server có thể đọc được dạng dữ liệu JSON mà Frontend gửi lên
app.use(express.json());

// ======= KẾT NỐI MONGODB =======
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Kết nối MongoDB thành công!'))
  .catch((err) => console.log('Lỗi kết nối MongoDB:', err));

const authRoutes = require('./routes/authRoutes');
const dataRoutes = require('./routes/dataRoutes');

// ======= THIẾT LẬP ROUTE (ĐƯỜNG DẪN) CƠ BẢN =======
// Khai báo API người dùng
app.use('/api/auth', authRoutes);

// Khai báo API dữ liệu cửa hàng (Sản phẩm, Danh mục)
app.use('/api', dataRoutes);

// Một đường dẫn test đơn giản báo hiệu server sống sót
app.get('/', (req, res) => {
  res.send('Chào mừng đến với hệ thống API của TD Mart / FreshStore!');
});

// ======= KHỞI ĐỘNG SERVER =======
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Máy chủ Backend đang chạy tít tại cổng http://localhost:${PORT}`);
});
