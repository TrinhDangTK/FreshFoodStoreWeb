const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: String,
  oldPrice: String,
  image: String,
  discount: String,
  sold: Number,
  categoryId: { // Khoá liên kết với Category.id bên trên
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
