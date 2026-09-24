import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState({
    name: '', price: '', image: '', category: '', description: '', countInStock: '', rating: ''
  });

  useEffect(() => {
    if (!user?.isAdmin) { navigate('/'); return; }
    loadData();
  }, [user, navigate]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [p, o, u] = await Promise.all([
        API.get('/products'),
        API.get('/orders'),
        API.get('/users')
      ]);
      setProducts(p.data);
      setOrders(o.data);
      setUsers(u.data);
    } catch {}
    setLoading(false);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const openAdd = () => {
    setEditProduct(null);
    setForm({ name: '', price: '', image: '', category: '', description: '', countInStock: '', rating: '' });
    setShowModal(true);
  };

  const openEdit = (p) => {
    setEditProduct(p);
    setForm({
      name: p.name, price: p.price, image: p.image, category: p.category,
      description: p.description, countInStock: p.countInStock, rating: p.rating
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = { ...form, price: Number(form.price), countInStock: Number(form.countInStock), rating: Number(form.rating) };
    try {
      if (editProduct) {
        await API.put(`/products/${editProduct._id}`, payload);
      } else {
        await API.post('/products', payload);
      }
      setShowModal(false);
      loadData();
    } catch {}
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    await API.delete(`/products/${id}`);
    loadData();
  };

  const toggleDeliver = async (id) => {
    await API.put(`/orders/${id}/deliver`);
    loadData();
  };

  if (loading) return <div className="loading">Loading admin data...</div>;

  return (
    <div className="admin-page">
      <h2>Admin Panel</h2>
      <div className="admin-tabs">
        <button className={tab === 'products' ? 'active' : ''} onClick={() => setTab('products')}>
          Products ({products.length})
        </button>
        <button className={tab === 'orders' ? 'active' : ''} onClick={() => setTab('orders')}>
          Orders ({orders.length})
        </button>
        <button className={tab === 'users' ? 'active' : ''} onClick={() => setTab('users')}>
          Users ({users.length})
        </button>
      </div>

      {tab === 'products' && (
        <>
          <button className="btn btn-primary btn-sm" onClick={openAdd} style={{ marginBottom: 16 }}>
            + Add Product
          </button>
          <table className="admin-table">
            <thead>
              <tr><th>Name</th><th>Price</th><th>Category</th><th>Stock</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>${p.price.toFixed(2)}</td>
                  <td>{p.category}</td>
                  <td>{p.countInStock}</td>
                  <td>
                    <button className="btn btn-secondary btn-sm" onClick={() => openEdit(p)} style={{ marginRight: 8 }}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {tab === 'orders' && (
        <table className="admin-table">
          <thead>
            <tr><th>Order ID</th><th>User</th><th>Total</th><th>Date</th><th>Delivered</th><th>Action</th></tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td>#{o._id.slice(-8)}</td>
                <td>{o.user?.name || 'N/A'}</td>
                <td>${o.totalPrice.toFixed(2)}</td>
                <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                <td>
                  <span className={`status-badge ${o.isDelivered ? 'status-delivered' : 'status-pending'}`}>
                    {o.isDelivered ? 'Yes' : 'No'}
                  </span>
                </td>
                <td>
                  <button className="btn btn-success btn-sm" onClick={() => toggleDeliver(o._id)}>
                    {o.isDelivered ? 'Undeliver' : 'Mark Delivered'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {tab === 'users' && (
        <table className="admin-table">
          <thead>
            <tr><th>Name</th><th>Email</th><th>Admin</th><th>Joined</th></tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.isAdmin ? 'Yes' : 'No'}</td>
                <td>{new Date(u.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{editProduct ? 'Edit Product' : 'Add Product'}</h3>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>Name</label>
                <input name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input name="image" value={form.image} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Category</label>
                <input name="category" value={form.category} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Count In Stock</label>
                <input name="countInStock" type="number" value={form.countInStock} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Rating</label>
                <input name="rating" type="number" step="0.1" min="0" max="5" value={form.rating} onChange={handleChange} required />
              </div>
              <div className="modal-actions">
                <button className="btn btn-primary" type="submit">Save</button>
                <button className="btn btn-secondary" type="button" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
