import React, { useState, useEffect } from 'react';
import './Home.css';
import heroBanner from './assets/hero_banner.png';
import logo3sach from './assets/logo.png';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuOpen && !e.target.closest('.dropdown')) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

  const categories = [
    { name: 'HOT DEAL', highlight: true },
    { name: '3Sach Kitchen Homemade', highlight: false },
    { name: 'Thực Phẩm Sơ Chế', highlight: false },
    { name: 'Rau Củ Quả Các Loại', highlight: false },
    { name: 'Trái Cây Tươi', highlight: false },
    { name: 'Hải Sản Tươi Sống', highlight: false },
    { name: 'Dịch Vụ Đặt Tiệc BBQ', highlight: false },
    { name: 'TRA CỨU HÓA ĐƠN ĐIỆN TỬ', highlight: false },
  ];

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

  const hotDealProducts = [
    {
      name: '[RTC] Ba Rọi Kho Đậu Hủ (Khay 500g)',
      salePrice: '79,000đ',
      originalPrice: '89,000đ',
      discount: 11,
    },
    {
      name: '[RTC] Bắp Cải Trái Tim Cắt Sẵn (Khay 300g)',
      salePrice: '17,400đ',
      originalPrice: '20,700đ',
      discount: 16,
    },
    {
      name: '[RTC] Bắp Cải Xào Cà Chua (Khay 350g)',
      salePrice: '30,000đ',
      originalPrice: '49,000đ',
      discount: 23,
    },
    {
      name: '[RTC] Cà Chua Dồn Thịt 3S (Khay 450g)',
      salePrice: '59,000đ',
      originalPrice: '69,000đ',
      discount: 14,
    },
    {
      name: '[RTC] Cá Lóc Kho Tiêu (Khay 300g)',
      salePrice: '99,000đ',
      originalPrice: '159,000đ',
      discount: 38,
    },
    {
      name: '[RTC] Canh Bí Đao Dồn Thịt 3S (Khay 450g)',
      salePrice: '50,000đ',
      originalPrice: '69,000đ',
      discount: 28,
    },
  ];

  const freshMeatProducts = [
    { name: 'Nạc Dăm Heo BAF (Khay 300g)', price: '67,800đ' },
    { name: 'Da Heo - 500gr', price: '48,900đ' },
    { name: 'Ba Rọi Heo Meat Master (Khay 400g)', price: '91,800đ' },
    { name: 'Ba Rọi Heo BAF (Khay 300g)', price: '69,800đ' },
    { name: 'Bắp Hoa Bò Úc Stanbroke (300g)', price: '162,000đ' },
    { name: 'Đầu Thăn Ngoại Bò Úc AMG (300g)', price: '267,000đ' },
  ];

  const fruitProducts = [
    { name: 'Xoài Cát Hòa Lộc (1Kg)', price: '120,000đ' },
    { name: 'Nho Xanh Ninh Thuận (1Kg)', price: '85,000đ' },
    { name: 'Dưa Hấu Không Hạt (1 Trái)', price: '65,000đ' },
    { name: 'Táo Gala Mỹ (1Kg)', price: '110,000đ' },
    { name: 'Chuối Già Nam Mỹ (1 Nải)', price: '45,000đ' },
    { name: 'Cam Sành Vĩnh Long (1Kg)', price: '35,000đ' },
  ];

  const processedFoodProducts = [
    { name: 'Chả Giò Rế Tôm Thịt 3S', price: '65,000đ' },
    { name: 'Há Cảo Tôm Thịt', price: '55,000đ' },
    { name: 'Bò Viên Gân', price: '80,000đ' },
    { name: 'Cá Viên Chiên Mắm', price: '45,000đ' },
    { name: 'Gà Ủ Muối Xông Khói', price: '190,000đ' },
    { name: 'Xúc Xích Đức Vissan', price: '52,000đ' },
  ];

  const seafoodProducts = [
    { name: 'Tôm Sú Nguyên Con (500g)', price: '185,000đ' },
    { name: 'Mực Ống Làm Sạch (500g)', price: '150,000đ' },
    { name: 'Cá Hú Cắt Khúc (500g)', price: '75,000đ' },
    { name: 'Cá Điêu Hồng Làm Sạch', price: '68,000đ' },
    { name: 'Cồi Sò Điệp (300g)', price: '110,000đ' },
    { name: 'Bạch Tuộc Tươi (500g)', price: '135,000đ' },
  ];

  const cookedFoodProducts = [
    { name: 'Cơm Gà Xối Mỡ Mắm Tỏi', price: '45,000đ' },
    { name: 'Thịt Kho Tiêu (Hộp 300g)', price: '65,000đ' },
    { name: 'Canh Chua Cá Lóc (Phần 2 người)', price: '55,000đ' },
    { name: 'Gà Kho Gừng (Hộp 300g)', price: '70,000đ' },
    { name: 'Sườn Xào Chua Ngọt', price: '85,000đ' },
    { name: 'Đậu Hũ Tứ Xuyên chay', price: '40,000đ' },
  ];

  const dryFoodProducts = [
    { name: 'Gạo ST25 Ông Cua (Túi 5Kg)', price: '180,000đ' },
    { name: 'Nước Mắm Phú Quốc 40 Độ Đạm', price: '85,000đ' },
    { name: 'Dầu Ăn Neem Tràng An (1L)', price: '55,000đ' },
    { name: 'Miến Dong Hữu Cơ (500g)', price: '45,000đ' },
    { name: 'Bún Khô Trắng Thái', price: '32,000đ' },
    { name: 'Tương Ớt Chinsu Su Su', price: '18,000đ' },
  ];

  return (
    <>
      {/* Top Banner */}
      <div className="top-banner">
        <div className="top-banner-content">
          <i className="bi bi-truck"></i>
          <span>FREESHIP nội thành cho đơn hàng từ 500K (xem chi tiết ở chính sách giao hàng)</span>
        </div>
      </div>

      {/* Header */}
      <header className="main-header">
        <div className="header-inner">
          {/* Menu Button */}
          <div className="dropdown">
            <button
              className="menu-btn"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(!menuOpen);
              }}
              aria-label="Menu"
            >
              <i className="bi bi-list"></i>
              <span>MENU</span>
            </button>
            <div className={`dropdown-content ${menuOpen ? 'show' : ''}`}>
              <ul>
                <li><a href="#">HỘP QUÀ TRÁI CÂY TD MART</a></li>
                <li><a href="#">BBQ TIỆC, ĂN LIỀN CHAY &amp; MẶN</a></li>
                <li><a href="#">TD FOOD HOMEMADE</a></li>
                <li><a href="#">THỰC PHẨM SƠ CHẾ</a></li>
                <li><a href="#">TRÁI CÂY &amp; HOA TƯƠI</a></li>
                <li><a href="#">THỊT VÀ HẢI SẢN CÁC LOẠI</a></li>
                <li><a href="#">RAU CỦ QUẢ CÁC LOẠI</a></li>
                <li><a href="#">THỰC PHẨM MÁT-ĐÔNG</a></li>
                <li><a href="#">THỰC PHẨM KHÔ</a></li>
                <li><a href="#">DẦU ĂN, NƯỚC CHẤM, GIA VỊ</a></li>
                <li><a href="#">GẠO, NẾP, TẤM</a></li>
                <li><a href="#">PHI THỰC PHẨM</a></li>
                <li><a href="#">ĐỒ UỐNG</a></li>
              </ul>
            </div>
          </div>

          {/* Logo */}
          <div className="logo">
            <a href="#">
              <img src={logo3sach} alt="3Sach Logo" />
            </a>
          </div>

          {/* Search Bar */}
          <form className="search-bar" action="/search" method="GET">
            <input type="text" name="keyword" placeholder="Tìm kiếm sản phẩm..." />
            <button type="submit" aria-label="Tìm kiếm">
              <i className="bi bi-search"></i>
            </button>
          </form>

          {/* User Actions */}
          <div className="user-actions">
            <a href="#" className="action-item" id="account-btn">
              <i className="bi bi-person"></i>
              <span>Tài khoản</span>
            </a>
            <a href="#" className="action-item cart-item" id="cart-btn">
              <i className="bi bi-cart3"></i>
              <span>Giỏ hàng</span>
              <div className="cart-badge">0</div>
            </a>
          </div>
        </div>
      </header>

      {/* Category Navigation */}
      <nav className="nav-main">
        <div className="nav-inner">
          <a href="#" className="nav-home" aria-label="Trang chủ">
            <i className="bi bi-house-door-fill"></i>
          </a>
          <ul className="nav-categories">
            {categories.map((cat, index) => (
              <li key={index} className={cat.highlight ? 'highlight' : ''}>
                <a href="#">{cat.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main>
      {/* Hero Banner */}
      <section className="hero-banner">
        <img src={heroBanner} alt="Lễ hội rộn ràng - Ngập tràn ưu đãi" />
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
          Xem thêm sản phẩm <strong>chương trình khuyến mãi</strong>
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

      {/* Footer */}
      <footer className="main-footer">
        <div className="footer-top">
          <div className="footer-inner">
            <div className="footer-col about-col">
              <h4>VỀ 3SACH</h4>
              <p>- 3Sach đồng hành và hỗ trợ nông sản Việt, mang đến cho khách hàng thực phẩm "3Sach" : Sạch từ nông trại - Sạch qua quá trình sơ chế, chế biến - Sạch đến bàn ăn.</p>
              <p>- 9 siêu thị và một Xưởng sản xuất thực phẩm hoạt động trên địa bàn TP. HCM phục vụ thực phẩm tươi, sạch, đảm bảo chất lượng và an toàn.</p>
            </div>
            <div className="footer-col store-col">
              <h4>Hệ thống cửa hàng</h4>
              <div className="store-map-icon">
                <i className="bi bi-geo-alt"></i>
              </div>
            </div>
            <div className="footer-col support-col">
              <h4>Hỗ trợ khách hàng</h4>
              <ul className="footer-links">
                <li><a href="#">Giới thiệu</a></li>
                <li><a href="#">Liên hệ</a></li>
                <li><a href="#">Chính sách đổi trả</a></li>
                <li><a href="#">Chính sách bảo mật</a></li>
                <li><a href="#">Chính sách giao hàng</a></li>
                <li><a href="#">Chính Sách Bảo Vệ Thông Tin NTD</a></li>
                <li><a href="#">Chính sách tích điểm dành cho thành viên 3Sach</a></li>
              </ul>
            </div>
            <div className="footer-col contact-col">
              <h4>Chăm sóc khách hàng</h4>
              <div className="contact-info">
                <i className="bi bi-telephone-inbound"></i>
                <div className="contact-details">
                  <span className="phone">18006034</span>
                  <span className="email">contact@3sach.vn</span>
                </div>
              </div>
              <h4 className="follow-us-title">Follow Us</h4>
              <div className="social-icons">
                <a href="#"><i className="bi bi-facebook"></i></a>
                <a href="#"><i className="bi bi-instagram"></i></a>
                <a href="#"><i className="bi bi-youtube"></i></a>
              </div>
              <div className="invoice-badge">
                <span className="vat-box">VAT</span>
                <span className="vat-text">HOÁ ĐƠN<br/>ĐIỆN TỬ</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-company-info">
          <div className="footer-inner company-inner">
            <div className="company-text">
              <h5>Bản quyền của Công Ty TNHH Đầu tư và Phát triển Bầu Trời Xanh</h5>
              <p>Giấy chứng nhận Đăng ký Kinh doanh số 0313999862 do Sở Kế Hoạch và Đầu Tư Thành phố Hồ Chí Minh cấp ngày 07/09/2016</p>
              <p>Địa chỉ: 124 Trần Não, Phường An Khánh , TP Thủ Đức, TP Hồ Chí Minh. Đăng ký thay đổi lần 7 ngày 25/05/2021.</p>
            </div>
            <div className="bct-badge">
              <span className="bct-icon"><i className="bi bi-check-circle"></i></span>
              <span className="bct-text">ĐÃ THÔNG BÁO<br/><small>BỘ CÔNG THƯƠNG</small></span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Copyright © 2026 3Sach Mart. Powered by Haravan</p>
        </div>
      </footer>
    </>
  );
}