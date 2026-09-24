import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/products/${product._id}`}>
        <img src={product.image} alt={product.name} />
        <div className="product-info">
          <h3>{product.name}</h3>
          <p className="product-category">{product.category}</p>
          <div className="product-bottom">
            <span className="product-price">${product.price.toFixed(2)}</span>
            <span className="product-rating">{'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
