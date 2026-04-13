import React, { useState, useEffect } from 'react';
import './Home.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './Home';
import Register from './Register';
import Category from './components/Category';

export default function App() {
  const [activePage, setActivePage] = useState('home');
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
    // Fetch categories
    fetch('http://localhost:5000/api/categories')
      .then(res => res.json())
      .then(data => {
        // Đảm bảo "HOT DEAL" luôn nằm đầu tiên nếu có cài highlight
        const sorted = data.sort((a, b) => b.highlight - a.highlight);
        setCategories(sorted);
      })
      .catch(err => console.error("API Error: ", err));
  }, []);

  const activeCat = categories.find(c => c.id === activePage);

  return (
    <div className="app-container">
      <Header 
        setActivePage={setActivePage} 
        activePage={activePage} 
        categories={categories.filter(c => c.id !== 'home')} 
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      
      {activePage === 'home' && <Home />}
      {activePage === 'register' && <Register setActivePage={setActivePage} />}
      
      {activeCat && (
        <Category 
          title={activeCat.name} 
          categoryId={activeCat.id} 
          showDiscountBadge={activeCat.highlight} 
        />
      )}
      
      <Footer />
    </div>
  );
}