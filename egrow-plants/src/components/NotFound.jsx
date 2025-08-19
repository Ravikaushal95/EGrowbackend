import React from 'react';
import { Link } from 'react-router-dom';


const NotFound = () => {
  return (
    <div className="not-found-container d-flex align-items-center justify-content-center flex-column text-center vh-100">
      <h1 className="display-1 text-danger fw-bold">404</h1>
      <h2 className="mb-3">Page Not Found</h2>
      <p className="mb-4">Sorry, the page you are looking for doesn't exist or has been moved.</p>
      <Link to="/" className="btn btn-primary">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
