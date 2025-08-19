import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  mobile: yup.string().matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits').required('Mobile number is required'),
  address: yup.string().required('Address is required'),
  profile: yup.mixed().test("fileSize", "File is Required", (value) => value.length > 0).required()
});

function Signup() {
  const nav=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const formData = new FormData()
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("mobile", data.mobile);
    formData.append("password", data.password);
    formData.append("address", data.address);
    formData.append("profile", data.profile[0]);
    const response = await axios.post("http://localhost:7000/user-register", formData)
    if (response.data.code == 201) {
      Swal.fire({
        title: "User Registration",
        text: `${response.data.message}`,
        icon: "success"
      });
      nav('/login')
    }
    else{
      Swal.fire({
        title:"User Registeration",
        text:`${response.data.message}`,
        icon:"error"
      })
    }
  };

  return (
    <div className="container-fluid signup-bg d-flex align-items-center justify-content-center">
      <div className="row signup-inner w-100 rounded shadow m-2">
        <div className="col-12 col-md-6 text-white d-flex flex-column justify-content-center p-4 mb-4 mb-md-0">
          <h2 className='fw-bold'>Welcome to Signup</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, ad.</p>
        </div>

        <div className="col-12 col-md-6 signup-form text-white p-4 glass-effect">
          <h3 className='mb-4'>Create Account</h3>
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="row">
              <div className="col-md-6 mb-4">
                <label>Name</label>
                <input className="form-control border-bottom-only" autoComplete='off' {...register('name')} />
                {errors.name && <p className='text-danger'>{errors.name.message}</p>}
              </div>

              <div className="col-md-6 mb-4">
                <label>Email</label>
                <input className="form-control border-bottom-only" type="email" autoComplete='off' {...register('email')} />
                {errors.email && <p className='text-danger'>{errors.email.message}</p>}
              </div>

              <div className="col-md-6 mb-4">
                <label>Mobile</label>
                <input className="form-control border-bottom-only" type="text" autoComplete='off' {...register('mobile')} />
                {errors.mobile && <p className='text-danger'>{errors.mobile.message}</p>}
              </div>

              <div className="col-md-6 mb-4">
                <label>Address</label>
                <input className="form-control border-bottom-only" type="text" autoComplete='off' {...register('address')} />
                {errors.address && <p className='text-danger'>{errors.address.message}</p>}
              </div>

              <div className="col-md-6 mb-4">
                <label>Password</label>
                <input className="form-control border-bottom-only" type="password" autoComplete='off' {...register('password')} />
                {errors.password && <p className='text-danger'>{errors.password.message}</p>}
              </div>

              <div className="col-md-6 mb-4">
                <label>Profile Photo</label>
                <input className="form-control border-bottom-only" type="file" {...register('profile')} />
                {errors.profile && <p className='text-danger'>{errors.profile.message}</p>}
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100 mt-3">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
