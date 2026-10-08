import React from 'react';
import { RotateCcw, Plus, Calendar } from 'lucide-react';
import './TransactionsPaisa.css';

const RecurringPaisa = ({ onOpenModal }) => {
  const recurringList = [
    { name: 'Netflix Premium Subscription', amount: '₹649', frequency: 'Monthly', dueDate: '15 Oct 2026', type: 'EXPENSE', icon: '🎬' },
    { name: 'House Rent Payment', amount: '₹18,000', frequency: 'Monthly', dueDate: '01 Nov 2026', type: 'EXPENSE', icon: '🏠' },
    { name: 'Fiber Broadband Bill', amount: '₹999', frequency: 'Monthly', dueDate: '22 Oct 2026', type: 'EXPENSE', icon: '🌐' },
    { name: 'Monthly Salary Credit', amount: '₹75,000', frequency: 'Monthly', dueDate: '31 Oct 2026', type: 'INCOME', icon: '💼' }
  ];

  return (
    <div className="paisa-page">
      <div className="page-header">
        <div>
          <h2 className="serif-text">Recurring Payments</h2>
          <p className="text-muted">Automated bill tracking & upcoming subscriptions</p>
        </div>
        <button className="btn-primary" onClick={() => onOpenModal('recurring')}>
          <Plus size={18} /> Add Recurring
        </button>
      </div>

      <div className="glass-card stat-row mt-4">
        <div className="stat-item">
          <h3 style={{color: 'var(--accent-orange)'}}>4</h3>
          <p className="label">ACTIVE RECURRING</p>
        </div>
        <div className="stat-item border-left">
          <h3 style={{color: 'var(--accent-red)'}}>₹19,648</h3>
          <p className="label">MONTHLY OBLIGATION</p>
        </div>
        <div className="stat-item border-left">
          <h3 style={{color: 'var(--accent-green)'}}>₹75,000</h3>
          <p className="label">MONTHLY RECURRING INCOME</p>
        </div>
      </div>

      <div className="mt-6 flex-col gap-3">
        {recurringList.map((item, index) => (
          <div key={index} className="glass-card flex-between" style={{padding: '20px', flexWrap: 'wrap', gap: '12px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
              <div style={{fontSize: '1.5rem', width: '44px', height: '44px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                {item.icon}
              </div>
              <div>
                <h4 style={{fontWeight: 600, color: 'var(--text-main)'}}>{item.name}</h4>
                <div style={{display: 'flex', gap: '12px', marginTop: '4px', fontSize: '0.8rem', color: 'var(--text-muted)'}}>
                  <span>🔄 {item.frequency}</span>
                  <span>•</span>
                  <span style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                    <Calendar size={12} /> Due {item.dueDate}
                  </span>
                </div>
              </div>
            </div>

            <div style={{textAlign: 'right'}}>
              <h3 style={{color: item.type === 'INCOME' ? 'var(--accent-green)' : 'var(--accent-red)', fontSize: '1.2rem'}}>
                {item.type === 'INCOME' ? '+' : '-'}{item.amount}
              </h3>
              <span className="text-muted" style={{fontSize: '0.75rem'}}>Auto-tracked</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecurringPaisa;
