import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { useCart } from '../pages/CartContext';

const Navbar = () => {
  const [data, setData] = useState('');
  const [userType, setUserType] = useState('');
  const nav = useNavigate();
  const { cartItems } = useCart();

  useEffect(() => {
    const fetchUserData = () => {
      const temData = JSON.parse(localStorage.getItem('data'));
      const temUserType = JSON.parse(localStorage.getItem('userType'));

      if (temData?.email) {
        setData(temData);
      } else {
        setData('');
      }

      if (temUserType) {
        setUserType(temUserType);
      } else {
        setUserType('');
      }
    };

    fetchUserData();
    window.addEventListener("storage", fetchUserData);

    return () => {
      window.removeEventListener("storage", fetchUserData);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('data');
    localStorage.removeItem('userType');
    setData('');
    setUserType('');
    nav('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top px-4 py-2">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center me-4" to="/">
          <img src="/images/logo-regular.png" alt="Logo" style={{ height: 40 }} />
        </Link>

        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Center Nav Links */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/">SHOP ALL</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/category/1">PLANTS</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/category/2">CACTI</Link>
            </li>
          </ul>

          {/* Right Side */}
          <ul className="navbar-nav d-flex align-items-center gap-3 mb-2 mb-lg-0">
            {data?.email ? (
              <>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/login">SignIn</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/signup">SignUp</Link>
                </li>
              </>
            )}

            <li className="nav-item">
              <Link className="nav-link text-dark" to="/contactus">Contact Us</Link>
            </li>

            {/* Cart Icon */}
            <li className="nav-item position-relative">
              <Link to="/cart" className="nav-link p-0">
                <FaShoppingCart size={20} className="text-dark" />
                {cartItems.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </li>

            {/* Profile Image or Icon */}
            <li className="nav-item">
              <Link to="/profile" className="nav-link p-0">
                {data?.profile ? (
                  <img
                    src={`http://localhost:7000/upload/${data.profile}`}
                    alt="Profile"
                    className="rounded-circle"
                    style={{
                      width: 35,
                      height: 35,
                      objectFit: 'cover',
                      border: '2px solid #ccc'
                    }}
                  />
                ) : (
                  <FaUserCircle size={28} className="text-dark" />
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
