import React from 'react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="container py-4">
      <h3>🛒 Your Shopping Cart</h3>

      {cartItems.length === 0 ? (
        <div className="alert alert-info mt-4">
          Your cart is empty. <Link to="/">Go shopping</Link>
        </div>
      ) : (
        <>
          <table className="table table-bordered mt-4">
            <thead className="thead-dark">
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Subtotal</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id || item._id}>
                  <td>
                    <img
                      src={`http://localhost:7000${item.image}`}
                      alt={item.title}
                      width="60"
                      style={{ objectFit: 'cover' }}
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>₹ {item.price}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-sm btn-secondary me-2"
                        onClick={() => updateQuantity(item.id || item._id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      {item.quantity}
                      <button
                        className="btn btn-sm btn-secondary ms-2"
                        onClick={() => updateQuantity(item.id || item._id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>₹ {item.quantity * item.price}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeFromCart(item.id || item._id)}
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-end mt-4">
            <h5>Total: ₹ {calculateTotal()}</h5>
            <Link to="/checkout" className="btn btn-success mt-2">Proceed to Checkout</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
