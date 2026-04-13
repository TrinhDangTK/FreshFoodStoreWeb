import React from 'react';
import './Register.css';

export default function Register({ setActivePage }) {
  return (
    <main className="register-main">
      <div className="register-container">
        <h2 className="register-title">Tạo tài khoản</h2>
        <div className="title-separator"></div>
        
        <form className="register-form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Họ" className="form-input" />
          <input type="text" placeholder="Tên" className="form-input" />
          
          <div className="gender-selection">
            <label className="radio-label">
              <input type="radio" name="gender" value="nu" defaultChecked />
              <span className="radio-text">Nữ</span>
            </label>
            <label className="radio-label">
              <input type="radio" name="gender" value="nam" />
              <span className="radio-text">Nam</span>
            </label>
          </div>
          
          <input type="date" placeholder="mm/dd/yyyy" className="form-input" />
          <input type="email" placeholder="Email" className="form-input" />
          <input type="password" placeholder="Mật khẩu" className="form-input" />
          
          <p className="recaptcha-text">
            This site is protected by reCAPTCHA and the Google <a href="#">Privacy Policy</a> and <a href="#">Terms of Service</a> apply.
          </p>
          
          <button type="submit" className="register-submit-btn">ĐĂNG KÝ</button>
          
          <button type="button" className="back-home-btn" onClick={() => {
            setActivePage('home');
            window.scrollTo(0, 0);
          }}>
            &#8592; Quay lại trang chủ
          </button>
        </form>
      </div>
    </main>
  );
}
