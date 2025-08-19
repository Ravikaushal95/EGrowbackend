import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderTable = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    axios.get('http://localhost:7000/orders')
      .then(res => setOrders(res.data))
      .catch(err => console.error('Failed to load orders', err));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = (id, status) => {
    axios.put(`http://localhost:7000/order-status/${id}`, { status })
      .then(() => fetchOrders())
      .catch(err => console.error('Failed to update status', err));
  };

  const deleteOrder = (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      axios.delete(`http://localhost:7000/order/${id}`)
        .then(() => fetchOrders())
        .catch(err => console.error('Failed to delete order', err));
    }
  };

  return (
    <div className="container mt-4">
      <h3>📦 All Orders</h3>
      <h5>Total Orders: {orders.length}</h5> {/* ✅ Total order count added */}

      <div className="table-responsive mt-3">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Ordered At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order.user}</td>
                <td>{order.email}</td>
                <td>{order.address}</td>
                <td>{order.phone}</td>
                <td>
                  {order.items.map(item => (
                    <div key={item.productId?._id}>
                      🪴 <strong>{item.productId?.title}</strong> x {item.quantity}<br />
                      <img src={`http://localhost:7000${item.productId?.image}`} width="40" alt="product" />
                    </div>
                  ))}
                </td>
                <td>₹ {order.totalAmount}</td>
                <td>
                  <select
                    className="form-select"
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                  >
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </td>
                <td>{new Date(order.orderedAt).toLocaleString()}</td>
                <td>
                  <button className="btn btn-sm btn-danger" onClick={() => deleteOrder(order._id)}>
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center text-muted">No orders found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
