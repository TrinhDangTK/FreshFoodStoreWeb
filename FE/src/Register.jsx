import React, { useState } from 'react';
import './Register.css';

export default function Register({ setActivePage }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      alert("Vui lòng nhập đầy đủ Họ, Tên, Email và Mật khẩu!");
      return;
    }
    if (formData.password.length < 6) {
      alert("Mật khẩu phải chứa tối thiểu 6 ký tự!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.lastName} ${formData.firstName}`.trim(),
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.message || 'Đăng ký thất bại!');
      } else {
        alert('Tạo tài khoản thành công! Bạn có thể đăng nhập ngay bây giờ.');
        setActivePage('home');
        window.scrollTo(0, 0);
      }
    } catch (err) {
      console.error("Registration Error: ", err);
      alert("Lỗi máy chủ! Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="register-main">
      <div className="register-container">
        <h2 className="register-title">Tạo tài khoản</h2>
        <div className="title-separator"></div>

        <form className="register-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Họ" className="form-input"
            value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} />
          <input type="text" placeholder="Tên" className="form-input"
            value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} />

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
          <input type="email" placeholder="Email" className="form-input"
            value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
          <input type="password" placeholder="Mật khẩu" className="form-input"
            value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />

          <button type="submit" className="register-submit-btn" disabled={loading}>
            {loading ? 'ĐANG XỬ LÝ...' : 'ĐĂNG KÝ'}
          </button>

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
