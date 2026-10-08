import React, { useState } from 'react';
import './AddTransaction.css';

const AddTransaction = ({ type }) => {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    date: '',
    paymentMethod: 'UPI',
    description: '',
    notes: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting", type, formData);
    // Send to backend...
  };

  const categories = type === 'EXPENSE' ? [
    '🍔 Food', '🚗 Transport', '🛍 Shopping', '🏠 Rent', 
    '💡 Electricity', '📱 Mobile', '🎓 Education', 
    '🏥 Healthcare', '🎬 Entertainment', '✈ Travel', '📦 Other'
  ] : [
    'Salary', 'Freelance', 'Business', 'Investment', 'Bonus', 'Gift', 'Other'
  ];

  return (
    <div className="add-transaction glass-card">
      <h3>ADD {type}</h3>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="form-group">
          <label>Amount (₹)</label>
          <input type="number" name="amount" className="input-field" placeholder="0.00" onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label>{type === 'EXPENSE' ? 'Category' : 'Source'}</label>
          <select name="category" className="input-field" onChange={handleChange} required>
            <option value="">Select...</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Date</label>
          <input type="date" name="date" className="input-field" onChange={handleChange} required />
        </div>

        {type === 'EXPENSE' && (
          <div className="form-group">
            <label>Payment Method</label>
            <select name="paymentMethod" className="input-field" onChange={handleChange}>
              <option value="UPI">UPI</option>
              <option value="Card">Card</option>
              <option value="Cash">Cash</option>
            </select>
          </div>
        )}

        <div className="form-group">
          <label>Description</label>
          <input type="text" name="description" className="input-field" placeholder="Brief description" onChange={handleChange} />
        </div>

        {type === 'EXPENSE' && (
          <div className="form-group">
            <label>Notes</label>
            <input type="text" name="notes" className="input-field" placeholder="Additional notes" onChange={handleChange} />
          </div>
        )}

        <div className="flex-between mt-4">
          <button type="button" className="btn-secondary">Cancel</button>
          <button type="submit" className="btn-primary">Add {type}</button>
        </div>
      </form>
    </div>
  );
};

export default AddTransaction;
