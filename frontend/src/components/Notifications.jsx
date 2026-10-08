import React from 'react';
import './Notifications.css';
import { AlertTriangle, CheckCircle, Bell } from 'lucide-react';

const Notifications = () => {
  const notifs = [
    { id: 1, type: 'warning', text: 'You have reached 90% of your Food budget.' },
    { id: 2, type: 'danger', text: 'Your monthly budget is almost exhausted.' },
    { id: 3, type: 'success', text: 'Salary transaction added successfully.' },
    { id: 4, type: 'info', text: 'Monthly report generated.' },
  ];

  const getIcon = (type) => {
    switch(type) {
      case 'warning': return <AlertTriangle color="#fbbf24" />;
      case 'danger': return <AlertTriangle color="#ef4444" />;
      case 'success': return <CheckCircle color="#10b981" />;
      default: return <Bell color="#60a5fa" />;
    }
  };

  return (
    <div className="notifications-view glass-card">
      <h3>NOTIFICATIONS</h3>
      
      <div className="notifs-list mt-4">
        {notifs.map(n => (
          <div key={n.id} className="notif-item">
            <div className="notif-icon">{getIcon(n.type)}</div>
            <p>{n.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
