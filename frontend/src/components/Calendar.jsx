import React from 'react';
import './Calendar.css';

const CalendarView = () => {
  return (
    <div className="calendar-view glass-card">
      <h3 className="text-center">OCTOBER 2026</h3>
      
      <div className="calendar-grid mt-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="calendar-header-day">{day}</div>
        ))}
        
        {/* Empty slots for start of month */}
        <div></div><div></div><div></div><div></div>
        
        {Array.from({length: 31}, (_, i) => (
          <div key={i} className={`calendar-day ${i+1 === 6 ? 'active' : ''}`}>
            {i + 1}
          </div>
        ))}
      </div>

      <div className="selected-date-info glass-card mt-4">
        <h4>06 October</h4>
        <div className="flex-between mt-4">
          <div>
            <p className="text-muted">Income</p>
            <p className="income-text">+₹50,000</p>
          </div>
          <div>
            <p className="text-muted">Expenses</p>
            <p className="expense-text">-₹2,700</p>
          </div>
          <div>
            <p className="text-muted">Net</p>
            <p className="amount">₹47,300</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
