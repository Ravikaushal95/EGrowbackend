import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Home from './pages/Home';
import Plants from './pages/Plants';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ForgetPassword from './pages/ForgetPassword';
import ContactUs from './pages/ContactUs';
import CategoryPage from './components/CategoryPage';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import AdminDashboard from './admin/AdminDashboard';
import AdminLogin from './admin/AdminLogin';
import AddCategory from './components/AddCategory';
import ViewCategories from './components/ViewCategories';
import AddProduct from './components/AddProduct';
import ViewUsers from './components/ViewUsers';
import ViewOrders from './components/ViewOrders';
import AdminNavbar from './admin/AdminNavbar';
import ProtectedRoute from './pages/ProtectedRoute';
import ViewProducts from './pages/ViewProducts';
import Orders from './components/Orders';
import NotFound from './components/NotFound';
import UserProfile from './pages/UserProfile'

function App() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // On first load
  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
    setLoading(false);
  }, []);

  // Handle storage changes
  useEffect(() => {
    const handleStorage = () => {
      const updatedRole = localStorage.getItem('role');
      setRole(updatedRole);
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  if (loading) return null; // or show a loading spinner

  return (
    <BrowserRouter>
      {role === 'admin' ? <AdminNavbar /> : <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/plants' element={<Plants />} />
        <Route path='/forget' element={<ForgetPassword />} />
        <Route path='/contactus' element={<ContactUs />} />
        <Route path='/category/:id' element={<CategoryPage />} />
        <Route path='/profile' element={<UserProfile/>}/>
        <Route path='*' element={<NotFound />} />

        {/* User Protected Routes */}
        <Route path='/cart' element={
          <ProtectedRoute allowedRole="user">
            <CartPage />
          </ProtectedRoute>
        } />
        <Route path='/checkout' element={
          <ProtectedRoute allowedRole="user">
            <Checkout />
          </ProtectedRoute>
        } />
        <Route path='/orders' element={
          <ProtectedRoute allowedRole="user">
            <Orders />
          </ProtectedRoute>
        } />

        {/* Admin Login - public */}
        <Route path='/admin/login' element={<AdminLogin />} />

        {/* Admin Protected Routes */}
        <Route path='/admin/dashboard' element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path='/admin/add-category' element={
          <ProtectedRoute allowedRole="admin">
            <AddCategory />
          </ProtectedRoute>
        } />
        <Route path='/admin/view-categories' element={
          <ProtectedRoute allowedRole="admin">
            <ViewCategories />
          </ProtectedRoute>
        } />
        <Route path='/admin/view-orders' element={
          <ProtectedRoute allowedRole="admin">
            <ViewOrders />
          </ProtectedRoute>
        } />
        <Route path='/admin/add-product' element={
          <ProtectedRoute allowedRole="admin">
            <AddProduct />
          </ProtectedRoute>
        } />
        <Route path='/admin/view-users' element={
          <ProtectedRoute allowedRole="admin">
            <ViewUsers />
          </ProtectedRoute>
        } />
        <Route path='/admin/view-products' element={
          <ProtectedRoute allowedRole="admin">
            <ViewProducts />
          </ProtectedRoute>
        } />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
