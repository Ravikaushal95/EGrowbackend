import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCart } from '../pages/CartContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CategoryPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:7000/category/${id}`)
      .then(res => {
        setProducts(res.data);
        const defaultQty = {};
        res.data.forEach(prod => {
          defaultQty[prod._id] = 1;
        });
        setQuantities(defaultQty);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleQtyChange = (productId, value) => {
    const newQty = Math.max(1, parseInt(value) || 1);
    setQuantities(prev => ({ ...prev, [productId]: newQty }));
  };

  const incrementQty = (productId) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1,
    }));
  };

  const decrementQty = (productId) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) - 1),
    }));
  };

  const handleAddToCart = (product) => {
    const Newdata = JSON.parse(localStorage.getItem('data'));
    const email = Newdata?.email;

    if (!email) {
      toast.error("🛑 Please login to add items to cart!");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
      return;
    }

    const quantity = quantities[product._id] || 1;
    addToCart(product, quantity);
    toast.success(`${product.title} added to cart 🛒`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <div className="container py-4">
      <h3>🛒 Products in this Category</h3>
      <div className="row mt-4">
        {products.map(prod => (
          <div key={prod._id} className="col-md-3 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={`http://localhost:7000${prod.image}`}
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover' }}
                alt={prod.title}
              />
              <div className="card-body d-flex flex-column">
                <h6 className="card-title">{prod.title}</h6>
                <p className="text-success fw-bold">₹ {prod.price}</p>

                <div className="input-group mb-2">
                  <button className="btn btn-outline-secondary" onClick={() => decrementQty(prod._id)}>-</button>
                  <input
                    type="number"
                    className="form-control text-center"
                    value={quantities[prod._id] || 1}
                    min="1"
                    onChange={(e) => handleQtyChange(prod._id, e.target.value)}
                  />
                  <button className="btn btn-outline-secondary" onClick={() => incrementQty(prod._id)}>+</button>
                </div>

                <button
                  className="btn btn-sm btn-success mt-auto"
                  onClick={() => handleAddToCart(prod)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <p className="text-muted">No products found in this category.</p>
        )}
      </div>

      {/* ✅ Place ToastContainer here */}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default CategoryPage;
