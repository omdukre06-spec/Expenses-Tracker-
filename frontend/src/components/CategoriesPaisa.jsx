import React from 'react';
import { LayoutList, Plus } from 'lucide-react';
import './TransactionsPaisa.css';

const CategoriesPaisa = ({ transactions = [], onOpenModal, currency = '₹' }) => {
  // Default list of categories with assigned colors
  const defaultExpenseCategories = [
    { key: 'Food', name: '🍔 Food & Dining', color: '#f59e0b' },
    { key: 'Rent', name: '🏠 Rent & Housing', color: '#ef4444' },
    { key: 'Shopping', name: '🛍 Shopping & Personal', color: '#8b5cf6' },
    { key: 'Transport', name: '🚗 Transportation', color: '#3b82f6' },
    { key: 'Bills', name: '💡 Electricity & Water', color: '#10b981' },
    { key: 'Entertainment', name: '🎬 Entertainment', color: '#ec4899' },
    { key: 'Health', name: '🏥 Health & Medical', color: '#06b6d4' },
    { key: 'Education', name: '🎓 Education & Courses', color: '#6366f1' },
    { key: 'Investment', name: '📈 Investments', color: '#d97706' },
    { key: 'Other', name: '📦 Other Expenses', color: '#6b7280' },
  ];

  const defaultIncomeCategories = [
    { key: 'Salary', name: '💼 Main Salary', color: '#10b981' },
    { key: 'Freelance', name: '💻 Freelance Projects', color: '#3b82f6' },
    { key: 'Investment', name: '📈 Investments & Dividends', color: '#8b5cf6' },
    { key: 'Bonus', name: '🎁 Bonus & Gifts', color: '#f59e0b' },
    { key: 'Other', name: '🪙 Other Income', color: '#6366f1' },
  ];

  // Dynamically compute totals from actual transactions
  const getCategoryStats = (catKey, type) => {
    const list = transactions.filter(t => t.type === type && (t.category.toLowerCase().includes(catKey.toLowerCase()) || catKey.toLowerCase().includes(t.category.toLowerCase())));
    const count = list.length;
    const total = list.reduce((acc, t) => acc + Number(t.amount || 0), 0);
    return { count, total };
  };

  return (
    <div className="paisa-page">
      <div className="page-header">
        <div>
          <h2 className="serif-text">Categories</h2>
          <p className="text-muted">Manage your income and expense categories</p>
        </div>
        <button className="btn-primary" onClick={() => onOpenModal('category')}>
          <Plus size={18} /> Add Category
        </button>
      </div>

      <div className="mt-6">
        <h3 className="serif-text mb-4" style={{fontSize: '1.1rem'}}>Expense Categories</h3>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px'}}>
          {defaultExpenseCategories.map((cat, i) => {
            const stats = getCategoryStats(cat.key, 'EXPENSE');
            return (
              <div key={i} className="glass-card" style={{padding: '20px', position: 'relative', overflow: 'hidden'}}>
                <div style={{position: 'absolute', top: 0, left: 0, bottom: 0, width: '4px', background: cat.color}}></div>
                <h4 style={{fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)'}}>{cat.name}</h4>
                <div className="flex-between mt-3">
                  <span className="text-muted" style={{fontSize: '0.8rem'}}>{stats.count} transactions</span>
                  <span style={{fontWeight: 600, color: 'var(--accent-red)'}}>{currency}{stats.total.toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="serif-text mb-4" style={{fontSize: '1.1rem'}}>Income Categories</h3>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px'}}>
          {defaultIncomeCategories.map((cat, i) => {
            const stats = getCategoryStats(cat.key, 'INCOME');
            return (
              <div key={i} className="glass-card" style={{padding: '20px', position: 'relative', overflow: 'hidden'}}>
                <div style={{position: 'absolute', top: 0, left: 0, bottom: 0, width: '4px', background: cat.color}}></div>
                <h4 style={{fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)'}}>{cat.name}</h4>
                <div className="flex-between mt-3">
                  <span className="text-muted" style={{fontSize: '0.8rem'}}>{stats.count} entries</span>
                  <span style={{fontWeight: 600, color: 'var(--accent-green)'}}>{currency}{stats.total.toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPaisa;
