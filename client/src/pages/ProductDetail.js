import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/products/${id}`).then(({ data }) => {
      setProduct(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!product) return <div className="empty-msg">Product not found.</div>;

  const handleAdd = () => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.name} />
      <div>
        <h1>{product.name}</h1>
        <div className="detail-meta">
          <span>{product.category}</span>
          <span>{'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))} ({product.rating})</span>
        </div>
        <div className="detail-price">${product.price.toFixed(2)}</div>
        <p className="detail-desc">{product.description}</p>
        <div className={`stock-status ${product.countInStock > 0 ? 'in-stock' : 'out-of-stock'}`}>
          {product.countInStock > 0 ? `In Stock (${product.countInStock})` : 'Out of Stock'}
        </div>
        <button
          className="btn btn-primary"
          onClick={handleAdd}
          disabled={product.countInStock === 0}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
