import React from 'react';
import './HotDeal.css';
import logo3sach from '../assets/logo.png';

export default function Category({ title, products, showDiscountBadge = false }) {
  return (
    <main className="hotdeal-main">
      <div className="hotdeal-container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <a href="#">Trang chủ</a> / <span>{title.toUpperCase()}</span>
        </div>

        {/* Title */}
        <h1 className="page-title">{title}</h1>

        {/* Filter and Sort Toolbar */}
        <div className="toolbar">
          <div className="toolbar-left">
            <div className="filter-label">
              <i className="bi bi-funnel"></i>
              BỘ LỌC
            </div>
            <div className="filter-separator"></div>
            <div className="dropdown custom-dropdown price-filter">
              <span>Lọc giá</span>
              <i className="bi bi-chevron-down"></i>
            </div>
          </div>
          <div className="toolbar-right">
            <div className="dropdown custom-dropdown sort-filter">
              <i className="bi bi-sort-up"></i>
              <span>Sắp xếp</span>
              <i className="bi bi-chevron-down"></i>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="category-products">
          {products && products.map((product, index) => (
            <div className="product-card" key={index}>
              <div className="product-image">
                {showDiscountBadge && product.discount && (
                  <span className="discount-badge discount-solid">-{product.discount}%</span>
                )}
                <img src={product.image || logo3sach} alt={product.name} />
                <div className="image-overlay-logo">
                  <img src={logo3sach} alt="Logo" />
                </div>
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-price">
                  <span className="sale-price">{product.salePrice || product.price}</span>
                  {product.originalPrice && (
                    <span className="original-price">{product.originalPrice}</span>
                  )}
                </div>
                <button className="btn-buy">
                  <i className="bi bi-handbag"></i>
                  CHỌN MUA
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
