const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true // Ví dụ: 'hot-deal', 'fresh-meat'
  },
  name: {
    type: String,
    required: true // Ví dụ: 'HOT DEAL', 'THỊT TƯƠI'
  },
  highlight: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
