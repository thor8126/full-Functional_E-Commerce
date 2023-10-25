import React, { useState, createContext, useContext, useEffect } from "react";
const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart");
    if (existingCartItem && existingCartItem.length) {
      // Parse the stored data and ensure it's an array
      const parsedCart = JSON.parse(existingCartItem);
      if (Array.isArray(parsedCart)) {
        setCart(parsedCart);
      } else {
        setCart([]); // If it's not an array, initialize as an empty array
      }
    }
  }, []);
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
const useLocalCart = () => useContext(CartContext);
export { useLocalCart, CartProvider };
