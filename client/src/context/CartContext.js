import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  });

  const saveCart = (items) => {
    setCartItems(items);
    localStorage.setItem('cart', JSON.stringify(items));
  };

  const addToCart = (product, qty = 1) => {
    const exists = cartItems.find((x) => x._id === product._id);
    let updated;
    if (exists) {
      updated = cartItems.map((x) =>
        x._id === product._id ? { ...x, qty: x.qty + qty } : x
      );
    } else {
      updated = [...cartItems, { ...product, qty }];
    }
    saveCart(updated);
  };

  const removeFromCart = (id) => {
    saveCart(cartItems.filter((x) => x._id !== id));
  };

  const updateQty = (id, qty) => {
    if (qty < 1) return;
    saveCart(cartItems.map((x) => (x._id === id ? { ...x, qty } : x)));
  };

  const clearCart = () => saveCart([]);

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart, cartTotal, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
}
