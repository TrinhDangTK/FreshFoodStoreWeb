import React from 'react';
import ProductCard from './ProductCard';

/**
 * Reusable section component for displaying a category of products.
 * Used on the Home page to render each product category with a pill-shaped title.
 */
export default function ProductSection({ title, products, loading }) {
  return (
    <section className="category-section">
      <div className="category-inner">
        <div className="category-title">
          <h2>{title}</h2>
        </div>
        <div className="category-products">
          {loading ? (
            <h2 className="loading-text">Vui lòng chờ...</h2>
          ) : (
            products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
