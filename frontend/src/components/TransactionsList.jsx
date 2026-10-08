import React, { useState } from 'react';
import './TransactionsList.css';
import { Edit2, Trash2 } from 'lucide-react';

const TransactionsList = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, date: '06 Oct', desc: 'Salary', cat: 'Salary', type: 'INCOME', amount: '+₹50,000' },
    { id: 2, date: '06 Oct', desc: 'Lunch', cat: 'Food', type: 'EXPENSE', amount: '-₹500' },
    { id: 3, date: '05 Oct', desc: 'Bus', cat: 'Travel', type: 'EXPENSE', amount: '-₹200' },
    { id: 4, date: '04 Oct', desc: 'Electricity', cat: 'Bills', type: 'EXPENSE', amount: '-₹2,000' },
  ]);

  return (
    <div className="transactions-list-view glass-card">
      <div className="list-header flex-between">
        <input type="text" className="search-bar input-field" placeholder="Search transactions..." />
        <div className="filters">
          <select className="input-field"><option>All Types</option><option>Income</option><option>Expense</option></select>
          <select className="input-field"><option>Category</option></select>
          <select className="input-field"><option>Date</option></select>
        </div>
      </div>
      
      <table className="transactions-table mt-4">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(t => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>{t.desc}</td>
              <td>{t.cat}</td>
              <td><span className={`badge ${t.type.toLowerCase()}`}>{t.type}</span></td>
              <td className={t.type === 'INCOME' ? 'income-text' : 'expense-text'}>{t.amount}</td>
              <td className="actions-cell">
                <Edit2 size={16} className="action-icon" />
                <Trash2 size={16} className="action-icon danger" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsList;
