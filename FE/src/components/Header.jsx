import React, { useState, useEffect } from 'react';
import logo3sach from '../assets/logo.png';

export default function Header({ setActivePage, activePage, categories = [], currentUser, setCurrentUser }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuOpen && !e.target.closest('.dropdown')) {
        setMenuOpen(false);
      }
      if (accountOpen && !e.target.closest('.account-dropdown-container')) {
        setAccountOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen, accountOpen]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      alert("Vui lòng nhập đầy đủ Email và Mật khẩu!");
      return;
    }
    setLoginLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Đăng nhập thất bại");
      } else {
        localStorage.setItem('freshstore_token', data.token);
        localStorage.setItem('freshstore_user', JSON.stringify(data.user));
        setCurrentUser(data.user);
        setAccountOpen(false);
        setLoginEmail('');
        setLoginPassword('');
        alert("Đăng nhập thành công!");
      }
    } catch (err) {
      alert("Lỗi máy chủ! Vui lòng thử lại sau.");
      console.error("Login Error: ", err);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('freshstore_token');
    localStorage.removeItem('freshstore_user');
    setCurrentUser(null);
    setAccountOpen(false);
  };

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
            <a href="#" onClick={(e) => {
              e.preventDefault();
              setActivePage('home');
              window.scrollTo(0, 0);
            }}>
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
            <div className="account-dropdown-container">
              <button
                className="action-item account-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setAccountOpen(!accountOpen);
                  if (menuOpen) setMenuOpen(false);
                }}
              >
                <i className="bi bi-person"></i>
                <span style={{maxWidth: '80px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                  {currentUser ? currentUser.name.split(' ').pop() : 'Tài khoản'}
                </span>
              </button>

              <div className={`account-dropdown ${accountOpen ? 'show' : ''}`}>
                {currentUser ? (
                  <div className="login-form">
                    <h3 className="login-title">XIN CHÀO, {currentUser.name.toUpperCase()}</h3>
                    <p className="login-subtitle">Email: {currentUser.email}</p>
                    <button className="login-submit-btn" onClick={handleLogout} style={{marginTop: '20px', background: '#e74c3c'}}>ĐĂNG XUẤT</button>
                  </div>
                ) : (
                  <div className="login-form">
                    <h3 className="login-title">ĐĂNG NHẬP TÀI KHOẢN</h3>
                    <p className="login-subtitle">Nhập email và mật khẩu của bạn:</p>

                    <div className="social-login">
                      <button className="social-btn google-btn">
                        <i className="bi bi-google"></i> Đăng nhập Google
                      </button>
                      <button className="social-btn facebook-btn">
                        <i className="bi bi-facebook"></i> Đăng nhập<br />Facebook
                      </button>
                    </div>

                    <form className="login-inputs" onSubmit={handleLogin}>
                      <div className="form-group">
                        <input type="email" placeholder="Email" required 
                          value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
                      </div>
                      <div className="form-group">
                        <input type="password" placeholder="Mật khẩu" required 
                          value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
                      </div>

                      <button type="submit" className="login-submit-btn" disabled={loginLoading}>
                        {loginLoading ? 'ĐANG XỬ LÝ...' : 'ĐĂNG NHẬP'}
                      </button>
                    </form>

                    <div className="login-links">
                      <p>Khách hàng mới? <a href="#" onClick={(e) => {
                        e.preventDefault();
                        setActivePage('register');
                        setAccountOpen(false);
                        window.scrollTo(0, 0);
                      }}>Tạo tài khoản</a></p>
                      <p>Quên mật khẩu? <a href="#">Khôi phục mật khẩu</a></p>
                    </div>
                  </div>
                )}
              </div>
            </div>

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
          <a href="#" className="nav-home" aria-label="Trang chủ" onClick={(e) => {
            e.preventDefault();
            setActivePage('home');
            window.scrollTo(0, 0);
          }}>
            <i className="bi bi-house-door-fill"></i>
          </a>
          <ul className="nav-categories">
            {categories.map((cat, index) => {
              if (cat.id === 'hot-deal') {
                return (
                  <li key={index} className={`promo-nav-item ${activePage === 'hot-deal' ? 'active' : ''}`} style={{ marginLeft: 0 }}>
                    <a href="#" className={`nav-item-link ${activePage === 'hot-deal' || cat.highlight ? 'promo-btn' : ''}`} onClick={(e) => {
                      e.preventDefault();
                      setActivePage('hot-deal');
                    }}>
                      HOT DEAL
                    </a>
                  </li>
                );
              }
              return (
                <li key={index} className={`${cat.highlight ? 'highlight' : ''} ${activePage === cat.id ? 'active' : ''}`}>
                  <a href="#" onClick={(e) => {
                    if (cat.id) {
                      e.preventDefault();
                      setActivePage(cat.id);
                      window.scrollTo(0, 0);
                    }
                  }}>{cat.name}</a>
                </li>
              );
            })}
            <li className="aux-nav-item">
              <a href="#" className="aux-btn">Dịch Vụ Đặt Tiệc BBQ</a>
            </li>
            <li className="aux-nav-item">
              <a href="#" className="aux-btn">Tra Cứu Hóa Đơn Điện Tử</a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
