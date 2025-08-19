import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  price: Yup.number().required('Price is required').positive(),
  description: Yup.string().required('Description is required'),
  categoryId: Yup.string().required('Category is required'),
  image: Yup.mixed().required('Product image is required')
});

const AddProduct = () => {
  const [categories, setCategories] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const image = watch('image');

  useEffect(() => {
    axios.get('http://localhost:7000/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('price', data.price);
    formData.append('description', data.description);
    formData.append('categoryId', data.categoryId);
    formData.append('image', data.image[0]); // File input is array

    try {
      const res = await axios.post('http://localhost:7000/add-product', formData);
      alert(res.data.message);
    } catch (err) {
      alert('Error adding product');
    }
  };

  return (
    <div className="container mt-5">
      <h3>Add Product</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 shadow bg-white" encType="multipart/form-data">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Title"
          {...register('title')}
        />
        <p className="text-danger">{errors.title?.message}</p>

        <input
          type="number"
          className="form-control mb-2"
          placeholder="Price"
          {...register('price')}
        />
        <p className="text-danger">{errors.price?.message}</p>

        <textarea
          className="form-control mb-2"
          placeholder="Description"
          {...register('description')}
        />
        <p className="text-danger">{errors.description?.message}</p>

        <select className="form-control mb-2" {...register('categoryId')}>
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
        <p className="text-danger">{errors.categoryId?.message}</p>

        <input
          type="file"
          className="form-control mb-2"
          onChange={(e) => setValue('image', e.target.files)}
        />
        <p className="text-danger">{errors.image?.message}</p>

        <button className="btn btn-success">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
