import React from 'react';
import logo3sach from '../assets/logo.png';

/**
 * Reusable product card component.
 * Renders product image, name, price, discount badge, and buy button.
 */
export default function ProductCard({ product, showDiscount = false }) {
  return (
    <div className="product-card">
      <div className="product-image">
        {showDiscount && product.discount && (
          <span className="discount-badge">-{product.discount}</span>
        )}
        <img src={product.image || logo3sach} alt={product.name} />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-price">
          <span className="sale-price">{product.price}</span>
          {product.oldPrice && (
            <span className="original-price">{product.oldPrice}</span>
          )}
        </div>
        <button className="btn-buy">
          <i className="bi bi-cart-plus"></i>
          CHỌN MUA
        </button>
      </div>
    </div>
  );
}
