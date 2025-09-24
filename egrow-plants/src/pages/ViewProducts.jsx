import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseurl } from '../services/services';

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get(`${baseurl}/all-products`)
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
              <td><img src={`${baseurl}/${prod?.image}`} width="60" alt={prod.title} /></td>
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
