import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, ChefHat } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import '../../assets/styles/AdminAuthPage.css';
import { authAPI } from '../../api/authAPI';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);


   const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call API instead of dummy data
      const response = await authAPI.login(formData);

      // Store token and admin data
      localStorage.setItem('adminToken', response.token);
      localStorage.setItem('adminEmail', response.admin.email);
      localStorage.setItem('adminName', response.admin.name);

      toast.success('Welcome back!');
      navigate('/admin/orders');
    } catch (error) {
      toast.error(error.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-auth-page">
      <Toaster position="top-center" />
      
      <div className="auth-container">
        {/* Left Side - Branding */}
        <div className="auth-branding">
          <div className="branding-content">
            <div className="logo-section">
              <div className="logo-icon">
                <ChefHat size={48} />
              </div>
              <h1>Mystery Dine-In</h1>
              <p>Admin Dashboard</p>
            </div>
            <div className="features-list">
              <div className="feature-item">
                <div className="feature-icon">📊</div>
                <div>
                  <h3>Real-time Analytics</h3>
                  <p>Track orders and revenue instantly</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🍽️</div>
                <div>
                  <h3>Menu Management</h3>
                  <p>Update menu items on the fly</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🎯</div>
                <div>
                  <h3>Order Tracking</h3>
                  <p>Never miss a customer order</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="auth-form-section">
          <div className="form-wrapper">
            <div className="form-header">
              <h2>Welcome Back</h2>
              <p>Sign in to your admin account</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label>Email Address</label>
                <div className="input-with-icon">
                  <Mail size={18} className="input-icon" />
                  <input
                    type="email"
                    className="form-control"
                    placeholder="admin@mystery.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="input-with-icon">
                  <Lock size={18} className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="form-footer">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <button type="button" className="forgot-password">
                  Forgot password?
                </button>
              </div>

              <button type="submit" className="btn btn--primary btn--full-width" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="auth-divider">
              <span>or</span>
            </div>

            <button
              type="button"
              className="btn btn--secondary btn--full-width"
              onClick={() => navigate('/admin/signup')}
            >
              Create Admin Account
            </button>

            <div className="demo-credentials">
              <p><strong>Demo Credentials:</strong></p>
              <p>Email: admin@mystery.com</p>
              <p>Password: admin123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
