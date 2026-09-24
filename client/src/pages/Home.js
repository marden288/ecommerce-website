import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/products').then(({ data }) => {
      setProducts(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const categories = [...new Set(products.map((p) => p.category))];
  const featured = products.slice(0, 4);

  return (
    <div>
      <div className="hero">
        <h1>Welcome to ShopHub</h1>
        <p>Discover amazing products at great prices</p>
        <Link to="/products" className="btn btn-primary">Shop Now</Link>
      </div>

      <div className="categories">
        {categories.map((cat) => (
          <Link key={cat} to={`/products?category=${cat}`} className="category-link">{cat}</Link>
        ))}
      </div>

      <h2 className="section-title">Featured Products</h2>
      {loading ? (
        <div className="loading">Loading products...</div>
      ) : (
        <div className="product-grid">
          {featured.map((p) => <ProductCard key={p._id} product={p} />)}
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: 32 }}>
        <Link to="/products" className="btn btn-secondary">View All Products</Link>
      </div>
    </div>
  );
}
