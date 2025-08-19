import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:7000/category/688765e666053715f4d23b3b')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-5">
      <h3>📦 All Products</h3>
      <table className="table table-bordered mt-3">
        <thead className="thead-dark">
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {products.map(prod => (
            <tr key={prod._id}>
              <td><img src={`http://localhost:7000${prod.image}`} width="60" alt={prod.title} /></td>
              <td>{prod.title}</td>
              <td>₹ {prod.price}</td>
              <td>{prod.categoryId?.name || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewProducts;
