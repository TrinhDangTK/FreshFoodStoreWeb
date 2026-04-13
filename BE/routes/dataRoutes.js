const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

// Định nghĩa các đường dẫn API cho Dữ liệu
router.get('/categories', dataController.getCategories);
router.get('/products', dataController.getProducts);

module.exports = router;
