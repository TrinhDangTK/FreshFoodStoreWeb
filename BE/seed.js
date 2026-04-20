require('dotenv').config({ path: __dirname + '/.env' });
const mongoose = require('mongoose');
const Category = require('./models/Category');
const Product = require('./models/Product');

// Dữ liệu danh mục rút trích từ Frontend
const categoriesData = [
  { id: 'hot-deal', name: 'HOT DEAL', highlight: true },
  { id: 'dry-food', name: 'THỰC PHẨM KHÔ', highlight: false },
  { id: 'homemade', name: 'TD MART KITCHEN HOMEMADE', highlight: false },
  { id: 'processed', name: 'THỰC PHẨM SƠ CHẾ', highlight: false },
  { id: 'vegetables', name: 'RAU CỦ QUẢ CÁC LOẠI', highlight: false },
  { id: 'fruits', name: 'TRÁI CÂY TƯƠI', highlight: false },
  { id: 'seafood', name: 'HẢI SẢN TƯƠI SỐNG', highlight: false }
];

// Dữ liệu sản phẩm thô + Được tự động nhân bản cho đủ tối thiểu 10 SP/danh mục
const rawProducts = {
  'hot-deal': [
    { name: '[RTC] Ba Rọi Kho Đậu Hủ (Khay 500g)', price: '79,000đ', oldPrice: '89,000đ', discount: '11%', image: '/assets/hot_deal_pork_tofu.png' },
    { name: '[RTC] Bắp Cải Trái Tim Cắt Sẵn', price: '17,400đ', oldPrice: '20,700đ', discount: '16%', image: '/assets/hot_deal_cabbage.png' },
    { name: '[RTC] Bắp Cải Xào Cà Chua', price: '30,000đ', oldPrice: '39,000đ', discount: '23%', image: '/assets/hot_deal_cabbage.png' },
    { name: '[RTC] Cà Chua Dồn Thịt 3S', price: '59,000đ', oldPrice: '69,000đ', discount: '14%', image: '/assets/hot_deal_stuffed_tomato.png' },
    { name: '[RTC] Cá Lóc Kho Tiêu', price: '99,000đ', oldPrice: '159,000đ', discount: '38%', image: '/assets/hot_deal_pork_tofu.png' },
    { name: '[RTC] Canh Bí Đao Dồn Thịt', price: '50,000đ', oldPrice: '69,000đ', discount: '28%', image: '/assets/hot_deal_stuffed_tomato.png' }
  ],
  'fresh-meat': [ // Không nằm trên thanh NAV nhưng có trong data
    { name: 'Nạc Dăm Heo BAF', price: '67,800đ', image: '/assets/banner_meat.png' },
    { name: 'Da Heo Cắt Sợi', price: '48,900đ', image: '/assets/banner_meat.png' },
    { name: 'Ba Rọi Heo Meat Master', price: '91,800đ', image: '/assets/banner_meat.png' },
    { name: 'Ba Rọi Heo BAF', price: '69,800đ', image: '/assets/banner_meat.png' },
    { name: 'Bắp Hoa Bò Úc', price: '162,000đ', image: '/assets/banner_meat.png' },
    { name: 'Đầu Thăn Ngoại Bò Úc', price: '267,000đ', image: '/assets/banner_meat.png' }
  ],
  'fruits': [
    { name: 'Xoài Cát Hòa Lộc', price: '120,000đ', image: '/assets/banner_fruits.png' },
    { name: 'Nho Xanh Ninh Thuận', price: '85,000đ', image: '/assets/banner_fruits.png' },
    { name: 'Dưa Hấu Không Hạt', price: '65,000đ', image: '/assets/banner_fruits.png' },
    { name: 'Táo Gala Mỹ', price: '110,000đ', image: '/assets/banner_fruits.png' },
    { name: 'Chuối Già Nam Mỹ', price: '45,000đ', image: '/assets/banner_fruits.png' },
    { name: 'Cam Sành Vĩnh Long', price: '35,000đ', image: '/assets/banner_fruits.png' }
  ],
  'processed': [
    { name: 'Chả Giò Rế Tôm Thịt', price: '65,000đ', image: '/assets/hot_deal_pork_tofu.png' },
    { name: 'Há Cảo Tôm Thịt', price: '55,000đ', image: '/assets/hot_deal_pork_tofu.png' },
    { name: 'Bò Viên Gân', price: '80,000đ', image: '/assets/banner_meat.png' },
    { name: 'Cá Viên Chiên Mắm', price: '45,000đ', image: '/assets/banner_meat.png' },
    { name: 'Gà Ủ Muối Xông Khói', price: '190,000đ', image: '/assets/banner_meat.png' },
    { name: 'Xúc Xích Đức Vissan', price: '52,000đ', image: '/assets/banner_meat.png' }
  ],
  'seafood': [
    { name: 'Tôm Sú Nguyên Con', price: '185,000đ', image: '/assets/banner_seafood.png' },
    { name: 'Mực Ống Làm Sạch', price: '150,000đ', image: '/assets/banner_seafood.png' },
    { name: 'Cá Hú Cắt Khúc', price: '75,000đ', image: '/assets/banner_seafood.png' },
    { name: 'Cá Điêu Hồng Làm Sạch', price: '68,000đ', image: '/assets/banner_seafood.png' },
    { name: 'Cồi Sò Điệp', price: '110,000đ', image: '/assets/banner_seafood.png' },
    { name: 'Bạch Tuộc Tươi', price: '135,000đ', image: '/assets/banner_seafood.png' }
  ],
  'homemade': [
    { name: 'Cơm Gà Xối Mỡ', price: '45,000đ', image: '/assets/hot_deal_pork_tofu.png' },
    { name: 'Thịt Kho Tiêu', price: '65,000đ', image: '/assets/hot_deal_pork_tofu.png' },
    { name: 'Canh Chua Cá Lóc', price: '55,000đ', image: '/assets/hot_deal_stuffed_tomato.png' },
    { name: 'Gà Kho Gừng', price: '70,000đ', image: '/assets/hot_deal_pork_tofu.png' },
    { name: 'Sườn Xào Chua Ngọt', price: '85,000đ', image: '/assets/hot_deal_stuffed_tomato.png' },
    { name: 'Đậu Hũ Tứ Xuyên chay', price: '40,000đ', image: '/assets/hot_deal_stuffed_tomato.png' }
  ],
  'vegetables': [
    { name: 'Bắp Cải Trái Tim', price: '15,000đ', image: '/assets/hot_deal_cabbage.png' },
    { name: 'Xà Lách Mỡ Đà Lạt', price: '25,000đ', image: '/assets/hot_deal_cabbage.png' },
    { name: 'Cà Chua Xanh', price: '18,000đ', image: '/assets/hot_deal_stuffed_tomato.png' },
    { name: 'Cà Rốt Đà Lạt', price: '22,000đ', image: '/assets/hot_deal_cabbage.png' },
    { name: 'Khoai Tây', price: '28,000đ', image: '/assets/hot_deal_cabbage.png' },
    { name: 'Hành Tây', price: '12,000đ', image: '/assets/hot_deal_cabbage.png' }
  ],
  'dry-food': [
    { name: 'Gạo ST25 Ông Cua (Túi 5Kg)', price: '180,000đ', image: '/assets/hot_deal_cabbage.png' },
    { name: 'Nước Mắm Phú Quốc 40 Độ Đạm', price: '85,000đ', image: '/assets/hot_deal_cabbage.png' },
    { name: 'Dầu Ăn Neem Tràng An (1L)', price: '55,000đ', image: '/assets/hot_deal_pork_tofu.png' },
    { name: 'Miến Dong Hữu Cơ (500g)', price: '45,000đ', image: '/assets/hot_deal_cabbage.png' },
    { name: 'Bún Khô Trắng Thái', price: '32,000đ', image: '/assets/hot_deal_cabbage.png' },
    { name: 'Tương Ớt Chinsu Su Su', price: '18,000đ', image: '/assets/hot_deal_stuffed_tomato.png' }
  ]
};

// Hàm mồi dữ liệu (Seed)
const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Đang quét dọn Database cũ...');
    await Category.deleteMany();
    await Product.deleteMany();

    console.log('Bơm Danh Mục vào MongoDB...');
    await Category.insertMany(categoriesData);

    console.log('Bơm Sản Phẩm (Đảm bảo tối thiểu 10/danh mục)...');
    const allProductsToInsert = [];

    // Duyệt qua từng danh mục trong object thô
    for (const [categoryId, products] of Object.entries(rawProducts)) {
      // Nhồi vào mảng chung
      products.forEach(p => {
        const numeric = parseInt(p.price.replace(/\D/g, '')) || 0;
        allProductsToInsert.push({ ...p, categoryId, priceNumeric: numeric });
      });

      // Nếu danh mục này chưa đủ 10, sinh thêm tự động
      const diff = 10 - products.length;
      if (diff > 0) {
        const samplePhoto = products[0].image; // Lấy tạm ảnh của thằng đầu tiên
        for (let i = 1; i <= diff; i++) {
          allProductsToInsert.push({
            name: `Sản phẩm ${categoryId} (Loại ${i}) - Mới Về`,
            price: `${(Math.floor(Math.random() * 50) + 10) * 1000}đ`,
            priceNumeric: (Math.floor(Math.random() * 50) + 10) * 1000,
            oldPrice: null,
            image: samplePhoto,
            categoryId: categoryId
          });
        }
      }
    }

    await Product.insertMany(allProductsToInsert);
    console.log('NHẬP LIỆU THÀNH CÔNG! Đã bơm đủ chuẩn min 10 SP/Category.');
    process.exit();
  } catch (error) {
    console.error('Lỗi nhập liệu:', error);
    process.exit(1);
  }
};

seedDatabase();
