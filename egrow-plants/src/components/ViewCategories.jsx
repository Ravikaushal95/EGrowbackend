import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewCategories = () => {
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:7000/categories');
      if (Array.isArray(res.data)) {
        setCategories(res.data);
      } else {
        alert("Invalid data format");
      }
    } catch (err) {
      console.error('Error fetching categories', err);
      alert("Server error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      const res = await axios.delete(`http://localhost:7000/admin/delete-category/${id}`);
      if (res.data.success) {
        alert("Category deleted!");
        setCategories(prev => prev.filter(cat => cat._id !== id));
      } else {
        alert("Failed to delete category");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting category");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="container mt-5">
      <h3 className="mb-4">All Categories</h3>
      <div className="row">
        {categories.length === 0 ? (
          <p>No categories found.</p>
        ) : (
          categories.map(cat => (
            <div className="col-md-3 mb-4" key={cat._id}>
              <div className="card shadow-sm">
                <img
                  src={`http://localhost:7000${cat.image}`}
                  alt={cat.name}
                  className="card-img-top"
                  style={{ height: '180px', objectFit: 'cover' }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{cat.name}</h5>
                  <button
                    className="btn btn-danger btn-sm w-100 mt-2"
                    onClick={() => handleDelete(cat._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewCategories;
