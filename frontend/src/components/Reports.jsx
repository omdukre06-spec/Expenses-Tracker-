import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './Reports.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const Reports = () => {
  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
      {
        label: 'Monthly Expenses',
        data: [15000, 21000, 18000, 27000],
        backgroundColor: '#6366f1',
      },
    ],
  };

  const lineData = {
    labels: ['1st', '5th', '10th', '15th', '20th', '25th', '30th'],
    datasets: [
      {
        label: 'Spending Trend',
        data: [500, 2000, 1500, 4000, 1000, 5000, 3000],
        borderColor: '#10b981',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { labels: { color: '#f8fafc' } }
    },
    scales: {
      x: { ticks: { color: '#94a3b8' } },
      y: { ticks: { color: '#94a3b8' } }
    }
  };

  return (
    <div className="reports-view">
      <div className="glass-card chart-card">
        <h3>Monthly Expenses</h3>
        <Bar data={barData} options={options} />
      </div>

      <div className="glass-card chart-card mt-4">
        <h3>Spending Trend over Time</h3>
        <Line data={lineData} options={options} />
      </div>
    </div>
  );
};

export default Reports;
