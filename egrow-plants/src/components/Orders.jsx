import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;
  const data=JSON.parse(window.localStorage.getItem('data'))
  const email=data.email;
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`http://localhost:7000/orders?email=${email}`);
      setOrders(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch orders:', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const cancelOrder = async (orderId) => {
    try {
      const res = await axios.put(`http://localhost:7000/cancel/${orderId}`);
      alert('❌ Order cancelled');
      fetchOrders(); // refresh list
    } catch (err) {
      alert('Failed to cancel order');
      console.error(err);
    }
  };

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container py-4">
      <h3>📦 All Orders</h3>
      <div className="table-responsive mt-4">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Id</th>
              <th>Order ID</th>
              <th>User</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Ordered At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order, i) => (
              <tr key={order._id}>
                <td>{indexOfFirstOrder + i + 1}</td>
                <td>{order._id}</td>
                <td>{order.user}</td>
                <td>{order.email}</td>
                <td>{order.phone}</td>
                <td>{order.address}</td>
                <td>
                  <ul className="mb-0">
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        {item?.productId?.title || 'Deleted Product'} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>₹{order.totalAmount}</td>
                <td>{order.status}</td>
                <td>{new Date(order.orderedAt).toLocaleString()}</td>
                <td>
                  {order.status === 'Cancelled' || order.status === 'Delivered' ? (
                    <span className="text-muted">N/A</span>
                  ) : (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => cancelOrder(order._id)}
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-center mt-3">
        <nav>
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, idx) => (
              <li
                key={idx}
                className={`page-item ${currentPage === idx + 1 ? 'active' : ''}`}
              >
                <button className="page-link" onClick={() => paginate(idx + 1)}>
                  {idx + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Orders;