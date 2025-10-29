import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Clock, 
  Star, 
  TrendingUp, 
  ChefHat,
  Award,
  Flame
} from 'lucide-react';
// import { menuData } from '../data/menuData';
// import { getMenuData } from '../data/menuData';
import { getMenuData } from '../api/menuAPI';  
import { useCart } from '../hooks/useCart';
import '../assets/styles/HomePage.css';

// At the top of your HomePage component
const restaurantInfo = {
    name: 'Mystery Dine-In'
};

const HomePage = () => {
  const navigate = useNavigate();
  const { cart, addToCart: addItemToCart, updateQuantity, getCartCount } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCartPulse, setShowCartPulse] = useState(false);
  const [menuCategories, setMenuCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // getMenuData();

  useEffect(() => {
    const fetchMenu = async () => {
      setIsLoading(true);
      console.log("API calling!!! fetch menu data!!")
      const data = await getMenuData();
      console.log("data: ",data);
      setMenuCategories(data);
      setIsLoading(false);
    };

    fetchMenu();
    // getMenuData();

  }, []);
  

useEffect(() => {
  let lastScrollY = window.scrollY;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    // Hide header when scrolling down
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsScrolled(true);
    } 
    // Show when scrolling up
    else if (currentScrollY < lastScrollY) {
      setIsScrolled(false);
    }

    lastScrollY = currentScrollY;
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);



  // Get table number from URL or local storage
  const tableNumber = new URLSearchParams(window.location.search).get('table') || '12';

  // FIXED: Use useMemo to calculate items with stats ONCE and cache them
  // This prevents random values from changing on every render
  const itemsWithStats = useMemo(() => {
    // Flatten all items with category info
    const allItems = menuCategories.flatMap(category => 
      category.items.map(item => ({
        ...item,
        categoryId: category.id,
        categoryName: category.name
      }))
    );

    // Add rating and order count to items (simulated) - ONLY RUNS ONCE
    return allItems.map(item => ({
      ...item,
      rating: item.isPopular ? (4.5 + Math.random() * 0.4).toFixed(1) : (4.0 + Math.random() * 0.5).toFixed(1),
      orderCount: item.isPopular ? Math.floor(100 + Math.random() * 150) : Math.floor(30 + Math.random() * 90)
    }));
  }, [menuCategories]); // Empty dependency array means this only runs once when component mounts

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter items
  const filteredItems = itemsWithStats.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           (selectedCategory === 'popular' ? item.isPopular : item.categoryId === selectedCategory);
    return matchesSearch && matchesCategory;
  });

  // Sort by popularity for better engagement
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (selectedCategory === 'popular' || selectedCategory === 'all') {
      return (b.orderCount || 0) - (a.orderCount || 0);
    }
    return 0;
  });

  // Get cart item quantity
  const getCartItemCount = (itemId) => {
    const cartItem = cart.find(item => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  // Add to cart handler
  const handleAddToCart = (item) => {
    addItemToCart(item);
    setShowCartPulse(true);
    setTimeout(() => setShowCartPulse(false), 600);
  };

  // Remove from cart handler
  const handleRemoveFromCart = (itemId) => {
    const currentQuantity = getCartItemCount(itemId);
    if (currentQuantity > 0) {
      updateQuantity(itemId, currentQuantity - 1);
    }
  };

  const getTotalItems = () => {
    return getCartCount();
  };

  const getTotalAmount = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleViewCart = () => {
    // navigate('/cart', { 
    //   state: { 
    //     restaurantName: menuData.restaurantInfo.name,
    //     tableNumber 
    //   } 
    // });
    console.log("Table Number: ",tableNumber)
    navigate('/cart', { state: { restaurantName: restaurantInfo.name, tableNumber } });
  };

  

  if (isLoading) {
    return <div>Loading menu...</div>; // Or a spinner component
  }

  

  return (
    <div className="home-page">
      {/* Sticky Header */}
      <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-top">
          <div className="restaurant-branding">
            <div className="logo-wrapper">
              <ChefHat className="logo-icon" />
            </div>
            <div className="brand-info">
              <h1 className="restaurant-name">{restaurantInfo.name}</h1>

              {/* <h1 className="restaurant-name">{menuData.restaurantInfo.name}</h1> */}
              <p className="table-badge">
                <span className="table-icon">🪑</span> Table {tableNumber}
              </p>
            </div>
          </div>

          {getTotalItems() > 0 && (
            <button className={`cart-btn ${showCartPulse ? 'pulse' : ''}`} onClick={handleViewCart}>
              <ShoppingCart size={20} />
              <span className="cart-text">Cart</span>
              <span className="cart-count">{getTotalItems()}</span>
            </button>
          )}
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            className="search-input"
            placeholder="Search for dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Pills */}
        <div className="category-tabs">
          <button
            className={`category-tab ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            <span className="tab-icon">🍽️</span>
            <span className="tab-text">All Items</span>
          </button>
          <button
            className={`category-tab ${selectedCategory === 'popular' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('popular')}
          >
            <span className="tab-icon">🔥</span>
            <span className="tab-text">Popular</span>
          </button>
          {menuCategories.map(category => (
            <button
              key={category.id}
              className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="tab-icon">{category.icon}</span>
              <span className="tab-text">{category.name}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="menu-content">
        {/* Results Header with Engagement Hook */}
        <div className="results-info">
          <h2 className="section-title">
            {selectedCategory === 'popular' && <Flame className="title-icon" />}
            {selectedCategory === 'all' ? 'Our Menu' : 
             selectedCategory === 'popular' ? 'Popular Dishes' :
             menuCategories.find(c => c.id === selectedCategory)?.name}
          </h2>
          <span className="results-count">{sortedItems.length} dishes</span>
        </div>

        {/* Menu Cards - Mobile Optimized */}
        {sortedItems.length > 0 ? (
          <div className="menu-list">
            {sortedItems.map((item) => {
              const itemCount = getCartItemCount(item.id);
              return (
                <div key={item.id} className="menu-item-card">
                  {/* Image Section */}
                  <div className="item-image-section">
                    <img src={item.image} alt={item.name} className="item-image" />
                    
                    {/* Badges */}
                    <div className="item-badges">
                      {item.isPopular && (
                        <span className="badge popular-badge">
                          <TrendingUp size={12} /> Popular
                        </span>
                      )}
                      {item.isVeg && (
                        <span className="badge veg-badge">
                           Veg
                        </span>
                      )}
                    </div>

                    {/* Rating Badge */}
                    {item.rating && (
                      <div className="rating-badge">
                        <Star size={12} fill="currentColor" />
                        <span>{item.rating}</span>
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="item-content">
                    <div className="item-header">
                      <h3 className="item-name">{item.name}</h3>
                      {item.orderCount > 100 && (
                        <span className="order-count">
                          <Award size={14} />
                          {item.orderCount}+ orders
                        </span>
                      )}
                    </div>

                    <p className="item-description">{item.description}</p>

                    {/* Footer with Price & Actions */}
                    <div className="item-footer">
                      <div className="price-section">
                        <span className="item-price">₹{item.price}</span>
                        <span className="prep-time">
                          <Clock size={14} />
                          {item.prepTime}
                        </span>
                      </div>

                      {/* Add to Cart Control */}
                      {itemCount === 0 ? (
                        <button 
                          className="add-to-cart-btn"
                          onClick={() => handleAddToCart(item)}
                        >
                          <Plus size={18} />
                          <span>Add</span>
                        </button>
                      ) : (
                        <div className="quantity-control">
                          <button 
                            className="quantity-btn decrease"
                            onClick={() => handleRemoveFromCart(item.id)}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="quantity-display">{itemCount}</span>
                          <button 
                            className="quantity-btn increase"
                            onClick={() => handleAddToCart(item)}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No dishes found</h3>
            <p>Try searching with different keywords</p>
          </div>
        )}
      </main>

      {/* Floating Cart Button (appears when items in cart) */}
      {getTotalItems() > 0 && (
        <div className="floating-cart-bar">
          <div className="cart-summary">
            <div className="cart-details">
              <span className="cart-items-count">{getTotalItems()} Item{getTotalItems() > 1 ? 's' : ''}</span>
              <span className="cart-total">₹{getTotalAmount()}</span>
            </div>
          </div>
          <button className="view-cart-btn" onClick={handleViewCart}>
            View Cart
            <ShoppingCart size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
