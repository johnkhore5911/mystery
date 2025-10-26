import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, User, Phone, ChefHat } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import '../../assets/styles/AdminAuthPage.css';
import { authAPI } from '../../api/authAPI';

const AdminSignupPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    restaurantName: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
    
  //   // Validation
  //   if (formData.password !== formData.confirmPassword) {
  //     toast.error('Passwords do not match');
  //     return;
  //   }

  //   if (formData.password.length < 6) {
  //     toast.error('Password must be at least 6 characters');
  //     return;
  //   }

  //   setLoading(true);

  //   // Simulate API call (replace with real API later)
  //   setTimeout(() => {
  //     // Store new admin (in production, this goes to backend)
  //     localStorage.setItem('adminToken', 'demo-token-' + Date.now());
  //     localStorage.setItem('adminEmail', formData.email);
  //     localStorage.setItem('adminName', formData.name);
      
  //     toast.success('Account created successfully!');
  //     navigate('/admin/orders');
  //     setLoading(false);
  //   }, 1500);
  // };


  const handleSubmit = async (e) => {
  e.preventDefault();

  // Validation
  if (formData.password !== formData.confirmPassword) {
    toast.error('Passwords do not match');
    return;
  }

  if (formData.password.length < 6) {
    toast.error('Password must be at least 6 characters');
    return;
  }

  setLoading(true);

  try {
    const { confirmPassword, ...signupData } = formData;
    const response = await authAPI.signup(signupData);

    localStorage.setItem('adminToken', response.token);
    localStorage.setItem('adminEmail', response.admin.email);
    localStorage.setItem('adminName', response.admin.name);

    toast.success('Account created successfully!');
    navigate('/admin/orders');
  } catch (error) {
    toast.error(error.message || 'Signup failed');
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
                <div className="feature-icon">⚡</div>
                <div>
                  <h3>Quick Setup</h3>
                  <p>Get started in under 5 minutes</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🔒</div>
                <div>
                  <h3>Secure & Reliable</h3>
                  <p>Your data is safe with us</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">💼</div>
                <div>
                  <h3>Professional Tools</h3>
                  <p>Everything you need to manage your restaurant</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="auth-form-section">
          <div className="form-wrapper">
            <div className="form-header">
              <h2>Create Account</h2>
              <p>Start managing your restaurant today</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <div className="input-with-icon">
                    <User size={18} className="input-icon" />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <div className="input-with-icon">
                    <Phone size={18} className="input-icon" />
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>

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
                <label>Restaurant Name</label>
                <div className="input-with-icon">
                  <ChefHat size={18} className="input-icon" />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="My Restaurant"
                    value={formData.restaurantName}
                    onChange={(e) => setFormData({...formData, restaurantName: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
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

                <div className="form-group">
                  <label>Confirm Password</label>
                  <div className="input-with-icon">
                    <Lock size={18} className="input-icon" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      className="form-control"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              <label className="terms-checkbox">
                <input type="checkbox" required />
                <span>I agree to the Terms of Service and Privacy Policy</span>
              </label>

              <button type="submit" className="btn btn--primary btn--full-width" disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <div className="auth-divider">
              <span>or</span>
            </div>

            <button
              type="button"
              className="btn btn--secondary btn--full-width"
              onClick={() => navigate('/admin/login')}
            >
              Already have an account? Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignupPage;
