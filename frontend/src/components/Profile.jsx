import React from 'react';
import './Profile.css';

const Profile = () => {
  return (
    <div className="profile-view glass-card">
      <div className="profile-header">
        <div className="avatar">VD</div>
        <h2>Vaidehi Dukre</h2>
        <p className="text-muted">example@gmail.com</p>
      </div>

      <div className="profile-details mt-4">
        <div className="detail-item">
          <label>Currency</label>
          <p>INR ₹</p>
        </div>
        <div className="detail-item">
          <label>Monthly Income</label>
          <p>₹50,000</p>
        </div>
        
        <button className="btn-secondary mt-4">Edit Profile</button>
      </div>

      <hr className="divider" />

      <div className="security-section">
        <h3>Security</h3>
        <button className="btn-secondary">Change Password</button>
        <button className="btn-primary" style={{background: 'var(--danger)'}}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
