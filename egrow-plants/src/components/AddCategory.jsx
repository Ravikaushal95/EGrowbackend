import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
const schema = Yup.object().shape({
  name: Yup.string().required('Category name is required'),
  image: Yup.mixed()
    .required('Category image is required')
    .test('fileExists', 'Please upload a valid image', (value) => value && value.length > 0),
});

const AddCategory = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('image', data.image[0]); // Only 1 image

    try {
      const res = await axios.post('http://localhost:7000/add-category', formData);
      if (res.data.success) {
        alert('Category added successfully!');
        reset(); // clear form
      } else {
        alert('Failed to add category');
      }
    } catch (err) {
      console.error(err);
      alert('Server error');
    }
  };

  return (
    <div className="container mt-5">
      <h3>Add New Category</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 shadow-sm bg-white" encType="multipart/form-data">
        <div className="mb-3">
          <label>Category Name</label>
          <input
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            {...register('name')}
          />
          <div className="invalid-feedback">{errors.name?.message}</div>
        </div>

        <div className="mb-3">
          <label>Category Image</label>
          <input
            type="file"
            accept="image/*"
            className={`form-control ${errors.image ? 'is-invalid' : ''}`}
            {...register('image')}
          />
          <div className="invalid-feedback">{errors.image?.message}</div>
        </div>

        <button type="submit" className="btn btn-success">Add Category</button>
      </form>
    </div>
  );
};

export default AddCategory;
