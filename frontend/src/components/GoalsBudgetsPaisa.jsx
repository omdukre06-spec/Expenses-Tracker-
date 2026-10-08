import React from 'react';
import { Target, Plus, Wallet, CheckCircle2 } from 'lucide-react';
import './TransactionsPaisa.css';

export const GoalsPaisa = ({ goals = [], onOpenModal, currency = '₹' }) => {
  return (
    <div className="paisa-page">
      <div className="page-header">
        <div>
          <h2 className="serif-text">Goals</h2>
          <p className="text-muted">Track your financial goals and savings progress</p>
        </div>
        <button className="btn-primary" onClick={() => onOpenModal('goal')}>
          <Plus size={18} /> New Goal
        </button>
      </div>

      {goals.length === 0 ? (
        <div className="glass-card mt-4" style={{minHeight:'400px', display:'flex', alignItems:'center', justifyContent:'center'}}>
          <div style={{textAlign:'center', padding: '20px'}}>
            <Target size={48} color="var(--card-border)" />
            <h3 className="serif-text mt-4" style={{fontSize:'1.3rem'}}>No goals yet</h3>
            <p className="text-muted mt-2 mb-4" style={{maxWidth:'300px', margin:'8px auto 24px'}}>
              Set a financial goal (e.g. Vacation, Emergency Fund) and track your progress towards it
            </p>
            <button className="btn-primary" style={{margin:'0 auto'}} onClick={() => onOpenModal('goal')}>
              <Plus size={18} /> New Goal
            </button>
          </div>
        </div>
      ) : (
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px'}} className="mt-4">
          {goals.map((goal, index) => {
            const current = Number(goal.currentAmount || 0);
            const target = Number(goal.targetAmount || 1);
            const pct = Math.min(100, Math.round((current / target) * 100));
            return (
              <div key={index} className="glass-card" style={{padding: '24px'}}>
                <div className="flex-between">
                  <h4 style={{fontWeight: 600, fontSize: '1.1rem'}}>{goal.title}</h4>
                  <span style={{fontSize: '0.8rem', color: 'var(--accent-orange)', fontWeight: 600}}>{pct}%</span>
                </div>

                <div style={{marginTop: '16px', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden'}}>
                  <div style={{width: `${pct}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent-orange), #f59e0b)', borderRadius: '4px'}}></div>
                </div>

                <div className="flex-between mt-4">
                  <div>
                    <span className="text-muted" style={{fontSize: '0.75rem', display: 'block'}}>SAVED</span>
                    <span style={{fontWeight: 600, color: 'var(--accent-green)'}}>{currency}{current.toLocaleString()}</span>
                  </div>
                  <div style={{textAlign: 'right'}}>
                    <span className="text-muted" style={{fontSize: '0.75rem', display: 'block'}}>TARGET</span>
                    <span style={{fontWeight: 600}}>{currency}{target.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const BudgetsPaisa = ({ budgets = [], onOpenModal, currency = '₹' }) => {
  return (
    <div className="paisa-page">
      <div className="page-header">
        <div>
          <h2 className="serif-text">Budgets</h2>
          <p className="text-muted">Monthly spending limits by category</p>
        </div>
        <button className="btn-primary" onClick={() => onOpenModal('budget')}>
          <Plus size={18} /> Set Budget
        </button>
      </div>

      {budgets.length === 0 ? (
        <div className="glass-card mt-4" style={{minHeight:'400px', display:'flex', alignItems:'center', justifyContent:'center'}}>
          <div style={{textAlign:'center', padding: '20px'}}>
            <Wallet size={48} color="var(--card-border)" />
            <h3 className="serif-text mt-4" style={{fontSize:'1.3rem'}}>No budgets set</h3>
            <p className="text-muted mt-2 mb-4" style={{maxWidth:'300px', margin:'8px auto 24px'}}>
              Set monthly spending limits for your categories to prevent overspending
            </p>
            <button className="btn-primary" style={{margin:'0 auto'}} onClick={() => onOpenModal('budget')}>
              <Plus size={18} /> Set Budget
            </button>
          </div>
        </div>
      ) : (
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px'}} className="mt-4">
          {budgets.map((b, index) => {
            const spent = Number(b.spent || 0);
            const limit = Number(b.amount || 1);
            const pct = Math.min(100, Math.round((spent / limit) * 100));
            const isOver = spent > limit;
            return (
              <div key={index} className="glass-card" style={{padding: '24px'}}>
                <div className="flex-between">
                  <h4 style={{fontWeight: 600, fontSize: '1.1rem'}}>{b.category}</h4>
                  <span style={{fontSize: '0.85rem', color: isOver ? 'var(--accent-red)' : 'var(--accent-green)', fontWeight: 600}}>
                    {isOver ? 'Exceeded' : 'On Track'}
                  </span>
                </div>

                <div style={{marginTop: '16px', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden'}}>
                  <div style={{
                    width: `${pct}%`, height: '100%', 
                    background: isOver ? 'var(--accent-red)' : 'var(--accent-green)', 
                    borderRadius: '4px'
                  }}></div>
                </div>

                <div className="flex-between mt-4">
                  <div>
                    <span className="text-muted" style={{fontSize: '0.75rem', display: 'block'}}>SPENT</span>
                    <span style={{fontWeight: 600, color: isOver ? 'var(--accent-red)' : 'var(--text-main)'}}>{currency}{spent.toLocaleString()}</span>
                  </div>
                  <div style={{textAlign: 'right'}}>
                    <span className="text-muted" style={{fontSize: '0.75rem', display: 'block'}}>LIMIT</span>
                    <span style={{fontWeight: 600}}>{currency}{limit.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
