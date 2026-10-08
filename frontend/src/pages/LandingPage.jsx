import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, PieChart, Wallet, Shield } from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <nav className="navbar">
        <h1 className="logo">ExpenseTracker</h1>
        <div className="nav-links">
          <button className="btn-login" onClick={() => navigate('/login')}>Login</button>
        </div>
      </nav>

      <main className="hero">
        <div className="hero-content">
          <h2 className="hero-title">Manage Your Money <span className="highlight">Smarter</span></h2>
          <p className="hero-subtitle">
            Track your income, expenses, and budgets in one simple, beautiful dashboard.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary flex-center" onClick={() => navigate('/login')}>
              Get Started <ArrowRight size={18} style={{marginLeft: '8px'}}/>
            </button>
          </div>
        </div>
      </main>

      <section className="features-section">
        <h3 className="section-title">Why use Expense Tracker?</h3>
        <div className="features-grid">
          <div className="feature-card glass-card">
            <Wallet size={32} className="feature-icon" />
            <h4>Track Spending</h4>
            <p>Know exactly where your money goes every month.</p>
          </div>
          <div className="feature-card glass-card">
            <PieChart size={32} className="feature-icon" />
            <h4>Monitor Budget</h4>
            <p>Set custom budgets and get real-time alerts.</p>
          </div>
          <div className="feature-card glass-card">
            <Shield size={32} className="feature-icon" />
            <h4>Secure Account</h4>
            <p>Your financial data is encrypted and secure.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
