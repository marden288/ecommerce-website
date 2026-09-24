import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">ShopHub</Link>
        <div className="nav-links">
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart{cartCount > 0 && <span className="badge">{cartCount}</span>}</Link>
          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              {user.isAdmin && <Link to="/admin">Admin</Link>}
              <button onClick={logout} className="btn-link">Logout</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
