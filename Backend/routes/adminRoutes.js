const express = require("express");
const {
  adminController,
  adminLoginController
} = require('../controllers/adminController');

const {
  addCategory,
  getCategories,
  deleteCategory,
} = require('../controllers/categoryController');
const {
  addProduct,
  getAllProducts,
  getProductsByCategory 
} = require('../controllers/productController');
const {
  placeOrder,
  getOrders,
  updateOrderStatus,
  deleteOrder,
  cancelOrder ,
} = require('../controllers/orderController');
const { getAllUsersController, getAllUsers, deleteUser  } = require('../controllers/userController');
const adminAuth = require('../middleware/adminAuth');
const adminRoute = express.Router()
adminRoute.get('/admin-get', adminController);
adminRoute.post('/admin-register', adminController);
adminRoute.post('/admin-login', adminLoginController);
adminRoute.post('/add-category', addCategory);          
adminRoute.get('/categories', getCategories);        
adminRoute.post('/add-product', addProduct);             
adminRoute.get('/all-products', getAllProducts);
adminRoute.post('/place-order', placeOrder);
adminRoute.get('/orders', getOrders);
adminRoute.put('/cancel/:id', cancelOrder);
adminRoute.put('/order-status/:id', updateOrderStatus);
adminRoute.delete('/order/:id', deleteOrder);
adminRoute.delete('/admin/delete-category/:id',deleteCategory);
adminRoute.get('/admin/users', getAllUsersController);
adminRoute.get('/users', getAllUsers);
adminRoute.delete('/user/:id', deleteUser); 
adminRoute.get('/category/:id', getProductsByCategory);

module.exports = { adminRoute };
