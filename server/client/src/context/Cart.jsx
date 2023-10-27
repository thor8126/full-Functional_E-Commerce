import React, { useState, createContext, useContext, useEffect } from "react";
import toast from "react-hot-toast";
export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  // item amount state
  const [itemQuantity, setItemQuantity] = useState(0);
  // total price state
  const [total, setTotal] = useState(0);

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
  }, [cart]);

  useEffect(() => {
    if (cart.length === 0) {
      localStorage.removeItem("cart");
    }
  }, [cart]);



  useEffect(() => {
    const total = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.quantity;
    }, 0);
    setTotal(total);
  }, [cart]);

  // update item Quantity
  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.quantity;
      }, 0);
      setItemQuantity(amount);
    }
  }, [cart]);

  const addToCart = (p) => {
    let newItem = [];
    if (!cart.length) {
      newItem.push({ ...p, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(newItem));
      setCart(newItem);
      return;
    }
    newItem = cart;
    const existingItem = cart.filter((item) => item._id === p._id);
    // console.log(existingItem);

    if (existingItem && existingItem.length !== 0) {
      const updatedItem = existingItem[0];
      updatedItem.quantity += 1;
      const index = newItem.findIndex((item) => item._id === p._id);
      newItem[index] = updatedItem;
      setCart(newItem);
    } else {
      // If the item doesn't exist, add it with quantity 1
      newItem.push({ ...p, quantity: 1 });
      setCart(newItem);
    }
    // Update the cart in local storage
    localStorage.setItem("cart", JSON.stringify(newItem));
    toast.success("Item added to cart");
  };

  // delete item from cart
  const removeCartItem = async (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(myCart));
      setCart(myCart);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // cleart cart
  const clearCart = () => {
    setCart([]);
  };

  // increasing the quantity
  const incrementQuantity = (productId) => {
    const updatedCart = cart.map((item) => {
      if (item._id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decrementQuantity = (productId) => {
    const itemIndex = cart.findIndex((item) => item._id === productId);
    if (itemIndex > -1) {
      const updatedCart = [...cart];
      if (updatedCart[itemIndex].quantity > 1) {
        updatedCart[itemIndex].quantity -= 1;
      } else {
        // If the quantity is 1, remove the item
        updatedCart.splice(itemIndex, 1);
      }
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeCartItem,
        clearCart,
        incrementQuantity,
        decrementQuantity,
        total,
        itemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
// const useLocalCart = () => useContext(CartContext);
export default CartProvider;
