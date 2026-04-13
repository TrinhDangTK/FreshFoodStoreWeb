import React, { useState } from 'react';
import './Home.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './Home';
import Register from './Register';
import Category from './components/Category';
import { hotDealProducts, fruitProducts, processedFoodProducts, seafoodProducts, cookedFoodProducts, vegetableProducts } from './data/products';

export default function App() {
  const [activePage, setActivePage] = useState('home');

  return (
    <div className="app-container">
      <Header setActivePage={setActivePage} activePage={activePage} />
      
      {activePage === 'home' && <Home />}
      {activePage === 'register' && <Register setActivePage={setActivePage} />}
      {activePage === 'hot-deal' && <Category title="CHƯƠNG TRÌNH KHUYẾN MÃI" products={hotDealProducts} showDiscountBadge={true} />}
      {activePage === 'homemade' && <Category title="TD MART KITCHEN HOMEMADE" products={cookedFoodProducts} />}
      {activePage === 'processed' && <Category title="THỰC PHẨM SƠ CHẾ" products={processedFoodProducts} />}
      {activePage === 'vegetables' && <Category title="RAU CỦ QUẢ CÁC LOẠI" products={vegetableProducts} />}
      {activePage === 'fruits' && <Category title="TRÁI CÂY TƯƠI" products={fruitProducts} />}
      {activePage === 'seafood' && <Category title="HẢI SẢN TƯƠI SỐNG" products={seafoodProducts} />}
      
      <Footer />
    </div>
  );
}