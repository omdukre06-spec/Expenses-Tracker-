import React from 'react';
import './BudgetManagement.css';
import { AlertTriangle } from 'lucide-react';

const BudgetManagement = () => {
  return (
    <div className="budget-management">
      <div className="budget-overview glass-card">
        <h3>MONTHLY BUDGET</h3>
        
        <div className="budget-stats flex-between mt-4">
          <div>
            <p className="text-muted">Total Budget</p>
            <h4>₹30,000</h4>
          </div>
          <div>
            <p className="text-muted">Used</p>
            <h4>₹21,000</h4>
          </div>
          <div>
            <p className="text-muted">Remaining</p>
            <h4 className="success-text">₹9,000</h4>
          </div>
        </div>
        
        <div className="progress-bar-container mt-4">
          <div className="progress-bar" style={{width: '70%', background: 'var(--primary)'}}></div>
        </div>
      </div>

      <div className="budget-alert glass-card mt-4">
        <AlertTriangle color="var(--danger)" />
        <div>
          <h4>Budget Alert</h4>
          <p>You have exceeded your Shopping budget by ₹500.</p>
        </div>
      </div>

      <div className="category-budgets mt-4">
        <div className="cat-budget glass-card">
          <div className="flex-between">
            <h4>Food</h4>
            <p>₹5,000 / ₹7,000</p>
          </div>
          <div className="progress-bar-container mt-4">
            <div className="progress-bar" style={{width: '71%', background: '#34d399'}}></div>
          </div>
        </div>
        
        <div className="cat-budget glass-card">
          <div className="flex-between">
            <h4>Shopping</h4>
            <p className="danger-text">₹6,500 / ₹6,000</p>
          </div>
          <div className="progress-bar-container mt-4">
            <div className="progress-bar" style={{width: '100%', background: 'var(--danger)'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetManagement;
