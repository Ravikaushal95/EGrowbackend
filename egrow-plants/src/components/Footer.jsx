import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-light text-dark">
        <hr />
      <div className="container">
        <div className="row gy-4">
          {/* Company Info */}
          <div className="col-md-3">
            <h5 className="fw-bold">eGrow <span className="d-block text-muted" style={{ fontSize: '12px' }}>PLANTS</span></h5>
            <p className="text-muted small">
              Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-3">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-muted text-decoration-none">Shop</a></li>
              <li><a href="#" className="text-muted text-decoration-none">Plants</a></li>
              <li><a href="#" className="text-muted text-decoration-none">Cacti</a></li>
              <li><a href="#" className="text-muted text-decoration-none">Cart</a></li>
              <li><a href="#" className="text-muted text-decoration-none">My account</a></li>
            </ul>
          </div>

          {/* Social Icons */}
          <div className="col-md-3">
            <h6 className="fw-bold">Our Socials</h6>
            <div className="d-flex gap-2">
              <a href="#" className="bg-white p-2 border rounded text-dark"><FaFacebookF /></a>
              <a href="#" className="bg-white p-2 border rounded text-dark"><FaInstagram /></a>
              <a href="#" className="bg-white p-2 border rounded text-dark"><FaTwitter /></a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="col-md-3">
            <h6 className="fw-bold">Subscribe to Our Newsletter</h6>
            <form className="mt-3">
              <input
                type="email"
                className="form-control mb-2"
                placeholder="Your email address"
              />
              <button type="submit" className="btn btn-dark w-100">SUBSCRIBE</button>
            </form>
          </div>
        </div>

        {/* Bottom copyright */}
        <hr className="my-4" />
        <p className="text-center text-muted small mb-0">
          Copyright &copy; 2025 eGrow Plants | Powered by Piedocx Technologies Pvt. Ltd.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
