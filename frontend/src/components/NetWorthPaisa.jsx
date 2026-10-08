import React, { useState } from 'react';
import { Plus, ArrowUpRight, TrendingUp, TrendingDown } from 'lucide-react';
import './TransactionsPaisa.css';

const NetWorthPaisa = ({ netWorthItems = [], onOpenModal, currency = '₹' }) => {
  const [filter, setFilter] = useState('ALL');

  const assets = netWorthItems.filter(i => i.itemType === 'ASSET');
  const liabilities = netWorthItems.filter(i => i.itemType === 'LIABILITY');

  const totalAssets = assets.reduce((acc, i) => acc + Number(i.amount || 0), 0);
  const totalLiabilities = liabilities.reduce((acc, i) => acc + Number(i.amount || 0), 0);
  const netWorth = totalAssets - totalLiabilities;
  const debtRatio = totalAssets > 0 ? Math.round((totalLiabilities / totalAssets) * 100) : 0;

  const filteredItems = filter === 'ALL' ? netWorthItems : (filter === 'ASSET' ? assets : liabilities);

  return (
    <div className="paisa-page">
      <div className="page-header">
        <div>
          <h2 className="serif-text">Net Worth</h2>
          <p className="text-muted">Assets minus liabilities</p>
        </div>
        <button className="btn-primary" onClick={() => onOpenModal('networth')}>
          <Plus size={18} /> Add Item
        </button>
      </div>

      <div className="glass-card stat-row mt-4">
        <div className="stat-item">
          <h3 style={{color: netWorth >= 0 ? 'var(--accent-green)' : 'var(--accent-red)'}}>
            {netWorth >= 0 ? '' : '-'}{currency}{Math.abs(netWorth).toLocaleString()}
          </h3>
          <p className="label">NET WORTH</p>
        </div>
        <div className="stat-item border-left">
          <h3 style={{color: 'var(--accent-green)'}}>{currency}{totalAssets.toLocaleString()}</h3>
          <p className="label">TOTAL ASSETS</p>
        </div>
        <div className="stat-item border-left">
          <h3 style={{color: 'var(--accent-red)'}}>{currency}{totalLiabilities.toLocaleString()}</h3>
          <p className="label">TOTAL LIABILITIES</p>
        </div>
        <div className="stat-item border-left">
          <h3 style={{color: debtRatio > 50 ? 'var(--accent-red)' : 'var(--accent-orange)'}}>{debtRatio}%</h3>
          <p className="label">DEBT RATIO</p>
        </div>
      </div>

      <div className="mt-4 mb-4" style={{display:'flex', gap:'8px'}}>
        <button 
          className={filter === 'ALL' ? 'btn-primary' : 'glass-card btn-text'} 
          style={{borderRadius:'20px', padding:'6px 16px', fontSize:'0.85rem'}}
          onClick={() => setFilter('ALL')}
        >
          All ({netWorthItems.length})
        </button>
        <button 
          className={filter === 'ASSET' ? 'btn-primary' : 'glass-card btn-text'} 
          style={{borderRadius:'20px', padding:'6px 16px', fontSize:'0.85rem'}}
          onClick={() => setFilter('ASSET')}
        >
          Assets ({assets.length})
        </button>
        <button 
          className={filter === 'LIABILITY' ? 'btn-primary' : 'glass-card btn-text'} 
          style={{borderRadius:'20px', padding:'6px 16px', fontSize:'0.85rem'}}
          onClick={() => setFilter('LIABILITY')}
        >
          Liabilities ({liabilities.length})
        </button>
      </div>

      {filteredItems.length === 0 ? (
        <div className="glass-card mt-4" style={{minHeight:'350px', display:'flex', alignItems:'center', justifyContent:'center'}}>
          <div style={{textAlign:'center', padding: '20px'}}>
            <ArrowUpRight size={48} color="var(--card-border)" />
            <h3 className="serif-text mt-4" style={{fontSize:'1.2rem'}}>No items yet</h3>
            <p className="text-muted mt-2 mb-4">Add your bank savings, investments, property or loans</p>
            <button className="btn-primary" style={{margin:'0 auto'}} onClick={() => onOpenModal('networth')}>
              <Plus size={18} /> Add Item
            </button>
          </div>
        </div>
      ) : (
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px'}} className="mt-4">
          {filteredItems.map((item, idx) => (
            <div key={idx} className="glass-card flex-between" style={{padding: '20px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%', 
                  background: item.itemType === 'ASSET' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {item.itemType === 'ASSET' ? <TrendingUp size={18} color="var(--accent-green)" /> : <TrendingDown size={18} color="var(--accent-red)" />}
                </div>
                <div>
                  <h4 style={{fontWeight: 600, fontSize: '0.95rem'}}>{item.title}</h4>
                  <span className="text-muted" style={{fontSize: '0.75rem'}}>{item.itemType}</span>
                </div>
              </div>
              <div style={{textAlign: 'right'}}>
                <h4 style={{
                  fontWeight: 600, 
                  color: item.itemType === 'ASSET' ? 'var(--accent-green)' : 'var(--accent-red)'
                }}>
                  {currency}{Number(item.amount).toLocaleString()}
                </h4>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NetWorthPaisa;
