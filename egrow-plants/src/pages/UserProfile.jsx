import React, { useEffect, useState } from 'react';
import axios from 'axios';

const excludedFields = ['password', 'createdAt', 'updatedAt', '__v', '_id', 'profileName'];

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('data'));
    if (userData) {
      setUser(userData);
      fetchOrders(userData.email);
    }
  }, []);

  const fetchOrders = async (email) => {
    try {
      const res = await axios.get(`http://localhost:7000/orders?email=${email}`);
      if (res.data.success) {
        setOrders(res.data.orders);
      } else {
        setOrders(res.data); // in case res.data is array directly
      }
    } catch (err) {
      console.error('Failed to fetch orders', err);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      await axios.put(`http://localhost:7000/cancel/${orderId}`);
      alert('❌ Order cancelled');
      fetchOrders(user.email); // refresh
    } catch (err) {
      alert('Failed to cancel order');
      console.error(err);
    }
  };

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">My Profile</h2>
      <div className="card shadow p-4 mb-5">
        <div className="row">
          <div className="col-md-4 text-center">
            <img
              src={
                user.profile
                  ? `http://localhost:7000/upload/${user.profile}`
                  : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
              }
              alt="Profile"
              className="img-fluid rounded-circle border border-3"
              style={{ maxWidth: 150, height: 150, objectFit: 'cover' }}
            />
          </div>
          <div className="col-md-8">
            <h4 className="mb-3">{user.name}</h4>
            <ul className="list-group list-group-flush">
              {Object.entries(user).map(([key, value]) => {
                if (excludedFields.includes(key) || key === 'profile') return null;
                return (
                  <li key={key} className="list-group-item">
                    <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                  </li>
                );
              })}
              <li className="list-group-item">
                <strong>Role:</strong> {localStorage.getItem('role')}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ✅ Orders Section */}
      <h3 className="text-center mb-3">My Orders</h3>
      {orders.length === 0 ? (
        <p className="text-center text-muted">You have not placed any orders yet.</p>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th>S.N</th>
                  <th>Order ID</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Ordered At</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order, index) => (
                  <tr key={order._id}>
                    <td>{indexOfFirstOrder + index + 1}</td>
                    <td>{order._id}</td>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
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
        </>
      )}
    </div>
  );
};

export default UserProfile;
