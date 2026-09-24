import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, updateQty, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <h2>Shopping Cart</h2>
        <div className="empty-msg">
          <p>Your cart is empty.</p>
          <Link to="/products" className="btn btn-primary" style={{ marginTop: 16, display: 'inline-block' }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>
      {cartItems.map((item) => (
        <div key={item._id} className="cart-item">
          <img src={item.image} alt={item.name} />
          <div className="cart-item-info">
            <h4>{item.name}</h4>
            <span className="item-price">${item.price.toFixed(2)}</span>
          </div>
          <div className="qty-controls">
            <button onClick={() => updateQty(item._id, item.qty - 1)}>-</button>
            <span>{item.qty}</span>
            <button onClick={() => updateQty(item._id, item.qty + 1)}>+</button>
          </div>
          <div style={{ fontWeight: 'bold' }}>${(item.price * item.qty).toFixed(2)}</div>
          <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item._id)}>Remove</button>
        </div>
      ))}
      <div className="cart-summary">
        <div className="total">Total: ${cartTotal.toFixed(2)}</div>
        <Link to="/checkout" className="btn btn-primary">Proceed to Checkout</Link>
      </div>
    </div>
  );
}
