import React, { useState, useEffect } from 'react';
import { 
  LayoutGrid, ArrowDownUp, PieChart, Target, Wallet, 
  TrendingUp, TrendingDown, Building, Plus, Moon, Bell,
  User, LayoutList, RotateCcw, ChevronDown, LogOut, Menu, X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TransactionsPaisa from '../components/TransactionsPaisa';
import AnalyticsPaisa from '../components/AnalyticsPaisa';
import { GoalsPaisa, BudgetsPaisa } from '../components/GoalsBudgetsPaisa';
import NetWorthPaisa from '../components/NetWorthPaisa';
import SettingsPaisa from '../components/SettingsPaisa';
import CategoriesPaisa from '../components/CategoriesPaisa';
import RecurringPaisa from '../components/RecurringPaisa';
import AddModal from '../components/AddModal';
import './Dashboard.css';

const OverviewPaisa = ({ toggleMobileMenu, transactions = [], onOpenModal, currency, onNavigateTab, budgets = [], userName }) => {
  const [chartTimeframe, setChartTimeframe] = useState('Weekly'); // 'Weekly' or 'Monthly'
  
  const incomeTotal = transactions.filter(t => t.type === 'INCOME').reduce((acc, t) => acc + Number(t.amount || 0), 0);
  const expenseTotal = transactions.filter(t => t.type === 'EXPENSE').reduce((acc, t) => acc + Number(t.amount || 0), 0);
  const netBalance = incomeTotal - expenseTotal;

  // Safe date parser helper
  const parseDate = (dStr) => {
    if (!dStr) return new Date();
    const d = new Date(dStr);
    if (!isNaN(d.getTime())) return d;
    const parts = String(dStr).split('-');
    if (parts.length === 3) {
      if (parts[0].length === 4) return new Date(parts[0], parts[1] - 1, parts[2]);
      return new Date(parts[2], parts[1] - 1, parts[0]);
    }
    return new Date();
  };

  // 1. Calculate Weekly Data (Mon - Sun)
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dayIndexMap = { 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: 'Sat', 0: 'Sun' };

  const weeklyData = {
    Mon: { income: 0, expense: 0 },
    Tue: { income: 0, expense: 0 },
    Wed: { income: 0, expense: 0 },
    Thu: { income: 0, expense: 0 },
    Fri: { income: 0, expense: 0 },
    Sat: { income: 0, expense: 0 },
    Sun: { income: 0, expense: 0 }
  };

  // 2. Calculate Monthly Data (Jan - Dec)
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthlyData = {};
  monthNames.forEach(m => { monthlyData[m] = { income: 0, expense: 0 }; });

  transactions.forEach(t => {
    const d = parseDate(t.date);
    
    // Weekly aggregation
    const dayName = dayIndexMap[d.getDay()];
    if (weeklyData[dayName]) {
      if (t.type === 'INCOME') weeklyData[dayName].income += Number(t.amount || 0);
      else weeklyData[dayName].expense += Number(t.amount || 0);
    }

    // Monthly aggregation
    const mName = monthNames[d.getMonth()];
    if (monthlyData[mName]) {
      if (t.type === 'INCOME') monthlyData[mName].income += Number(t.amount || 0);
      else monthlyData[mName].expense += Number(t.amount || 0);
    }
  });

  const currentLabels = chartTimeframe === 'Weekly' ? daysOfWeek : monthNames;
  const currentDataSet = chartTimeframe === 'Weekly' ? weeklyData : monthlyData;

  const maxVal = Math.max(...Object.values(currentDataSet).flatMap(d => [d.income, d.expense]), 100);

  return (
    <>
      <header className="topbar">
        <div className="greeting" style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
          <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
            <Menu size={24} />
          </button>
          <div>
            <h2 className="serif-text">Good morning, {userName || 'User'} 👋</h2>
            <p className="text-muted">Wednesday, 7 October 2026</p>
          </div>
        </div>
        <button className="btn-primary" onClick={() => onOpenModal('transaction')}>
          <Plus size={18} /> Add Transaction
        </button>
      </header>

      <div className="summary-cards">
        <div className="glass-card summary-card net" style={{cursor: 'pointer'}} onClick={() => onNavigateTab('transactions')}>
          <div className="summary-card-header">
            <span className="label">NET BALANCE</span>
            <Wallet size={20} className="card-icon" />
          </div>
          <h3>{netBalance >= 0 ? '' : '-'}{currency}{Math.abs(netBalance).toLocaleString()}</h3>
          <p className="text-muted">All time balance</p>
        </div>
        
        <div className="glass-card summary-card income" style={{cursor: 'pointer'}} onClick={() => onNavigateTab('transactions')}>
          <div className="summary-card-header">
            <span className="label">TOTAL INCOME</span>
            <TrendingUp size={20} className="card-icon" />
          </div>
          <h3 style={{color: 'var(--accent-green)'}}>{currency}{incomeTotal.toLocaleString()}</h3>
          <p className="text-muted">This month</p>
        </div>
        
        <div className="glass-card summary-card expense" style={{cursor: 'pointer'}} onClick={() => onNavigateTab('transactions')}>
          <div className="summary-card-header">
            <span className="label">TOTAL EXPENSES</span>
            <TrendingDown size={20} className="card-icon" />
          </div>
          <h3 style={{color: 'var(--accent-red)'}}>{currency}{expenseTotal.toLocaleString()}</h3>
          <p className="text-muted">This month</p>
        </div>
        
        <div className="glass-card summary-card investment" style={{cursor: 'pointer'}} onClick={() => onNavigateTab('networth')}>
          <div className="summary-card-header">
            <span className="label">INVESTMENTS</span>
            <Building size={20} className="card-icon" />
          </div>
          <h3 style={{color: 'var(--accent-purple)'}}>{currency}0</h3>
          <p className="text-muted">Total Portfolio</p>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Dynamic Income vs Expenses Chart (Weekly / Monthly) */}
        <div className="glass-card chart-container" style={{display:'flex', flexDirection:'column'}}>
          <div className="chart-header">
            <h3 className="serif-text">Income vs Expenses ({chartTimeframe})</h3>
            <div className="toggle-group">
              <button className={`toggle-btn ${chartTimeframe === 'Weekly' ? 'active' : ''}`} onClick={() => setChartTimeframe('Weekly')}>Weekly</button>
              <button className={`toggle-btn ${chartTimeframe === 'Monthly' ? 'active' : ''}`} onClick={() => setChartTimeframe('Monthly')}>Monthly</button>
            </div>
          </div>
          <div style={{flex: 1, display: 'flex', alignItems: 'flex-end', gap: chartTimeframe === 'Weekly' ? '16px' : '6px', padding: '20px 5px 10px', overflowX: 'auto'}}>
            {currentLabels.map((label) => {
              const incVal = currentDataSet[label]?.income || 0;
              const expVal = currentDataSet[label]?.expense || 0;

              // Calculate height percentage dynamically
              const incH = maxVal > 0 ? Math.min(100, Math.max(incVal > 0 ? 12 : 4, Math.round((incVal / maxVal) * 100))) : 4;
              const expH = maxVal > 0 ? Math.min(100, Math.max(expVal > 0 ? 12 : 4, Math.round((expVal / maxVal) * 100))) : 4;

              return (
                <div key={label} style={{flex: 1, minWidth: chartTimeframe === 'Weekly' ? '28px' : '18px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end'}}>
                  <div style={{display: 'flex', gap: '3px', alignItems: 'flex-end', height: '140px'}}>
                    <div 
                      title={`${label} Income: ${currency}${incVal.toLocaleString()}`}
                      style={{
                        height: `${incH}%`, 
                        width: chartTimeframe === 'Weekly' ? '12px' : '7px', 
                        background: incVal > 0 ? 'var(--accent-green)' : 'rgba(16, 185, 129, 0.2)', 
                        borderRadius: '3px 3px 0 0', 
                        transition: 'all 0.3s'
                      }}
                    ></div>
                    <div 
                      title={`${label} Expense: ${currency}${expVal.toLocaleString()}`}
                      style={{
                        height: `${expH}%`, 
                        width: chartTimeframe === 'Weekly' ? '12px' : '7px', 
                        background: expVal > 0 ? 'var(--accent-red)' : 'rgba(239, 68, 68, 0.2)', 
                        borderRadius: '3px 3px 0 0', 
                        transition: 'all 0.3s'
                      }}
                    ></div>
                  </div>
                  <span className="text-muted" style={{fontSize: chartTimeframe === 'Weekly' ? '0.75rem' : '0.65rem'}}>{label}</span>
                </div>
              );
            })}
          </div>
          <div style={{display:'flex', gap:'16px', fontSize:'0.8rem', marginTop: '12px'}}>
            <span style={{display:'flex', alignItems:'center', gap:'6px'}}><div style={{width:'8px',height:'8px',borderRadius:'50%',background:'var(--accent-green)'}}></div> Income</span>
            <span style={{display:'flex', alignItems:'center', gap:'6px'}}><div style={{width:'8px',height:'8px',borderRadius:'50%',background:'var(--accent-red)'}}></div> Expenses</span>
          </div>
        </div>

        {/* Dynamic Recent Activity List */}
        <div className="glass-card chart-container" style={{display: 'flex', flexDirection: 'column'}}>
          <div className="chart-header">
            <h3 className="serif-text">Recent Activity</h3>
            <button className="view-all" style={{background:'none', border:'none', cursor:'pointer'}} onClick={() => onNavigateTab('transactions')}>All &rarr;</button>
          </div>
          <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', maxHeight: '250px'}}>
            {transactions.length === 0 ? (
              <div style={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', padding: '20px'}}>
                <span>No transactions added yet</span>
                <button className="btn-primary mt-3" style={{fontSize: '0.8rem', padding: '6px 14px'}} onClick={() => onOpenModal('transaction')}>
                  <Plus size={14} /> Add First Transaction
                </button>
              </div>
            ) : (
              transactions.slice(0, 6).map((t, idx) => (
                <div key={idx} className="flex-between" style={{padding: '8px 0', borderBottom: '1px solid var(--card-border)'}}>
                  <div>
                    <h4 style={{fontWeight: 500, fontSize: '0.9rem', color: 'var(--text-main)'}}>{t.title}</h4>
                    <span className="text-muted" style={{fontSize: '0.75rem'}}>{t.category}</span>
                  </div>
                  <span style={{fontWeight: 600, color: t.type === 'INCOME' ? 'var(--accent-green)' : 'var(--accent-red)', fontSize: '0.9rem'}}>
                    {t.type === 'INCOME' ? '+' : '-'}{currency}{Number(t.amount).toLocaleString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="bottom-grid">
        <div className="glass-card bottom-card">
          <div>
            <h3 className="serif-text">Budget Overview</h3>
            <p className="text-muted" style={{fontSize: '0.8rem'}}>{budgets.length} budgets active</p>
          </div>
          <button className="view-all" style={{background:'none', border:'none', cursor:'pointer'}} onClick={() => onNavigateTab('budgets')}>View all &rarr;</button>
        </div>
        <div className="glass-card bottom-card">
          <div>
            <h3 className="serif-text">Upcoming Payments</h3>
            <p className="text-muted" style={{fontSize: '0.8rem'}}>No upcoming payments</p>
          </div>
          <button className="view-all" style={{background:'none', border:'none', cursor:'pointer'}} onClick={() => onNavigateTab('recurring')}>View all &rarr;</button>
        </div>
      </div>
    </>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currency, setCurrency] = useState('₹');
  const [userName, setUserName] = useState('User');
  const [userEmail, setUserEmail] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  // User state arrays initialized empty by default
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [netWorthItems, setNetWorthItems] = useState([]);

  // Load user session and user data from localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');

    const storedUser = localStorage.getItem('paisa_current_user');
    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        if (userObj.name) setUserName(userObj.name);
        if (userObj.email) setUserEmail(userObj.email);
        if (userObj.currency) setCurrency(userObj.currency);

        const emailKey = userObj.email || 'demo';
        const savedData = localStorage.getItem(`paisa_data_${emailKey}`);

        if (savedData) {
          const dataObj = JSON.parse(savedData);
          setTransactions(dataObj.transactions || []);
          setGoals(dataObj.goals || []);
          setBudgets(dataObj.budgets || []);
          setNetWorthItems(dataObj.netWorthItems || []);
        } else {
          setTransactions([]);
        }
      } catch (e) {
        console.error("Failed to parse user session", e);
      }
    }
  }, [isDarkMode]);

  // Helper function to persist data changes to localStorage
  const saveUserData = (updatedTransactions, updatedGoals, updatedBudgets, updatedNetWorth) => {
    const emailKey = userEmail || 'demo';
    const dataObj = {
      transactions: updatedTransactions || transactions,
      goals: updatedGoals || goals,
      budgets: updatedBudgets || budgets,
      netWorthItems: updatedNetWorth || netWorthItems
    };
    localStorage.setItem(`paisa_data_${emailKey}`, JSON.stringify(dataObj));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
    setIsNotificationsOpen(false);
  };

  const toggleNotifications = (e) => {
    e.stopPropagation();
    setIsNotificationsOpen(!isNotificationsOpen);
    setIsUserMenuOpen(false);
  };

  const toggleUserMenu = (e) => {
    e.stopPropagation();
    setIsUserMenuOpen(!isUserMenuOpen);
    setIsNotificationsOpen(false);
  };

  const closeAllPopups = () => {
    if (isNotificationsOpen) setIsNotificationsOpen(false);
    if (isUserMenuOpen) setIsUserMenuOpen(false);
  };

  const handleAddData = (type, data) => {
    if (type === 'transaction') {
      const newEntry = {
        id: Date.now(),
        title: data.title,
        amount: Number(data.amount),
        type: data.type,
        category: data.category,
        date: data.date || new Date().toISOString().split('T')[0],
        paymentMethod: data.paymentMethod || 'UPI'
      };

      const updatedTransactions = [newEntry, ...transactions];
      setTransactions(updatedTransactions);

      // Update budget spent automatically if expense
      let updatedBudgets = budgets;
      if (data.type === 'EXPENSE') {
        updatedBudgets = budgets.map(b => 
          b.category.toLowerCase().includes(data.category.toLowerCase()) || data.category.toLowerCase().includes(b.category.toLowerCase())
            ? { ...b, spent: Number(b.spent || 0) + Number(data.amount) } 
            : b
        );
        setBudgets(updatedBudgets);
      }

      saveUserData(updatedTransactions, goals, updatedBudgets, netWorthItems);

    } else if (type === 'goal') {
      const updatedGoals = [{ id: Date.now(), title: data.title, targetAmount: Number(data.targetAmount), currentAmount: Number(data.currentAmount || 0), targetDate: data.targetDate }, ...goals];
      setGoals(updatedGoals);
      saveUserData(transactions, updatedGoals, budgets, netWorthItems);

    } else if (type === 'budget') {
      const updatedBudgets = [{ id: Date.now(), category: data.category, amount: Number(data.amount), spent: 0 }, ...budgets];
      setBudgets(updatedBudgets);
      saveUserData(transactions, goals, updatedBudgets, netWorthItems);

    } else if (type === 'networth') {
      const updatedNetWorth = [{ id: Date.now(), title: data.title, amount: Number(data.amount), itemType: data.itemType }, ...netWorthItems];
      setNetWorthItems(updatedNetWorth);
      saveUserData(transactions, goals, budgets, updatedNetWorth);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('paisa_current_user');
    navigate('/login');
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'overview': 
        return <OverviewPaisa toggleMobileMenu={() => setIsMobileMenuOpen(true)} transactions={transactions} onOpenModal={setActiveModal} currency={currency} onNavigateTab={handleTabChange} budgets={budgets} userName={userName} />;
      case 'transactions': 
        return <TransactionsPaisa transactions={transactions} onOpenModal={setActiveModal} currency={currency} />;
      case 'analytics': 
        return <AnalyticsPaisa transactions={transactions} currency={currency} />;
      case 'goals': 
        return <GoalsPaisa goals={goals} onOpenModal={setActiveModal} currency={currency} />;
      case 'budgets': 
        return <BudgetsPaisa budgets={budgets} onOpenModal={setActiveModal} currency={currency} />;
      case 'networth': 
        return <NetWorthPaisa netWorthItems={netWorthItems} onOpenModal={setActiveModal} currency={currency} />;
      case 'categories': 
        return <CategoriesPaisa transactions={transactions} onOpenModal={setActiveModal} currency={currency} />;
      case 'recurring': 
        return <RecurringPaisa onOpenModal={setActiveModal} />;
      case 'settings': 
        return <SettingsPaisa isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} currency={currency} setCurrency={setCurrency} />;
      default: 
        return <OverviewPaisa toggleMobileMenu={() => setIsMobileMenuOpen(true)} transactions={transactions} onOpenModal={setActiveModal} currency={currency} onNavigateTab={handleTabChange} budgets={budgets} userName={userName} />;
    }
  };

  return (
    <div className="dashboard-layout" onClick={closeAllPopups}>
      {/* Mobile Overlay */}
      <div className={`mobile-overlay ${isMobileMenuOpen ? 'mobile-open' : ''}`} onClick={() => setIsMobileMenuOpen(false)}></div>

      {/* Sidebar */}
      <aside className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="logo-container" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
            <div className="logo-icon">{currency}</div>
            <div className="logo-text">
              <h2>Paisa</h2>
              <span>Expense Manager</span>
            </div>
          </div>
          <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="menu-label">MENU</div>
        <nav className="nav-menu">
          <button className={`nav-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => handleTabChange('overview')}>
            <LayoutGrid size={18} /> Dashboard
          </button>
          <button className={`nav-btn ${activeTab === 'transactions' ? 'active' : ''}`} onClick={() => handleTabChange('transactions')}>
            <ArrowDownUp size={18} /> Transactions
          </button>
          <button className={`nav-btn ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => handleTabChange('analytics')}>
            <PieChart size={18} /> Analytics
          </button>
          <button className={`nav-btn ${activeTab === 'goals' ? 'active' : ''}`} onClick={() => handleTabChange('goals')}>
            <Target size={18} /> Goals
          </button>
          <button className={`nav-btn ${activeTab === 'budgets' ? 'active' : ''}`} onClick={() => handleTabChange('budgets')}>
            <Wallet size={18} /> Budgets
          </button>
          <button className={`nav-btn ${activeTab === 'networth' ? 'active' : ''}`} onClick={() => handleTabChange('networth')}>
            <TrendingUp size={18} /> Net Worth
          </button>
          <button className={`nav-btn ${activeTab === 'categories' ? 'active' : ''}`} onClick={() => handleTabChange('categories')}>
            <LayoutList size={18} /> Categories
          </button>
          <button className={`nav-btn ${activeTab === 'recurring' ? 'active' : ''}`} onClick={() => handleTabChange('recurring')}>
            <RotateCcw size={18} /> Recurring
          </button>
        </nav>

        <div className="sidebar-bottom">
          <button className="nav-btn flex-between" onClick={() => setIsDarkMode(!isDarkMode)}>
            <div style={{display:'flex', gap:'12px', alignItems:'center'}}>
              <Moon size={18} /> {isDarkMode ? 'Dark Mode' : 'Light Mode'}
            </div>
            <div style={{width:'32px', height:'18px', background: isDarkMode ? 'var(--accent-orange)' : '#ccc', borderRadius:'10px', position:'relative', transition: 'background 0.3s'}}>
              <div style={{width:'14px', height:'14px', background:'#fff', borderRadius:'50%', position:'absolute', top:'2px', left: isDarkMode ? 'auto' : '2px', right: isDarkMode ? '2px' : 'auto', transition: 'all 0.3s'}}></div>
            </div>
          </button>

          <div style={{position: 'relative'}}>
            <button className="nav-btn flex-between" style={{width: '100%'}} onClick={toggleNotifications}>
              <div style={{display:'flex', gap:'12px', alignItems:'center'}}>
                <Bell size={18} /> Notifications
              </div>
              <Bell size={14} color="var(--accent-orange)" fill="var(--accent-orange)"/>
            </button>

            {isNotificationsOpen && (
              <div className="glass-card" style={{
                position: 'absolute', bottom: '50px', left: '0', width: '240px',
                padding: '14px', zIndex: 500, boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                fontSize: '0.8rem', background: 'var(--bg-card)', border: '1px solid var(--card-border)'
              }}>
                <div className="flex-between" style={{marginBottom: '8px'}}>
                  <h4 style={{fontWeight: 600, margin: 0, color: 'var(--text-main)'}}>Notifications</h4>
                  <button style={{background:'none', border:'none', color:'var(--text-muted)', cursor:'pointer', padding:'2px', display:'flex', alignItems:'center'}} onClick={() => setIsNotificationsOpen(false)}>
                    <X size={14} />
                  </button>
                </div>
                <div style={{padding: '6px 0', color: 'var(--text-muted)'}}>
                  ✨ Welcome to Paisa! Add your first transaction to get started.
                </div>
              </div>
            )}
          </div>

          {isUserMenuOpen && (
            <div className="user-popup-menu glass-card">
              <button className="popup-item" onClick={() => handleTabChange('settings')}>
                <User size={16} /> View Profile
              </button>
              <button className="popup-item" onClick={handleSignOut}>
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          )}

          <button className={`nav-btn flex-between mt-4 ${isUserMenuOpen || activeTab === 'settings' ? 'active' : ''}`} onClick={toggleUserMenu}>
            <div style={{display:'flex', gap:'12px', alignItems:'center'}}>
              <div style={{width:'24px', height:'24px', background:'var(--accent-orange)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px', color:'#fff'}}>
                {userName ? userName.charAt(0).toUpperCase() : 'U'}
              </div>
              <span style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100px'}}>{userName || 'User'}</span>
            </div>
            {isUserMenuOpen ? <ChevronDown size={16} color="var(--accent-orange)" style={{transform:'rotate(180deg)'}} /> : <ChevronDown size={16} color="var(--text-muted)" />}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content" onClick={closeAllPopups}>
        {renderContent()}
      </main>

      {/* Global Interactive Modal */}
      <AddModal 
        isOpen={!!activeModal} 
        onClose={() => setActiveModal(null)} 
        modalType={activeModal} 
        onAddData={handleAddData} 
        currency={currency} 
      />
    </div>
  );
};

export default Dashboard;
