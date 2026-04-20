import React, { useState, useEffect } from 'react';
import './HotDeal.css';
import { API_BASE_URL } from '../utils/api';
import ProductCard from './ProductCard';

export default function Category({ title, categoryId, showDiscountBadge = false, searchKeyword = '', setSearchKeyword, setActivePage }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: Infinity, label: 'Lọc giá' });
  const [sort, setSort] = useState({ value: '', label: 'Sắp xếp' });
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    // Xây dựng URL với các tham số hiện tại
    let url = `${API_BASE_URL}/api/products?categoryId=${categoryId}`;
    if (searchKeyword && categoryId === 'search') {
      url += `&search=${encodeURIComponent(searchKeyword)}`;
    }
    
    // Nếu categoryId thay đổi, ta có thể muốn dùng giá trị mặc định thay vì state cũ
    // Nhưng ở đây ta cứ dùng state hiện tại, và sẽ reset state này trong handle của việc chuyển trang ở App.jsx nếu cần
    // Hoặc đơn giản là cứ chạy với filter hiện có.
    
    if (priceFilter.min > 0) url += `&minPrice=${priceFilter.min}`;
    if (priceFilter.max !== Infinity) url += `&maxPrice=${priceFilter.max}`;
    if (sort.value) url += `&sort=${sort.value}`;

    console.log(`%c[MONGODB FETCH] %cCategory: ${categoryId} %cURL: ${url}`, "color: #28a745; font-weight: bold", "color: #17a2b8", "color: #6c757d");

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (isMounted) {
          setProducts(data);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error("API load products error:", err);
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [categoryId, searchKeyword, priceFilter.min, priceFilter.max, sort.value]);

  // Reset bộ lọc bằng cách lắng nghe categoryId thay đổi (nhưng không gọi fetch dư thừa)
  useEffect(() => {
    setPriceFilter({ min: 0, max: Infinity, label: 'Lọc giá' });
    setSort({ value: '', label: 'Sắp xếp' });
    setShowPriceDropdown(false);
    setShowSortDropdown(false);
  }, [categoryId]);

  const handleResetFilters = () => {
    setPriceFilter({ min: 0, max: Infinity, label: 'Lọc giá' });
    setSort({ value: '', label: 'Sắp xếp' });
    if (categoryId === 'search') {
      if (setSearchKeyword) setSearchKeyword('');
      if (setActivePage) setActivePage('home');
      return;
    }
    if (setSearchKeyword) setSearchKeyword('');
  };

  const priceOptions = [
    { label: 'Tất cả giá', min: 0, max: Infinity },
    { label: 'Dưới 50,000đ', min: 0, max: 50000 },
    { label: '50,000đ - 100,000đ', min: 50000, max: 100000 },
    { label: '100,000đ - 200,000đ', min: 100000, max: 200000 },
    { label: 'Trên 200,000đ', min: 200000, max: Infinity },
  ];

  const sortOptions = [
    { label: 'Mặc định', value: '' },
    { label: 'Giá thấp đến cao', value: 'price-asc' },
    { label: 'Giá cao đến thấp', value: 'price-desc' },
    { label: 'Tên A-Z', value: 'name-asc' },
    { label: 'Tên Z-A', value: 'name-desc' },
  ];

  const parsePriceValue = (price) => Number(String(price ?? '').replace(/[^\d]/g, '')) || 0;

  const displayedProducts = products.filter((product) => {
    const productPrice = parsePriceValue(product.price);

    if (priceFilter.label === 'Dưới 50,000đ') {
      return productPrice < 50000;
    }

    if (priceFilter.label === 'Trên 200,000đ') {
      return productPrice > 200000;
    }

    if (priceFilter.min > 0 || priceFilter.max !== Infinity) {
      return productPrice >= priceFilter.min && productPrice <= priceFilter.max;
    }

    return true;
  });
  return (
    <main className="hotdeal-main">
      <div className="hotdeal-container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <a href="#" onClick={(e) => { e.preventDefault(); window.location.reload(); }}>Trang chủ</a> 
          {categoryId === 'search' ? (
             <> / <span>Tìm kiếm</span> / <span>{searchKeyword}</span></>
          ) : (
             <> / <span>{title.toUpperCase()}</span></>
          )}
        </div>

        {/* Title */}
        <div className="category-header-wrap">
           <h1 className="page-title" style={{margin: 0}}>{title}</h1>
           {(priceFilter.min > 0 || priceFilter.max !== Infinity || sort.value || (categoryId === 'search' && searchKeyword)) && (
             <button onClick={handleResetFilters} className="reset-filter-btn">
               <i className="bi bi-x-circle"></i> Xóa tất cả bộ lọc
             </button>
           )}
        </div>

        {/* Filter and Sort Toolbar */}
        <div className="toolbar">
          <div className="toolbar-left">
            <div className="filter-label">
              <i className="bi bi-funnel"></i>
              BỘ LỌC
            </div>
            <div className="filter-separator"></div>
            <div className={`dropdown custom-dropdown price-filter dropdown-wrap ${showPriceDropdown ? 'active' : ''}`} 
                 onClick={() => setShowPriceDropdown(!showPriceDropdown)}>
              <span>{priceFilter.label}</span>
              <i className="bi bi-chevron-down"></i>
              
              {showPriceDropdown && (
                <div className="filter-dropdown-menu">
                  {priceOptions.map((opt, idx) => (
                    <div key={idx} className="filter-opt" 
                         onClick={(e) => {
                           e.stopPropagation();
                           setPriceFilter(opt);
                           setShowPriceDropdown(false);
                         }}>
                      {opt.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="toolbar-right dropdown-wrap-right">
            <div className={`dropdown custom-dropdown sort-filter dropdown-wrap ${showSortDropdown ? 'active' : ''}`}
                 onClick={() => { setShowSortDropdown(!showSortDropdown); setShowPriceDropdown(false); }}>
              <i className="bi bi-sort-up"></i>
              <span>{sort.label}</span>
              <i className="bi bi-chevron-down"></i>

              {showSortDropdown && (
                <div className="filter-dropdown-menu right-aligned">
                  {sortOptions.map((opt, idx) => (
                    <div key={idx} className="filter-opt" onClick={(e) => {
                      e.stopPropagation();
                      setSort(opt);
                      setShowSortDropdown(false);
                    }}>
                      {opt.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
           <h2 style={{textAlign: 'center', margin: '50px 0', color: 'var(--primary-green)'}}>Đang tải sản phẩm từ máy chủ...</h2>
        ) : (
          <div className="category-products">
            {displayedProducts.length > 0 ? displayedProducts.map((product, index) => (
              <ProductCard key={index} product={product} showDiscount={true} />
            )) : <h2 style={{textAlign: 'center', width: '100%', margin: '40px 0'}}>Chưa có sản phẩm nào.</h2>}
          </div>
        )}
      </div>
    </main>
  );
}
