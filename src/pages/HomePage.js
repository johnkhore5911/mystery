import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ShoppingCart, Search, ChefHat, Clock, Leaf, Star, TrendingUp } from 'lucide-react';
import '../assets/styles/HomePage.css';
import { useCart } from '../hooks/useCart';
import toast, { Toaster } from 'react-hot-toast';
import { menuAPI } from '../api/menuAPI';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tableNumber = searchParams.get('table') || 'Unknown';
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]); // ✅ NEW - Add this state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use Cart Context
  const { cart, addToCart, getCartCount, getCartTotal } = useCart();

  // ✅ UPDATED - Fetch both categories and menu items
  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        setLoading(true);
        
        // Fetch categories and menu items in parallel
        const [categoriesResponse, itemsResponse] = await Promise.all([
          menuAPI.getAllCategories(),
          menuAPI.getAllMenuItems()
        ]);
        const data = menuAPI.getAllCategories();
        console.log("data: ",data);

        if (categoriesResponse.success) {
          setCategories(categoriesResponse.data);
        } else {
          toast.error('Failed to load categories');
        }

        if (itemsResponse.success) {
          setMenuItems(itemsResponse.data);
        } else {
          toast.error('Failed to load menu items');
        }

      } catch (err) {
        console.error('Error:', err);
        toast.error('Error loading menu');
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  // Detect scroll to shrink header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ NEW - Process menu items with their category names
  const allItems = menuItems.map(item => {
    // Find the category for this item
    const categoryObj = categories.find(cat => cat._id === item.category);
    return {
      ...item,
      categoryName: categoryObj?.name || 'Unknown'
    };
  });

  // ✅ UPDATED - Filter items based on category and search
  const filteredItems = allItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = 
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle adding items to cart
  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`);
  };

  // Get cart values
  const cartCount = getCartCount();
  const cartTotal = getCartTotal();

  // Loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading menu...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="error-container">
        <p>Error loading menu. Please try again.</p>
      </div>
    );
  }


  return (
    <div className="home-page">
      <Toaster position="top-center" />

      {/* Smart Compact Header */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-top">
          <div className="restaurant-info">
            <ChefHat className="logo-icon" />
            <div className="restaurant-details">
              <h1 className="restaurant-name">Mystery Dine-In</h1>
              {!isScrolled && <p className="tagline">Delicious food at your table</p>}
            </div>
          </div>
          <div className="table-badge">
            <span className="table-icon">🪑</span>
            Table {tableNumber}
          </div>
        </div>

        {/* Search Bar */}
        {!isScrolled && (
          <div className="search-bar">
            <Search className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search your cravings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}

        {/* Category Scroll */}
        <div className="category-scroll">
          <button
            className={`category-chip ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            <span className="category-icon">🍽️</span>
            All
          </button>
          {/* {menuData.categories.map((category) => ( */}
{categories.map(cat => (
  <button
    key={cat._id}
    className={`category-btn ${selectedCategory === cat.name ? 'active' : ''}`}
    onClick={() => setSelectedCategory(cat.name)}
  >
    {cat.icon} {cat.name}
              {/* <span className="category-icon">{category.icon}</span> */}
              {/* {category.name} */}
            </button>
          ))}
        </div>
      </header>

      {/* Menu Items Grid */}
      <div className="menu-container">
        <div className="items-grid">
          {filteredItems.length === 0 ? (
            <div className="empty-state">
              <ChefHat size={48} />
              <p>No items found matching your search.</p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div key={item.id} className="menu-card">
                {/* Food Image - Larger & More Appealing */}
                <div className="card-image-wrapper">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="card-image"
                    loading="lazy"
                  />
                  
                  {/* Badges */}
                  <div className="badges-wrapper">
                    {item.isVeg && (
                      <div className="veg-badge">
                        <Leaf size={12} />
                      </div>
                    )}
                    {item.isPopular && (
                      <div className="popular-badge">
                        <Star size={12} fill="white" />
                        <span>Popular</span>
                      </div>
                    )}
                  </div>

                  {/* Quick Add Overlay on Tap */}
                  <div className="quick-add-overlay">
                    <button
                      className="quick-add-btn"
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingCart size={18} />
                      Quick Add
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="card-content">
                  <div className="item-header">
                    <h3 className="item-name">{item.name}</h3>
                    {item.prepTime && (
                      <span className="prep-time">
                        <Clock size={12} />
                        {item.prepTime}
                      </span>
                    )}
                  </div>
                  
                  <p className="item-description">{item.description}</p>
                  
                  {/* Price & Add Button */}
                  <div className="item-footer">
                    <div className="price-wrapper">
                      <span className="currency">₹</span>
                      <span className="item-price">{item.price}</span>
                    </div>
                    <button
                      className="add-btn"
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingCart size={14} />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Floating Cart Button - Enhanced */}
      {cartCount > 0 && (
        <button
          className="floating-cart-btn"
          onClick={() => navigate(`/cart?table=${tableNumber}`)}
        >
          <div className="cart-icon-wrapper">
            <ShoppingCart size={24} />
            <span className="cart-count">{cartCount}</span>
          </div>
          <div className="cart-details">
            <span className="cart-label">{cartCount} item{cartCount > 1 ? 's' : ''}</span>
            <span className="cart-total">₹{cartTotal.toFixed(0)}</span>
          </div>
          <span className="view-cart-arrow">→</span>
        </button>
      )}
    </div>
  );
};

export default HomePage;
