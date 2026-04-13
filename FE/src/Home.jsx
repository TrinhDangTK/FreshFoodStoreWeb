import React, { useState, useEffect } from 'react';
import bannerFruits from './assets/banner_fruits.png';
import bannerMeat from './assets/banner_meat.png';
import bannerSeafood from './assets/banner_seafood.png';

export default function Home() {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [allProducts, setAllProducts] = useState({});

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        const grouped = data.reduce((acc, curr) => {
          acc[curr.categoryId] = acc[curr.categoryId] || [];
          acc[curr.categoryId].push(curr);
          return acc;
        }, {});
        setAllProducts(grouped);
      })
      .catch(err => console.error("API load products error:", err));
  }, []);

  const hotDealProducts = allProducts['hot-deal'] ? allProducts['hot-deal'].slice(0, 10) : [];
  const freshMeatProducts = allProducts['fresh-meat'] ? allProducts['fresh-meat'].slice(0, 10) : [];
  const fruitProducts = allProducts['fruits'] ? allProducts['fruits'].slice(0, 10) : [];
  const processedFoodProducts = allProducts['processed'] ? allProducts['processed'].slice(0, 10) : [];
  const seafoodProducts = allProducts['seafood'] ? allProducts['seafood'].slice(0, 10) : [];
  const cookedFoodProducts = allProducts['homemade'] ? allProducts['homemade'].slice(0, 10) : [];
  const dryFoodProducts = allProducts['dry-food'] ? allProducts['dry-food'].slice(0, 10) : [];

  const banners = [bannerFruits, bannerMeat, bannerSeafood];

  // Auto slide banners
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const benefits = [
    {
      icon: 'bi-arrow-left-right',
      title: '1 ĐỔI 1 SẢN PHẨM LỖI',
      subtitle: '',
      color: '#1C7567',
    },
    {
      icon: 'bi-truck',
      title: 'GIAO HÀNG TRONG NGÀY',
      subtitle: '(Miễn phí vận chuyển) *',
      color: '#e85d2a',
    },
    {
      icon: 'bi-shield-check',
      title: 'NGUỒN GỐC XUẤT XỨ RÕ RÀNG',
      subtitle: '',
      color: '#1C7567',
    },
    {
      icon: 'bi-patch-check-fill',
      title: '100% SẢN PHẨM ĐẠT CHUẨN',
      subtitle: '',
      color: '#e85d2a',
    },
  ];

  return (
    <main>
      {/* Hero Banner */}
      <section className="hero-banner">
        {banners.map((banner, index) => (
          <img
            key={index}
            src={banner}
            alt={`Khuyến mãi ${index + 1}`}
            className={`slide ${index === currentBannerIndex ? 'active' : ''}`}
          />
        ))}
        <div className="banner-indicators">
          {banners.map((_, index) => (
            <span
              key={index}
              className={`indicator ${index === currentBannerIndex ? 'active' : ''}`}
              onClick={() => setCurrentBannerIndex(index)}
            ></span>
          ))}
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="benefits-bar">
        <div className="benefits-inner">
          {benefits.map((benefit, index) => (
            <div className="benefit-item" key={index}>
              <div className="benefit-icon" style={{ backgroundColor: benefit.color + '15', color: benefit.color }}>
                <i className={`bi ${benefit.icon}`}></i>
              </div>
              <div className="benefit-text">
                <strong>{benefit.title}</strong>
                {benefit.subtitle && <span>{benefit.subtitle}</span>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOT DEAL Section */}
      <section className="hotdeal-section">
        <div className="hotdeal-inner">
          <div className="hotdeal-title">
            <h2>
              <span className="hotdeal-text">HOTDEAL</span>
              <span className="hotdeal-bolt">⚡</span>
            </h2>
          </div>
          <div className="hotdeal-products">
            {hotDealProducts.map((product, index) => (
              <div className="product-card" key={index}>
                <div className="product-image">
                  <span className="discount-badge">-{product.discount}%</span>
                  <div className="image-placeholder">
                    <i className="bi bi-image"></i>
                  </div>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-price">
                    <span className="sale-price">{product.salePrice}</span>
                    <span className="original-price">{product.originalPrice}</span>
                  </div>
                  <button className="btn-buy">
                    <i className="bi bi-cart-plus"></i>
                    CHỌN MUA
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo CTA Button */}
      <div className="promo-cta">
        <a href="#" className="promo-cta-btn">
          Xem thêm sản phẩm <strong>Chương trình khuyến mãi</strong>
        </a>
      </div>

      {/* Delivery Banner */}
      <section className="delivery-banner">
        <div className="delivery-banner-inner">
          <div className="delivery-banner-placeholder">
            <i className="bi bi-truck"></i>
            <div className="delivery-banner-text">
              <h3>ĐẶT NGAY GIAO LIỀN</h3>
              <span className="delivery-tag">CHO ĐƠN HÀNG <strong>500K</strong> FREESHIP</span>
            </div>
          </div>
        </div>
      </section>

      {/* Thực Phẩm Tươi Sống Section */}
      <section className="category-section">
        <div className="category-inner">
          <div className="category-title">
            <h2>Thực Phẩm Tươi Sống</h2>
          </div>
          <div className="category-products">
            {freshMeatProducts.map((product, index) => (
              <div className="product-card" key={index}>
                <div className="product-image">
                  <div className="image-placeholder">
                    <i className="bi bi-image"></i>
                  </div>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-price">
                    <span className="sale-price">{product.price}</span>
                  </div>
                  <button className="btn-buy">
                    <i className="bi bi-cart-plus"></i>
                    CHỌN MUA
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trái Cây & Hoa Tươi Section */}
      <section className="category-section">
        <div className="category-inner">
          <div className="category-title">
            <h2>Trái Cây & Hoa Tươi</h2>
          </div>
          <div className="category-products">
            {fruitProducts.map((product, index) => (
              <div className="product-card" key={index}>
                <div className="product-image">
                  <div className="image-placeholder">
                    <i className="bi bi-image"></i>
                  </div>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-price">
                    <span className="sale-price">{product.price}</span>
                  </div>
                  <button className="btn-buy">
                    <i className="bi bi-cart-plus"></i>
                    CHỌN MUA
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Thực Phẩm Sơ Chế Section */}
      <section className="category-section">
        <div className="category-inner">
          <div className="category-title">
            <h2>Thực Phẩm Sơ Chế</h2>
          </div>
          <div className="category-products">
            {processedFoodProducts.map((product, index) => (
              <div className="product-card" key={index}>
                <div className="product-image">
                  <div className="image-placeholder">
                    <i className="bi bi-image"></i>
                  </div>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-price">
                    <span className="sale-price">{product.price}</span>
                  </div>
                  <button className="btn-buy">
                    <i className="bi bi-cart-plus"></i>
                    CHỌN MUA
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Thịt & Hải Sản Cửa Hàng Section */}
      <section className="category-section">
        <div className="category-inner">
          <div className="category-title">
            <h2>Thịt Và Hải Sản Các Loại</h2>
          </div>
          <div className="category-products">
            {seafoodProducts.map((product, index) => (
              <div className="product-card" key={index}>
                <div className="product-image">
                  <div className="image-placeholder">
                    <i className="bi bi-image"></i>
                  </div>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-price">
                    <span className="sale-price">{product.price}</span>
                  </div>
                  <button className="btn-buy">
                    <i className="bi bi-cart-plus"></i>
                    CHỌN MUA
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mặn & Chay Section */}
      <section className="category-section">
        <div className="category-inner">
          <div className="category-title">
            <h2>BBQ Tiệc, Ăn Liền Chay & Mặn</h2>
          </div>
          <div className="category-products">
            {cookedFoodProducts.map((product, index) => (
              <div className="product-card" key={index}>
                <div className="product-image">
                  <div className="image-placeholder">
                    <i className="bi bi-image"></i>
                  </div>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-price">
                    <span className="sale-price">{product.price}</span>
                  </div>
                  <button className="btn-buy">
                    <i className="bi bi-cart-plus"></i>
                    CHỌN MUA
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Thực Phẩm Khô Section */}
      <section className="category-section">
        <div className="category-inner">
          <div className="category-title">
            <h2>Thực Phẩm Khô</h2>
          </div>
          <div className="category-products">
            {dryFoodProducts.map((product, index) => (
              <div className="product-card" key={index}>
                <div className="product-image">
                  <div className="image-placeholder">
                    <i className="bi bi-image"></i>
                  </div>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-price">
                    <span className="sale-price">{product.price}</span>
                  </div>
                  <button className="btn-buy">
                    <i className="bi bi-cart-plus"></i>
                    CHỌN MUA
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}