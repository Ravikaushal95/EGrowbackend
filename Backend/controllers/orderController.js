const Order = require('../models/orderModel');

// ➕ Place Order
exports.placeOrder = async (req, res) => {
  try {
    const { user, email, address, phone, items, totalAmount } = req.body;

    const newOrder = new Order({
      user,
      email,
      address,
      phone,
      items,
      totalAmount
    });

    await newOrder.save();
    res.status(201).json({ success: true, message: 'Order placed successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Order placement failed' });
  }
};

// 📄 View All Orders
exports.getOrders = async (req, res) => {
  try {
    const { email } = req.query;
    let query = {};
    if (email) {
      query.email = email;
    }

    const orders = await Order.find(query).populate('items.productId');
    res.json(orders);
  } catch (err) {
    console.error('❌ Failed to fetch orders:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


// ✏️ Update Order Status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });

    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.json({ success: true, message: 'Order status updated', order });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update order' });
  }
};

// ❌ Delete Order
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndDelete(id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.json({ success: true, message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete order' });
  }
};
exports.cancelOrder = async (req, res) => {
  const orderId = req.params.id;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Optional: prevent cancelling if already cancelled or delivered
    if (order.status === 'Cancelled' || order.status === 'Delivered') {
      return res.status(400).json({ message: `Cannot cancel an order that's already ${order.status}` });
    }

    order.status = 'Cancelled';
    await order.save();

    res.json({ message: 'Order cancelled successfully', order });
  } catch (err) {
    console.error('❌ Cancel Order Error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};