import React, { useState, useEffect } from 'react';
import bannerFruits from './assets/banner_fruits.png';
import bannerMeat from './assets/banner_meat.png';
import bannerSeafood from './assets/banner_seafood.png';
import { API_BASE_URL } from './utils/api';
import ProductSection from './components/ProductSection';
import ProductCard from './components/ProductCard';

export default function Home() {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [allProducts, setAllProducts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        const grouped = data.reduce((acc, curr) => {
          acc[curr.categoryId] = acc[curr.categoryId] || [];
          acc[curr.categoryId].push(curr);
          return acc;
        }, {});
        setAllProducts(grouped);
        setLoading(false);
      })
      .catch(err => {
        console.error("API load products error:", err);
        setLoading(false);
      });
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
            {loading ? (
              <h2 style={{width: '100%', textAlign: 'center', margin: '40px 0', color: 'var(--primary-green)'}}>Đang tải sản phẩm nóng hổi...</h2>
            ) : (
              hotDealProducts.map((product, index) => (
                <ProductCard key={index} product={product} showDiscount={true} />
              ))
            )}
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

      {/* Category Sections using ProductSection component */}
      <ProductSection title="Thực Phẩm Tươi Sống" products={freshMeatProducts} loading={loading} />
      <ProductSection title="Trái Cây & Hoa Tươi" products={fruitProducts} loading={loading} />
      <ProductSection title="Thực Phẩm Sơ Chế" products={processedFoodProducts} loading={loading} />
      <ProductSection title="Thịt Và Hải Sản Các Loại" products={seafoodProducts} loading={loading} />
      <ProductSection title="BBQ Tiệc, Ăn Liền Chay & Mặn" products={cookedFoodProducts} loading={loading} />
      <ProductSection title="Thực Phẩm Khô" products={dryFoodProducts} loading={loading} />

    </main>
  );
}