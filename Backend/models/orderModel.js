const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String },
  phone: { type: String },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  orderedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
