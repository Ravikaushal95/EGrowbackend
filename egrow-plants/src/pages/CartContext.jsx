import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item._id === product._id); // ✅ use only _id to match
      if (existing) {
        // if same product already in cart, increase its quantity
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      // if new product, add as new entry
      return [...prev, { ...product, quantity }];
    });
  };

  const updateQuantity = (productId, newQty) => {
    if (newQty < 1) return;
    setCartItems(prev =>
      prev.map(item =>
        item._id === productId
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) =>
      prev.filter((item) => item._id !== productId)
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
