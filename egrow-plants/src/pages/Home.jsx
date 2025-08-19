import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:7000/categories')
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.error('Error fetching categories:', err);
      });
  }, []);

  return (
    <div className="container py-4">
      <h3 className="mb-4">🌿 Browse by Category</h3>
      <div className="row">
        {categories.map((cat) => (
          <div key={cat._id} className="col-6 col-md-3 mb-4">
            <Link to={`/category/${cat._id}`} className="text-decoration-none text-dark">
              <div className="card shadow-sm h-100">
                <img
                  src={`http://localhost:7000${cat.image}`}
                  alt={cat.name}
                  className="card-img-top"
                  style={{ height: '180px', objectFit: 'cover' }}
                />
                <div className="card-body text-center">
                  <h6 className="card-title mb-0">{cat.name}</h6>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
