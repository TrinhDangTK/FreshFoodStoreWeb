import React from 'react';
import './HotDeal.css';
import logo3sach from '../assets/logo.png';
import imgPorkTofu from '../assets/hot_deal_pork_tofu.png';
import imgCabbage from '../assets/hot_deal_cabbage.png';
import imgStuffedTomato from '../assets/hot_deal_stuffed_tomato.png';

export default function HotDeal() {
  const hotDealProducts = [
    {
      name: '[RTC] Ba Rọi Kho Đậu Hủ (Khay 500g)',
      salePrice: '79,000đ',
      originalPrice: '89,000đ',
      discount: 11,
      image: imgPorkTofu
    },
    {
      name: '[RTC] Bắp Cải Trái Tim Cắt Sẵn (Khay 300g)',
      salePrice: '17,400đ',
      originalPrice: '20,700đ',
      discount: 16,
      image: imgCabbage
    },
    {
      name: '[RTC] Bắp Cải Xào Cà Chua (Khay 350g)',
      salePrice: '30,000đ',
      originalPrice: '39,000đ',
      discount: 23,
      image: imgCabbage
    },
    {
      name: '[RTC] Cà Chua Dồn Thịt 3S (Khay 450g)',
      salePrice: '59,000đ',
      originalPrice: '69,000đ',
      discount: 14,
      image: imgStuffedTomato
    },
    {
      name: '[RTC] Cá Lóc Kho Tiêu (Khay 300g)',
      salePrice: '99,000đ',
      originalPrice: '159,000đ',
      discount: 38,
      image: imgPorkTofu
    },
    {
      name: '[RTC] Canh Bí Đao Dồn Thịt 3S (Khay 450g)',
      salePrice: '50,000đ',
      originalPrice: '69,000đ',
      discount: 28,
      image: imgStuffedTomato
    },
  ];

  return (
    <main className="hotdeal-main">
      <div className="hotdeal-container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <a href="#">Trang chủ</a> / <span>CHƯƠNG TRÌNH KHUYẾN MÃI</span>
        </div>

        {/* Title */}
        <h1 className="page-title">CHƯƠNG TRÌNH KHUYẾN MÃI</h1>

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
          {hotDealProducts.map((product, index) => (
            <div className="product-card" key={index}>
              <div className="product-image">
                <span className="discount-badge discount-solid">-{product.discount}%</span>
                <img src={product.image} alt={product.name} />
                <div className="image-overlay-logo">
                  <img src={logo3sach} alt="Logo" />
                </div>
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-price">
                  <span className="sale-price">{product.salePrice}</span>
                  <span className="original-price">{product.originalPrice}</span>
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
