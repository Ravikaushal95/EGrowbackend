import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';

const schema = yup.object().shape({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  otp: yup.string().when('otpSent', {
    is: true,
    then: () => yup.string().required('OTP is required'),
  }),
  newPassword: yup.string().when('otpSent', {
    is: true,
    then: () => yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('New password is required'),
  }),
});

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [otpSent, setOtpSent] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { otpSent: false },
  });

  const onSubmit = async (data) => {
    if (!otpSent) {
      try {
        await axios.post('http://localhost:7000/send-otp', { email: data.email });
        setOtpSent(true);
        setValue('otpSent', true);
        Swal.fire('OTP Sent', 'Check your email for the OTP.', 'success');
      } catch (err) {
        Swal.fire('Error', 'Failed to send OTP. Please try again.', 'error');
      }
    } else {
      try {
        const res = await axios.post('http://localhost:7000/verify-otp', {
          email: data.email,
          otp: data.otp,
          newPassword: data.newPassword,
        });
        Swal.fire('Success', 'Password updated successfully!', 'success').then(() =>
          navigate('/login')
        );
      } catch (err) {
        Swal.fire('Error', err?.response?.data?.message || 'Invalid OTP or email', 'error');
      }
    }
  };

  return (
    <div className="container py-5 d-flex flex-column flex-md-row align-items-center justify-content-center">
      <div className="col-md-6 text-center mb-4 mb-md-0">
        <img
          src="images/forget.jpg"
          alt="Forgot Password"
          className="img-fluid rounded"
          style={{ maxHeight: '400px' }}
        />
      </div>
      <div className="col-md-5">
        <h2 className="mb-4 text-center">Forgot Your Password?</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 shadow rounded bg-light">
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email Address"
              className="form-control"
              {...register('email')}
            />
            {errors.email && <p className="text-danger small">{errors.email.message}</p>}
          </div>

          {otpSent && (
            <>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="form-control"
                  {...register('otp')}
                />
                {errors.otp && <p className="text-danger small">{errors.otp.message}</p>}
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  placeholder="New Password"
                  className="form-control"
                  {...register('newPassword')}
                />
                {errors.newPassword && (
                  <p className="text-danger small">{errors.newPassword.message}</p>
                )}
              </div>
            </>
          )}

          <button type="submit" className={`btn w-100 ${otpSent ? 'btn-success' : 'btn-primary'}`}>
            {otpSent ? 'Verify OTP' : 'Send OTP'}
          </button>

          <div className="mt-3 text-center">
            <Link to="/login" className="text-decoration-none">
              🔙 Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
