import React from 'react';
import './Home.css'; 

export default function App() {
  return (
    <> {}
      <div className="top-banner">
        FREESHIP nội thành cho đơn từ 500k(Xem chi tiết ở chính sách giao hàng)
      </div>
      
      <header className="main-header">
        <div className="dropdown">
          <button>MENU</button>
          <div className="content">
            {}
            <ul>
              <li><a href="#">HỘP QUÀ TRÁI CÂY TD MART</a></li>
              <li><a href="#">BBQ TIỆC, ĂN LIỀN CHAY & MẶN</a></li>
              <li><a href="#">TD FOOD HOMEMADE</a></li>
              <li><a href="#">THỰC PHẨM SƠ CHẾ</a></li>
              <li><a href="#">TRÁI CÂY & HOA TƯƠI</a></li>
              <li><a href="#">THỊT VÀ HẢI SẢN CÁC LOẠI</a></li>
              <li><a href="#">RAU CỦ QUẢ CÁC LOẠI</a></li>
              <li><a href="#">THỰC PHẨM MÁT-ĐÔNG</a></li>
              <li><a href="#">THỰC PHẨM KHÔ</a></li>
              <li><a href="#">DẦU ĂN,NƯỚC CHẤM,GIA VỊ</a></li>
              <li><a href="#">GẠO,NẾP,TẤM</a></li>
              <li><a href="#">PHI THỰC PHẨM</a></li>
              <li><a href="#">ĐỒ UỐNG</a></li>
            </ul>
          </div>
        </div>

        <div className="logo">
          <a href="#">
            {}
            <img src="logo.png" alt="TD Logo" />
            <span>TD</span>
          </a>
        </div>

        <div className="header-right">
          <form className="search-bar" action="/search" method="GET">
            {}
            <input type="text" name="keyword" placeholder="Tìm kiếm sản phẩm..." required />
            <button type="submit" aria-label="Tìm kiếm">
              <i className="bi bi-search"></i>
            </button>
          </form>
          <div className="user-actions">
            <div className="account">
              <i className="bi bi-person-circle"></i>
            </div>
            <div className="shopping-cart">
              <i className="bi bi-cart"></i>
            </div>
          </div>
        </div>
      </header>
      
      <nav className="nav-main">
        {}
        <button onClick={() => {}}><i className="bi bi-house"></i></button>
        <ul>
          <i className="fa-solid fa-house"></i>
          <li>HOT DEAL</li>
          <li>Kitechen Homemade</li>
          <li>Thực phẩm sơ chế</li>
          <li>Rau củ quả các loại</li>
          <li>Trái cây tươi</li>
          <li>Hải sản tươi sống</li>
          <li>Dịch vụ đặt tiệc BBQ</li>
          <li>Tra cứu hóa đơn điện tử</li>
        </ul>
      </nav>
      
      <main>
        {}
      </main>
      
      <footer>
        {}
      </footer>
    </>
  );
}