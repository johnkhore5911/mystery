import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './hooks/useCart';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import OrderStatusPage from './pages/OrderStatusPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminAnalyticsPage from './pages/admin/AdminAnalyticsPage';
import AdminMenuPage from './pages/admin/AdminMenuPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminSignupPage from './pages/admin/AdminSignupPage';
import './assets/styles/App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Customer Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order-status" element={<OrderStatusPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/signup" element={<AdminSignupPage />} />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
          <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
          <Route path="/admin/menu" element={<AdminMenuPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
