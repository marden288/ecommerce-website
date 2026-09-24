import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ address: '', city: '', postalCode: '', country: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return navigate('/login');
    if (cartItems.length === 0) return;
    setLoading(true);
    setError('');
    try {
      await API.post('/orders', {
        items: cartItems.map((item) => ({
          product: item._id,
          name: item.name,
          image: item.image,
          price: item.price,
          qty: item.qty
        })),
        shippingAddress: form,
        totalPrice: cartTotal
      });
      clearCart();
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
    }
    setLoading(false);
  };

  if (cartItems.length === 0) {
    return <div className="empty-msg">Your cart is empty.</div>;
  }

  return (
    <div className="checkout-page">
      <div>
        <h2>Shipping Address</h2>
        {error && <div className="error-msg">{error}</div>}
        {!user && <div className="error-msg">Please log in to place an order.</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Address</label>
            <input name="address" value={form.address} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>City</label>
            <input name="city" value={form.city} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Postal Code</label>
            <input name="postalCode" value={form.postalCode} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Country</label>
            <input name="country" value={form.country} onChange={handleChange} required />
          </div>
          <button className="btn btn-primary" style={{ width: '100%' }} disabled={loading || !user}>
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>
      </div>
      <div>
        <h2>Order Summary</h2>
        {cartItems.map((item) => (
          <div key={item._id} className="order-summary-item">
            <span>{item.name} x {item.qty}</span>
            <span>${(item.price * item.qty).toFixed(2)}</span>
          </div>
        ))}
        <div className="order-total">
          <span>Total</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
