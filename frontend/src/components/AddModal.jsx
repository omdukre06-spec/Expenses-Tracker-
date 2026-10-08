import React, { useState } from 'react';
import { X, TrendingDown, TrendingUp, Scissors, Plus, Save, Check } from 'lucide-react';
import './AddModal.css';

const AddModal = ({ isOpen, onClose, modalType, onAddData, currency = '₹' }) => {
  const [type, setType] = useState('EXPENSE'); // 'EXPENSE' or 'INCOME'
  const [isSplit, setIsSplit] = useState(false);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');
  const [title, setTitle] = useState('');

  // Split transaction state
  const [splitRows, setSplitRows] = useState([
    { category: 'Food', amount: '', note: '' },
    { category: 'Transport', amount: '', note: '' }
  ]);

  // Other modal states
  const [targetAmount, setTargetAmount] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [itemType, setItemType] = useState('ASSET');
  const [frequency, setFrequency] = useState('Monthly');

  if (!isOpen) return null;

  const expenseCategories = ['Food', 'Transport', 'Shopping', 'Rent', 'Bills', 'Mobile', 'Education', 'Health', 'Entertainment', 'Travel', 'Other'];
  const incomeCategories = ['Salary', 'Freelance', 'Investment', 'Bonus', 'Gift', 'Other'];

  const handleAddSplitRow = () => {
    setSplitRows([...splitRows, { category: 'Shopping', amount: '', note: '' }]);
  };

  const handleSplitChange = (index, field, value) => {
    const updated = [...splitRows];
    updated[index][field] = value;
    setSplitRows(updated);
  };

  const calculateSplitTotal = () => {
    return splitRows.reduce((acc, r) => acc + (Number(r.amount) || 0), 0);
  };

  const isSplitBalanced = () => {
    if (!amount) return true;
    return Math.abs(Number(amount) - calculateSplitTotal()) < 0.01;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (modalType === 'transaction') {
      if (isSplit) {
        // Submit split transactions
        splitRows.forEach((row, i) => {
          if (row.amount) {
            onAddData('transaction', {
              title: row.note || note || `Split Transaction #${i + 1}`,
              amount: row.amount,
              type: 'EXPENSE',
              category: row.category,
              date: date,
              paymentMethod: 'UPI'
            });
          }
        });
      } else {
        onAddData('transaction', {
          title: note || title || (type === 'EXPENSE' ? `${category} Expense` : `${category} Income`),
          amount: amount,
          type: type,
          category: category,
          date: date,
          paymentMethod: 'UPI'
        });
      }
    } else if (modalType === 'goal') {
      onAddData('goal', { title, targetAmount, currentAmount, targetDate });
    } else if (modalType === 'budget') {
      onAddData('budget', { category, amount });
    } else if (modalType === 'networth') {
      onAddData('networth', { title, amount, itemType });
    } else if (modalType === 'recurring') {
      onAddData('recurring', { title, amount, frequency, date });
    } else if (modalType === 'category') {
      onAddData('category', { title, type });
    }

    onClose();
  };

  return (
    <div className="paisa-modal-backdrop" onClick={onClose}>
      <div className="paisa-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="paisa-modal-header">
          <h2 className="serif-text">
            {modalType === 'transaction' && 'Add Transaction'}
            {modalType === 'goal' && 'Create New Goal'}
            {modalType === 'budget' && 'Set Category Budget'}
            {modalType === 'networth' && 'Add Asset or Liability'}
            {modalType === 'recurring' && 'Add Recurring Payment'}
            {modalType === 'category' && 'Add Custom Category'}
          </h2>
          <button className="paisa-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="paisa-modal-body">
          {/* TRANSACTION FORM matching screenshots */}
          {modalType === 'transaction' && (
            <>
              {/* Type Switcher: Expense / Income */}
              <div className="paisa-type-grid">
                <button
                  type="button"
                  className={`paisa-type-btn expense-btn ${type === 'EXPENSE' ? 'active' : ''}`}
                  onClick={() => { setType('EXPENSE'); setCategory('Food'); }}
                >
                  <TrendingDown size={18} /> Expense
                </button>
                <button
                  type="button"
                  className={`paisa-type-btn income-btn ${type === 'INCOME' ? 'active' : ''}`}
                  onClick={() => { setType('INCOME'); setCategory('Salary'); setIsSplit(false); }}
                >
                  <TrendingUp size={18} /> Income
                </button>
              </div>

              {/* Split Transaction toggle button (Only shown for Expenses) */}
              {type === 'EXPENSE' && (
                <button
                  type="button"
                  className={`paisa-split-btn ${isSplit ? 'active' : ''}`}
                  onClick={() => setIsSplit(!isSplit)}
                >
                  <Scissors size={16} /> Split Transaction {isSplit ? '(on)' : ''}
                </button>
              )}

              {/* Amount Field */}
              <div className="paisa-field-group mt-3">
                <label className="paisa-field-label">AMOUNT</label>
                <div className="paisa-amount-input-wrapper">
                  <span className="paisa-currency-prefix">{currency}</span>
                  <input
                    type="number"
                    step="0.01"
                    className="paisa-amount-input"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Split Rows Section if Split is ON */}
              {isSplit && type === 'EXPENSE' ? (
                <div className="paisa-split-section mt-3">
                  <div className="paisa-split-header flex-between">
                    <span className="paisa-field-label">SPLIT INTO</span>
                    <div className="flex-align gap-2">
                      <span className={`paisa-balance-badge ${isSplitBalanced() ? 'balanced' : 'unbalanced'}`}>
                        {isSplitBalanced() ? <><Check size={12} /> Balanced</> : `Remaining: ${currency}${(Number(amount || 0) - calculateSplitTotal()).toFixed(2)}`}
                      </span>
                      <button type="button" className="paisa-add-split-link" onClick={handleAddSplitRow}>
                        + Add
                      </button>
                    </div>
                  </div>

                  <div className="paisa-split-rows mt-2">
                    {splitRows.map((row, idx) => (
                      <div key={idx} className="paisa-split-row">
                        <span className="paisa-split-num">{idx + 1}</span>
                        <select
                          className="paisa-input paisa-split-select"
                          value={row.category}
                          onChange={(e) => handleSplitChange(idx, 'category', e.target.value)}
                        >
                          {expenseCategories.map((c, i) => (
                            <option key={i} value={c}>{c}</option>
                          ))}
                        </select>
                        <div className="paisa-split-amount-wrap">
                          <span>{currency}</span>
                          <input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            className="paisa-input paisa-split-amount"
                            value={row.amount}
                            onChange={(e) => handleSplitChange(idx, 'amount', e.target.value)}
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Note"
                          className="paisa-input paisa-split-note"
                          value={row.note}
                          onChange={(e) => handleSplitChange(idx, 'note', e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Regular Category Selection if Split is OFF */
                <div className="paisa-field-group mt-3">
                  <label className="paisa-field-label">CATEGORY</label>
                  <select
                    className="paisa-input"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {(type === 'EXPENSE' ? expenseCategories : incomeCategories).map((c, i) => (
                      <option key={i} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Date and Note Row */}
              <div className="paisa-field-row mt-3">
                <div className="paisa-field-group">
                  <label className="paisa-field-label">DATE</label>
                  <input
                    type="date"
                    className="paisa-input"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                <div className="paisa-field-group">
                  <label className="paisa-field-label">NOTE (OPTIONAL)</label>
                  <input
                    type="text"
                    className="paisa-input"
                    placeholder="e.g. Dinner with friends"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          {/* OTHER MODAL TYPES */}
          {modalType === 'goal' && (
            <>
              <div className="paisa-field-group">
                <label className="paisa-field-label">GOAL TITLE</label>
                <input
                  type="text"
                  className="paisa-input"
                  placeholder="e.g. Emergency Fund, New Laptop"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="paisa-field-row mt-3">
                <div className="paisa-field-group">
                  <label className="paisa-field-label">TARGET AMOUNT ({currency})</label>
                  <input
                    type="number"
                    className="paisa-input"
                    placeholder="100000"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    required
                  />
                </div>
                <div className="paisa-field-group">
                  <label className="paisa-field-label">CURRENT SAVED ({currency})</label>
                  <input
                    type="number"
                    className="paisa-input"
                    placeholder="25000"
                    value={currentAmount}
                    onChange={(e) => setCurrentAmount(e.target.value)}
                  />
                </div>
              </div>
              <div className="paisa-field-group mt-3">
                <label className="paisa-field-label">TARGET DATE</label>
                <input
                  type="date"
                  className="paisa-input"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                />
              </div>
            </>
          )}

          {modalType === 'budget' && (
            <>
              <div className="paisa-field-group">
                <label className="paisa-field-label">CATEGORY</label>
                <select
                  className="paisa-input"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {expenseCategories.map((c, i) => (
                    <option key={i} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="paisa-field-group mt-3">
                <label className="paisa-field-label">MONTHLY LIMIT ({currency})</label>
                <input
                  type="number"
                  className="paisa-input"
                  placeholder="15000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          {modalType === 'networth' && (
            <>
              <div className="paisa-type-grid">
                <button
                  type="button"
                  className={`paisa-type-btn income-btn ${itemType === 'ASSET' ? 'active' : ''}`}
                  onClick={() => setItemType('ASSET')}
                >
                  <TrendingUp size={18} /> Asset
                </button>
                <button
                  type="button"
                  className={`paisa-type-btn expense-btn ${itemType === 'LIABILITY' ? 'active' : ''}`}
                  onClick={() => setItemType('LIABILITY')}
                >
                  <TrendingDown size={18} /> Liability
                </button>
              </div>
              <div className="paisa-field-group mt-3">
                <label className="paisa-field-label">TITLE</label>
                <input
                  type="text"
                  className="paisa-input"
                  placeholder="e.g. Savings Bank Account, Car Loan"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="paisa-field-group mt-3">
                <label className="paisa-field-label">AMOUNT ({currency})</label>
                <input
                  type="number"
                  className="paisa-input"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          {modalType === 'recurring' && (
            <>
              <div className="paisa-field-group">
                <label className="paisa-field-label">PAYMENT TITLE</label>
                <input
                  type="text"
                  className="paisa-input"
                  placeholder="e.g. Netflix Subscription, House Rent"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="paisa-field-row mt-3">
                <div className="paisa-field-group">
                  <label className="paisa-field-label">AMOUNT ({currency})</label>
                  <input
                    type="number"
                    className="paisa-input"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
                <div className="paisa-field-group">
                  <label className="paisa-field-label">FREQUENCY</label>
                  <select
                    className="paisa-input"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Yearly">Yearly</option>
                  </select>
                </div>
              </div>
              <div className="paisa-field-group mt-3">
                <label className="paisa-field-label">NEXT DUE DATE</label>
                <input
                  type="date"
                  className="paisa-input"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          {modalType === 'category' && (
            <>
              <div className="paisa-field-group">
                <label className="paisa-field-label">CATEGORY NAME</label>
                <input
                  type="text"
                  className="paisa-input"
                  placeholder="e.g. Hobbies, Pets"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          {/* Footer Actions */}
          <div className="paisa-modal-footer mt-5 flex-between">
            <button type="button" className="paisa-cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="paisa-save-btn">
              <Save size={16} /> Save Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
