import React from 'react';

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-top">
        <div className="footer-inner">
          <div className="footer-col about-col">
            <h4>VỀ TD Mart</h4>
            <p>- TD Mart đồng hành và hỗ trợ nông sản Việt, mang đến cho khách hàng thực phẩm "3 Sạch" : Sạch từ nông trại Sạch qua quá trình sơ chế, chế biến - Sạch đến bàn ăn.</p>
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
              <li><a href="#">Chính sách tích điểm dành cho thành viên TD Mart</a></li>
            </ul>
          </div>
          <div className="footer-col contact-col">
            <h4>Chăm sóc khách hàng</h4>
            <div className="contact-info">
              <i className="bi bi-telephone-inbound"></i>
              <div className="contact-details">
                <span className="phone">0372645190</span>
                <span className="email">dangtrinh768@gmail.com</span>
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
              <span className="vat-text">HOÁ ĐƠN<br />ĐIỆN TỬ</span>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Copyright © 2026 TD Mart. Powered by Haravan</p>
      </div>
    </footer>
  );
}
