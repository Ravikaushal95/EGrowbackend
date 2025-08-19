import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const AdminLogin = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

const onSubmit = async (data) => {
  try {
    const res = await axios.post('http://localhost:7000/admin-login', data);
    if (res.data.success) {
      localStorage.setItem("role", "admin");
      localStorage.setItem("data", JSON.stringify(res.data.data));

      // 🛠 Trigger re-render in App.js
      window.dispatchEvent(new Event("storage"));

      alert('Login successful!');
      navigate('/admin/dashboard');
    } else {
      alert('Invalid credentials');
    }
  } catch (err) {
    alert('Server error');
  }
};

  return (
    <div className="container mt-5">
      <h2 className="text-center">Admin Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto p-4 shadow" style={{ maxWidth: 400 }}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            {...register('email')}
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            {...register('password')}
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
