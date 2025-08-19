const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: Number,
  description: String,
  image: String,
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }
});

module.exports = mongoose.model('Product', productSchema);
