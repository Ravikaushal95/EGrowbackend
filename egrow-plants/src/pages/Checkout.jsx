import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, setCartItems } = useCart();
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    address: Yup.string().required('Address is required'),
    phone: Yup.string().required('Phone is required').matches(/^[0-9]{10}$/, 'Phone must be 10 digits'),
    paymentMethod: Yup.string().required()
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    const payload = {
      user: data.name,
      email: data.email,
      address: data.address,
      phone: data.phone,
      items: cartItems.map((item) => ({
        productId: item._id,
        quantity: item.quantity
      })),
      totalAmount
    };

    try {
      await axios.post('http://localhost:7000/place-order', payload);
      alert('✅ Order placed successfully!');
      setCartItems([]);
      navigate('/orders');
    } catch (err) {
  console.error('ORDER ERROR:', err?.response?.data || err.message);
  alert(`❌ Failed to place order: ${err?.response?.data?.message || err.message}`);
}
  };

  return (
    <div className="container py-4">
      <h3>🧾 Checkout</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div className="mb-3">
          <label>Name</label>
          <input type="text" className="form-control" {...register('name')} />
          <p className="text-danger">{errors.name?.message}</p>
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" {...register('email')} />
          <p className="text-danger">{errors.email?.message}</p>
        </div>

        <div className="mb-3">
          <label>Phone</label>
          <input type="text" className="form-control" {...register('phone')} />
          <p className="text-danger">{errors.phone?.message}</p>
        </div>

        <div className="mb-3">
          <label>Address</label>
          <textarea className="form-control" {...register('address')} />
          <p className="text-danger">{errors.address?.message}</p>
        </div>

        <div className="mb-3">
          <label>Payment Method</label>
          <select className="form-control" {...register('paymentMethod')}>
            <option value="cod">Cash on Delivery</option>
            <option value="online">Online Payment</option>
          </select>
        </div>

        <h5>Total: ₹{totalAmount}</h5>

        <button className="btn btn-success mt-2">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
