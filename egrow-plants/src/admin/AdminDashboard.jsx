import React from 'react';
import { Link } from 'react-router-dom';
const AdminDashboard = () => {
  const buttons = [
    { path: '/admin/add-category', label: 'Add Category' },
    { path: '/admin/view-categories', label: 'View Categories' },
    { path: '/admin/add-product', label: 'Add Product' },
    { path: '/admin/view-products', label: 'View Products' },
    { path: '/admin/view-orders', label: 'View Orders' },
    { path: '/admin/manage-orders', label: 'Manage Orders' },
    { path: '/admin/view-users', label: 'View Users' },
  ];

  return (
    <>
      <div className="admin-dashboard container mt-4">
        <h2 className="text-center mb-4">Welcome to Admin Dashboard</h2>
        <div className="row">
          {buttons.map((btn, index) => (
            <div key={index} className="col-md-4 mb-4">
              <Link to={btn.path} className="dashboard-card">
                {btn.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
