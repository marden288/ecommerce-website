import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    API.get('/orders/my').then(({ data }) => {
      setOrders(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [user, navigate]);

  if (loading) return <div className="loading">Loading orders...</div>;

  return (
    <div className="dashboard">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <div className="empty-msg">You have no orders yet.</div>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <span className="order-id">Order #{order._id.slice(-8)}</span>
              <span>{new Date(order.createdAt).toLocaleDateString()}</span>
              <span style={{ fontWeight: 'bold' }}>${order.totalPrice.toFixed(2)}</span>
              <span className={`status-badge ${order.isDelivered ? 'status-delivered' : 'status-pending'}`}>
                {order.isDelivered ? 'Delivered' : 'Processing'}
              </span>
            </div>
            <div className="order-items">
              {order.items.map((item, i) => (
                <span key={i}>{item.name} x{item.qty}{i < order.items.length - 1 ? ', ' : ''}</span>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
