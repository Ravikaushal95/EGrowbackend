import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
const schema = yup.object().shape({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});
function Login() {
  const nav = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = async (data) => {
    const login = await axios.post("http://localhost:7000/user-login", data)
    if (login.data.code == 200) {
      localStorage.setItem("data", JSON.stringify(login?.data?.data));
      localStorage.setItem("role", "user"); // ✅ Set role
      Swal.fire({
        title: "User Login",
        text: `${login.data.message}`,
        icon: 'success'
      });
      nav('/');
    }
    else {
      Swal.fire({
        title: "User Login",
        text: `${login.data.message}`,
        icon: 'error'
      })
    }
  }
  return (
    <div className="container-fluid login-section">
      <div className="row login-box">
        <div className="col-md-6 login-form">
          <h2>Welcome back!</h2>
          <p className="text-muted">
            Simplify your workflow and boost your productivity with Tuga’s App.
            Get started for free.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="UserEmail" {...register('email')} />
              {errors.email && <p className='text-danger'>{errors.email.message}</p>}
            </div>
            <div className="mb-3">
              <input type="password" className="form-control" placeholder="Password" {...register('password')} />
              {errors.password && <p className='text-danger'>{errors.password.message}</p>}
            </div>
            <div className="d-flex justify-content-end mb-3">
              <Link to="/forget" className="text-muted small">Forgot Password?</Link>
            </div>
            <button className="btn btn-dark w-100 btn-login mb-3">Login</button>

            <div className="text-center mb-3 text-muted">or continue with</div>
            <div className="d-flex justify-content-center social-btns mb-4">
              <img src="https://img.icons8.com/ios-filled/50/google-logo.png" alt="Google" />
              <img src="https://img.icons8.com/ios-filled/50/mac-os.png" alt="Apple" />
              <img src="https://img.icons8.com/ios-filled/50/facebook.png" alt="Facebook" />
            </div>

            <div className="text-center text-muted">
              Not a member? <Link to='/signup' className="register-link">Register now</Link>
            </div>
          </form>
        </div>

        {/* Right: Illustration */}
        <div className="col-md-6 right-illustration d-none d-md-flex">
          <img
            src="images/login1.jpg"
            alt="Illustration"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
