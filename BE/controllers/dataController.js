const Category = require('../models/Category');
const Product = require('../models/Product');

// API xả dữ liệu Danh mục
exports.getCategories = async (req, res) => {
  try {
    // Lấy hết không chừa một cọng
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Máy chủ quá tải khi đọc danh mục', error: error.message });
  }
};

// API xả dữ liệu Sản phẩm (Bao gồm cơ chế lọc)
exports.getProducts = async (req, res) => {
  try {
    const { categoryId } = req.query;
    
    // Nếu Frontend gọi /api/products?categoryId=hot-deal, ta sẽ lấy đúng Hot Deal
    // Nếu Frontend chỉ gọi /api/products (không tham số), ta lôi hết cả siêu thị ra
    const filter = categoryId ? { categoryId: categoryId } : {};
    
    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Máy chủ quá tải khi xuất sản phẩm', error: error.message });
  }
};
