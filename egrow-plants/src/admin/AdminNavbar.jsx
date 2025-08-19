// src/admin/AdminNavbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('data');
    navigate('/admin/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/admin/dashboard">
        AdminPanel
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#adminNavbar"
        aria-controls="adminNavbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="adminNavbar">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/admin/add-category">
              Add Category
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/view-categories">
              View Categories
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/add-product">
              Add Product
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/view-products">
              View Products
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/view-users">
              View Users
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/view-orders">
              View Orders
            </Link>
          </li>
        </ul>
        <button onClick={handleLogout} className="btn btn-outline-light">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
