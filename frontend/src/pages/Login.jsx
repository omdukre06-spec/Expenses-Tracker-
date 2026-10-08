import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, Mail, User, Wallet, ArrowRight } from 'lucide-react';
import './Login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    currency: '₹ INR'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    const emailKey = formData.email.trim().toLowerCase();
    const currSymbol = formData.currency ? formData.currency.split(' ')[0] : '₹';
    const userName = isLogin ? (emailKey.split('@')[0] || 'User') : (formData.name || 'User');

    const userProfile = {
      name: userName,
      email: emailKey,
      currency: currSymbol,
      isNewAccount: !isLogin
    };

    localStorage.setItem('paisa_current_user', JSON.stringify(userProfile));

    // Check if user already has saved data in localStorage
    const existingData = localStorage.getItem(`paisa_data_${emailKey}`);

    if (!existingData) {
      // Fresh new account -> start with 0 balance and empty data arrays
      const freshData = {
        transactions: [],
        goals: [],
        budgets: [],
        netWorthItems: []
      };
      localStorage.setItem(`paisa_data_${emailKey}`, JSON.stringify(freshData));
    }

    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <button className="back-home-btn" onClick={() => navigate('/')}>
        <ArrowLeft size={16} /> Back to Home
      </button>

      <div className="login-box glass-card">
        {/* Brand Header */}
        <div className="brand-header">
          <div className="brand-logo">₹</div>
          <h2>Paisa</h2>
          <span>Finance Manager</span>
        </div>

        <h3 className="login-title serif-text">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h3>
        <p className="login-subtitle text-muted">
          {isLogin 
            ? 'Enter your credentials to access your financial dashboard' 
            : 'Start tracking your money smarter in under a minute'}
        </p>

        <form onSubmit={handleSubmit} className="login-form mt-4">
          {!isLogin && (
            <div className="form-group">
              <label className="input-label">FULL NAME</label>
              <div className="input-wrapper">
                <User size={18} className="input-icon" />
                <input 
                  type="text" 
                  name="name" 
                  className="input-field" 
                  placeholder="John Doe" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="input-label">EMAIL ADDRESS</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input 
                type="email" 
                name="email" 
                className="input-field" 
                placeholder="you@example.com" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label className="input-label">PASSWORD</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input 
                type="password" 
                name="password" 
                className="input-field" 
                placeholder="••••••••" 
                value={formData.password} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          {!isLogin && (
            <>
              <div className="form-group">
                <label className="input-label">CONFIRM PASSWORD</label>
                <div className="input-wrapper">
                  <Lock size={18} className="input-icon" />
                  <input 
                    type="password" 
                    name="confirmPassword" 
                    className="input-field" 
                    placeholder="••••••••" 
                    value={formData.confirmPassword} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="input-label">PREFERRED CURRENCY</label>
                <div className="input-wrapper">
                  <Wallet size={18} className="input-icon" />
                  <select 
                    name="currency" 
                    className="input-field select-field" 
                    value={formData.currency} 
                    onChange={handleChange}
                  >
                    <option value="₹ INR">INR ₹ (Indian Rupee)</option>
                    <option value="$ USD">USD $ (US Dollar)</option>
                    <option value="€ EUR">EUR € (Euro)</option>
                    <option value="£ GBP">GBP £ (British Pound)</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <button type="submit" className="btn-primary w-100 mt-4 submit-btn">
            {isLogin ? 'Sign In to Dashboard' : 'Create Free Account'} <ArrowRight size={18} />
          </button>
        </form>

        <p className="toggle-text">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span className="toggle-link" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Create Account' : 'Sign In'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
