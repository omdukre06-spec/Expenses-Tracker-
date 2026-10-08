import React, { useState } from 'react';
import { ToggleRight, Check, Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './SettingsPaisa.css';

const SettingsPaisa = ({ isDarkMode, setIsDarkMode, currency, setCurrency }) => {
  const navigate = useNavigate();
  const [toastMsg, setToastMsg] = useState('');
  const [activeTheme, setActiveTheme] = useState('Walnut');
  const [name, setName] = useState('User');
  const [email, setEmail] = useState('user@example.com');

  const currencies = [
    { symbol: '₹', code: 'INR', name: 'Indian Rupee' },
    { symbol: '$', code: 'USD', name: 'US Dollar' },
    { symbol: '€', code: 'EUR', name: 'Euro' },
    { symbol: '£', code: 'GBP', name: 'British Pound' },
    { symbol: '¥', code: 'JPY', name: 'Japanese Yen' },
    { symbol: '₩', code: 'KRW', name: 'South Korean' },
    { symbol: '₦', code: 'NGN', name: 'Nigerian Naira' },
    { symbol: 'Fr', code: 'CHF', name: 'Swiss Franc' },
  ];

  const themes = [
    { name: 'Walnut', color: '#d97706' },
    { name: 'Ocean', color: '#3b82f6' },
    { name: 'Forest', color: '#10b981' },
    { name: 'Lavender', color: '#8b5cf6' },
    { name: 'Ruby', color: '#ef4444' },
    { name: 'Midnight', color: '#6366f1' },
  ];

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  const handleSignOut = () => {
    showToast('Signing out...');
    setTimeout(() => navigate('/login'), 1000);
  };

  return (
    <div className="paisa-page settings-page" style={{maxWidth: '800px', margin: '0 auto', paddingBottom: '60px'}}>
      
      {toastMsg && (
        <div style={{
          position: 'fixed', top: '20px', right: '20px', zIndex: 3000,
          background: 'var(--accent-orange)', color: '#fff', padding: '12px 24px',
          borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500
        }}>
          <Check size={18} /> {toastMsg}
        </div>
      )}

      <div className="page-header mb-4">
        <div>
          <h2 className="serif-text">Settings & Profile</h2>
          <p className="text-muted">Manage your account preferences, currency, and theme</p>
        </div>
      </div>

      {/* Basic Information */}
      <div className="glass-card settings-section">
        <h3 className="serif-text">Basic Information</h3>
        
        <div className="mt-4 flex-align gap-4" style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
          <div style={{position: 'relative'}}>
            <div style={{width:'70px', height:'70px', background:'var(--accent-orange)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px', color:'#fff'}}>
              {name ? name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div style={{position:'absolute', bottom:'0', right:'0', background:'var(--bg-card)', padding:'4px', borderRadius:'50%', border:'1px solid var(--card-border)', display:'flex'}}>
              <Pencil size={12} color="var(--accent-orange)" />
            </div>
          </div>
          <span style={{color:'var(--accent-orange)', fontSize:'0.9rem', cursor:'pointer'}} onClick={() => showToast('Avatar updated!')}>Change photo</span>
        </div>

        <div className="mt-6">
          <label className="settings-label">FULL NAME</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            className="settings-input" 
            placeholder="Your Name"
          />
        </div>
        
        <div className="mt-4">
          <label className="settings-label">EMAIL</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="settings-input" 
            placeholder="you@example.com"
          />
          <p className="text-muted mt-1" style={{fontSize:'0.75rem'}}>Your account email address</p>
        </div>

        <div className="mt-4">
          <label className="settings-label">DEFAULT CURRENCY</label>
          <div className="currency-grid">
            {currencies.map(c => (
              <div 
                key={c.code} 
                className={`currency-item ${currency === c.symbol ? 'active' : ''}`}
                onClick={() => { setCurrency(c.symbol); showToast(`Currency updated to ${c.symbol} ${c.code}`); }}
                style={{cursor: 'pointer'}}
              >
                <span>{c.symbol}</span> {c.code}
              </div>
            ))}
          </div>
        </div>

        <button className="btn-primary w-100 mt-6 justify-center" onClick={() => showToast('Profile details saved successfully!')}>
          Save Changes
        </button>
      </div>

      {/* Change Password */}
      <div className="glass-card settings-section mt-4">
        <h3 className="serif-text">Change Password</h3>
        
        <div className="mt-4">
          <label className="settings-label">NEW PASSWORD</label>
          <input type="password" placeholder="Min. 6 characters" className="settings-input" />
        </div>
        <div className="mt-4">
          <label className="settings-label">CONFIRM PASSWORD</label>
          <input type="password" placeholder="Repeat password" className="settings-input" />
        </div>
        
        <button className="btn-primary w-100 mt-4 justify-center" onClick={() => showToast('Password updated successfully!')}>
          Change Password
        </button>
      </div>

      {/* Appearance */}
      <div className="glass-card settings-section mt-4">
        <h3 className="serif-text">Appearance</h3>
        
        <div className="mt-4">
          <label className="settings-label">COLOR ACCENT</label>
          <div className="theme-grid mt-2">
            {themes.map(t => (
              <div 
                key={t.name} 
                className={`theme-item ${activeTheme === t.name ? 'active' : ''}`}
                onClick={() => { setActiveTheme(t.name); showToast(`Theme accent updated to ${t.name}`); }}
                style={{cursor: 'pointer'}}
              >
                <div className="theme-circle" style={{background: t.color}}></div>
                <span style={{fontSize: '0.85rem', marginTop:'8px'}}>{t.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex-between mt-6 pt-4" style={{borderTop: '1px solid var(--card-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div>
            <h4 style={{fontWeight: 500}}>Dark / Light Mode</h4>
            <p className="text-muted text-sm">Toggle application interface brightness</p>
          </div>
          <div style={{cursor:'pointer'}} onClick={() => setIsDarkMode(!isDarkMode)}>
            <ToggleRight size={36} color={isDarkMode ? 'var(--accent-orange)' : 'var(--text-muted)'} fill={isDarkMode ? 'var(--accent-orange)' : 'transparent'} />
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="glass-card settings-section mt-4 danger-zone">
        <h3 className="serif-text danger-text">Account Actions</h3>
        <button className="btn-secondary w-100 mt-4 justify-center" onClick={handleSignOut}>
          Sign Out of Account
        </button>
      </div>

    </div>
  );
};

export default SettingsPaisa;
