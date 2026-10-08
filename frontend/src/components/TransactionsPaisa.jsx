import React, { useState } from 'react';
import { Search, Plus, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import './TransactionsPaisa.css';

const TransactionsPaisa = ({ transactions = [], onOpenModal, currency = '₹' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'ALL' || t.type === typeFilter;
    const matchesCategory = categoryFilter === 'ALL' || t.category.includes(categoryFilter);
    return matchesSearch && matchesType && matchesCategory;
  });

  const totalIncome = transactions.filter(t => t.type === 'INCOME').reduce((acc, t) => acc + Number(t.amount || 0), 0);
  const totalExpense = transactions.filter(t => t.type === 'EXPENSE').reduce((acc, t) => acc + Number(t.amount || 0), 0);
  const netBalance = totalIncome - totalExpense;

  return (
    <div className="paisa-page">
      <div className="page-header">
        <div>
          <h2 className="serif-text">Transactions</h2>
          <p className="text-muted">All your income and expenses</p>
        </div>
        <button className="btn-primary" onClick={() => onOpenModal('transaction')}>
          <Plus size={18} /> Add Transaction
        </button>
      </div>

      <div className="glass-card stat-row mt-4">
        <div className="stat-item">
          <h3 style={{color: 'var(--accent-green)'}}>{currency}{totalIncome.toLocaleString()}</h3>
          <p className="label">INCOME</p>
        </div>
        <div className="stat-item border-left">
          <h3 style={{color: 'var(--accent-red)'}}>{currency}{totalExpense.toLocaleString()}</h3>
          <p className="label">EXPENSES</p>
        </div>
        <div className="stat-item border-left">
          <h3 style={{color: netBalance >= 0 ? 'var(--accent-green)' : 'var(--accent-red)'}}>
            {netBalance >= 0 ? '+' : ''}{currency}{netBalance.toLocaleString()}
          </h3>
          <p className="label">NET BALANCE</p>
        </div>
        <div className="stat-item border-left">
          <h3 style={{color: 'var(--accent-orange)'}}>{transactions.length}</h3>
          <p className="label">TOTAL TRANSACTIONS</p>
        </div>
      </div>

      <div className="filters-row mt-4 flex-between">
        <div className="search-box glass-card">
          <Search size={16} color="var(--text-muted)" />
          <input 
            type="text" 
            placeholder="Search transactions by title or category..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-selects">
          <select className="glass-card" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="ALL">All Types</option>
            <option value="INCOME">Income Only</option>
            <option value="EXPENSE">Expense Only</option>
          </select>
          <select className="glass-card" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="ALL">All Categories</option>
            <option value="Food">Food & Dining</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Rent">Rent</option>
            <option value="Salary">Salary</option>
          </select>
        </div>
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="glass-card empty-state-container mt-4">
          <div className="empty-state-content">
            <Search size={48} color="var(--card-border)" />
            <h3 className="serif-text mt-4">No transactions found</h3>
            <p className="text-muted">Try adjusting your search filters or click 'Add Transaction'</p>
            <button className="btn-primary mt-4" style={{margin: '16px auto 0'}} onClick={() => onOpenModal('transaction')}>
              <Plus size={18} /> Add First Transaction
            </button>
          </div>
        </div>
      ) : (
        <div className="glass-card mt-4" style={{overflow: 'hidden'}}>
          <div className="table-responsive">
            <table style={{width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem'}}>
              <thead>
                <tr style={{borderBottom: '1px solid var(--card-border)', color: 'var(--text-muted)', fontSize: '0.75rem'}}>
                  <th style={{padding: '16px 20px'}}>TITLE</th>
                  <th style={{padding: '16px 20px'}}>CATEGORY</th>
                  <th style={{padding: '16px 20px'}}>DATE</th>
                  <th style={{padding: '16px 20px'}}>PAYMENT</th>
                  <th style={{padding: '16px 20px', textAlign: 'right'}}>AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((item, index) => (
                  <tr key={index} style={{borderBottom: '1px solid var(--card-border)'}}>
                    <td style={{padding: '16px 20px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '10px'}}>
                      <div style={{
                        width: '32px', height: '32px', borderRadius: '50%', 
                        background: item.type === 'INCOME' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        {item.type === 'INCOME' ? <ArrowUpRight size={16} color="var(--accent-green)" /> : <ArrowDownRight size={16} color="var(--accent-red)" />}
                      </div>
                      {item.title}
                    </td>
                    <td style={{padding: '16px 20px', color: 'var(--text-muted)'}}>{item.category}</td>
                    <td style={{padding: '16px 20px', color: 'var(--text-muted)'}}>{item.date}</td>
                    <td style={{padding: '16px 20px', color: 'var(--text-muted)'}}>{item.paymentMethod || '—'}</td>
                    <td style={{
                      padding: '16px 20px', textAlign: 'right', fontWeight: 600, 
                      color: item.type === 'INCOME' ? 'var(--accent-green)' : 'var(--accent-red)'
                    }}>
                      {item.type === 'INCOME' ? '+' : '-'}{currency}{Number(item.amount).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionsPaisa;
