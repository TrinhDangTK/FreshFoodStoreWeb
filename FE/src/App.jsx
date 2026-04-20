import React, { useState, useEffect } from 'react';
import './Home.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './Home';
import Register from './Register';
import Category from './components/Category';
import { API_BASE_URL } from './utils/api';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [categories, setCategories] = useState([]);
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('freshstore_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (err) {
        console.error("Invalid user data in localStorage", err);
      }
    }
    return null;
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const userParam = params.get('user');
    const authError = params.get('error');

    if (authError) {
      alert('Đăng nhập Google thất bại. Vui lòng thử lại.');
    }

    if (token && userParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam));
        localStorage.setItem('freshstore_token', token);
        localStorage.setItem('freshstore_user', JSON.stringify(user));
        setCurrentUser(user);
      } catch (err) {
        console.error('Google callback parse error:', err);
      }
    }

    if (token || userParam || authError) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  useEffect(() => {
    // Fetch categories
    fetch(`${API_BASE_URL}/api/categories`)
      .then(res => res.json())
      .then(data => {
        // Đảm bảo "HOT DEAL" luôn nằm đầu tiên nếu có cài highlight
        const sorted = data.sort((a, b) => b.highlight - a.highlight);
        setCategories(sorted);
      })
      .catch(err => console.error("API Error: ", err));
  }, []);

  useEffect(() => {
    // Không hiển thị trang kết quả tìm kiếm khi keyword rỗng
    if (activePage === 'search' && !searchKeyword.trim()) {
      setActivePage('home');
    }
  }, [activePage, searchKeyword]);

  const activeCat = categories.find(c => c.id === activePage);

  return (
    <div className="app-container">
      <Header 
        setActivePage={setActivePage} 
        activePage={activePage} 
        categories={categories.filter(c => c.id !== 'home')} 
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        setSearchKeyword={setSearchKeyword}
      />
      
      {activePage === 'home' && <Home />}
      {activePage === 'register' && <Register setActivePage={setActivePage} />}
      
      {activePage === 'search' && (
        <Category 
          title={`Kết quả tìm kiếm cho: "${searchKeyword}"`} 
          categoryId="search" 
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          setActivePage={setActivePage}
        />
      )}
      {activeCat && (
        <Category 
          title={activeCat.name} 
          categoryId={activeCat.id} 
          showDiscountBadge={activeCat.highlight} 
          setSearchKeyword={setSearchKeyword}
          setActivePage={setActivePage}
        />
      )}
      
      <Footer />
    </div>
  );
}