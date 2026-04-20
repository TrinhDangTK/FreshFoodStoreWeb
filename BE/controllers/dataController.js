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

// API xả dữ liệu Sản phẩm (Hỗ trợ tìm kiếm, lọc giá và sắp xếp)
exports.getProducts = async (req, res) => {
  try {
    const { categoryId, search, minPrice, maxPrice, sort } = req.query;
    
    const filter = {};

    // 1. Lọc theo danh mục
    // Nếu categoryId là 'search' hoặc không có, ta coi như tìm toàn cục
    if (categoryId && categoryId !== 'search' && categoryId !== 'all') {
      filter.categoryId = categoryId;
    }

    // 2. Tìm kiếm theo tên (Regex case-insensitive)
    if (search && search.trim() !== '') {
      const escapedSearch = search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      filter.name = { $regex: escapedSearch, $options: 'i' };
    }

    // 3. Lọc theo khoảng giá
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);
    if (!isNaN(min) || !isNaN(max)) {
      filter.priceNumeric = {};
      if (!isNaN(min)) filter.priceNumeric.$gte = min;
      if (!isNaN(max)) filter.priceNumeric.$lte = max;
    }
    
    // Tạo Query và thực thi Sắp xếp
    let productQuery = Product.find(filter);

    if (sort) {
      switch (sort) {
        case 'price-asc':
          productQuery = productQuery.sort({ priceNumeric: 1 });
          break;
        case 'price-desc':
          productQuery = productQuery.sort({ priceNumeric: -1 });
          break;
        case 'name-asc':
          productQuery = productQuery.sort({ name: 1 });
          break;
        case 'name-desc':
          productQuery = productQuery.sort({ name: -1 });
          break;
        default:
          productQuery = productQuery.sort({ createdAt: -1 });
      }
    } else {
      productQuery = productQuery.sort({ createdAt: -1 });
    }
    
    const products = await productQuery;
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Máy chủ quá tải khi xuất sản phẩm', error: error.message });
  }
};
