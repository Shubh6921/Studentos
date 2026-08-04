import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  ArrowLeft, Wallet, Plus, Trash2, X, Check, Tag, 
  BookOpen, Coffee, Laptop, Bus, Ticket, CreditCard, DollarSign, TrendingUp, Filter
} from 'lucide-react';

const categoryIcons = {
  Academics: BookOpen,
  Food: Coffee,
  Tech: Laptop,
  Transport: Bus,
  Leisure: Ticket
};

const FinancialPage = () => {
  const { 
    expenses, 
    addExpense, 
    deleteExpense, 
    monthlyBudget,
    setActiveTab 
  } = useContext(AppContext);

  // Categories list state
  const [categories, setCategories] = useState(['Academics', 'Food', 'Tech', 'Transport', 'Leisure']);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  // Expense Modal State
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [expTitle, setExpTitle] = useState('');
  const [expAmount, setExpAmount] = useState('');
  const [expCategory, setExpCategory] = useState('Academics');
  const [expPayment, setExpPayment] = useState('Card');

  const handleConfirmAddCategory = () => {
    if (newCategoryName.trim()) {
      const formatted = newCategoryName.trim();
      if (!categories.includes(formatted)) {
        setCategories(prev => [...prev, formatted]);
      }
      setExpCategory(formatted);
      setNewCategoryName('');
    }
    setIsAddingCategory(false);
  };

  const handleLogExpenseSubmit = (e) => {
    e.preventDefault();
    if (!expTitle.trim() || !expAmount) return;
    addExpense(expTitle, expAmount, expCategory, expPayment);
    setExpTitle('');
    setExpAmount('');
    setExpCategory('Academics');
    setExpPayment('Card');
    setExpenseModalOpen(false);
  };

  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  
  const filteredExpenses = selectedFilter === 'All' 
    ? expenses 
    : expenses.filter(e => (e.category || 'Academics') === selectedFilter);

  return (
    <div className="content-area financial-page">
      {/* Navigation Header */}
      <div className="subpage-nav-header">
        <button onClick={() => setActiveTab('analytics')} className="back-btn" aria-label="Back to Analytics">
          <ArrowLeft size={16} />
          <span>Analytics Hub</span>
        </button>
      </div>

      {/* Page Title Header */}
      <div className="financial-header">
        <div className="fh-tag">
          <Wallet size={13} className="fh-icon" />
          <span>STUDENT FINANCIAL HUD</span>
        </div>
        <h1 className="text-title">Financial Outflow & Purchases</h1>
        <p className="text-desc">Track lab manuals, campus dining, transport, and equipment expenses.</p>
      </div>

      {/* Main Budget Outflow Summary Banner */}
      <div className="premium-card luxury-expense-card">
        <div className="expense-header-row">
          <div className="expense-title-col">
            <h3 className="text-subtitle">Budget & Outflow Summary</h3>
            <span className="expense-subtitle-desc">Real-time expenditure tracking</span>
          </div>
          <button onClick={() => setExpenseModalOpen(true)} className="btn-primary log-expense-btn-main">
            <Plus size={15} />
            <span>Log Expense</span>
          </button>
        </div>

        <div className="budget-summary-banner">
          <div className="banner-top-info">
            <div className="total-spent-group">
              <span className="spent-label">Total Outflow</span>
              <span className="spent-val">₹{totalExpenses.toFixed(2)}</span>
            </div>
            <div className="transactions-count-group">
              <span className="spent-label">Logged Purchases</span>
              <span className="spent-count-val">{expenses.length} Entries</span>
            </div>
          </div>

          <div className="budget-progress-bar-bg">
            <div 
              className="budget-progress-bar-fill" 
              style={{ width: `${Math.min(100, (totalExpenses / (monthlyBudget || 5000)) * 100)}%` }}
            />
          </div>
          <div className="budget-footer-text">
            <span>Budget Limit: ₹{monthlyBudget || 5000}</span>
            <span>{((totalExpenses / (monthlyBudget || 5000)) * 100).toFixed(0)}% Utilized</span>
          </div>
        </div>
      </div>

      {/* Expense Filter Bar */}
      <div className="filter-chips-row">
        <button 
          onClick={() => setSelectedFilter('All')} 
          className={`filter-chip ${selectedFilter === 'All' ? 'active' : ''}`}
        >
          All ({expenses.length})
        </button>
        {categories.map(cat => {
          const count = expenses.filter(e => (e.category || 'Academics') === cat).length;
          return (
            <button 
              key={cat} 
              onClick={() => setSelectedFilter(cat)} 
              className={`filter-chip ${selectedFilter === cat ? 'active' : ''}`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Detailed Expenses List */}
      <div className="premium-card expense-list-card">
        <div className="card-header-simple">
          <h3 className="text-subtitle">Transaction History</h3>
          <span className="text-muted-sm">{filteredExpenses.length} Items</span>
        </div>

        <div className="expense-list-container">
          {filteredExpenses.length === 0 ? (
            <div className="empty-expenses-state">
              <Wallet size={28} className="empty-wallet-icon" />
              <p className="empty-state-text">
                {selectedFilter === 'All' 
                  ? 'No logged expenses yet. Click "+ Log Expense" to record a purchase.' 
                  : `No expenses logged under ${selectedFilter}.`}
              </p>
            </div>
          ) : (
            filteredExpenses.map(exp => {
              const categoryKey = exp.category || 'Academics';
              const IconComp = categoryIcons[categoryKey] || Tag;
              return (
                <div key={exp.id} className="luxury-expense-item">
                  <div className="expense-icon-box">
                    <IconComp size={18} />
                  </div>
                  
                  <div className="expense-meta-col">
                    <span className="expense-item-title">{exp.title}</span>
                    <div className="expense-tags-row">
                      <span className="exp-cat-badge">{exp.category || 'Academics'}</span>
                      <span className="exp-payment-badge">{exp.paymentMethod || 'Card'}</span>
                      <span className="exp-date-text">{exp.date || 'Today'}</span>
                    </div>
                  </div>

                  <div className="expense-amount-col">
                    <span className="expense-amount-val">-₹{exp.amount.toFixed(2)}</span>
                    <button 
                      onClick={() => deleteExpense(exp.id)} 
                      className="delete-exp-btn"
                      title="Delete Expense"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Log Expense Slide-Up Drawer */}
      {expenseModalOpen && (
        <div className="modal-overlay" onClick={() => setExpenseModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-handle"></div>
            <div className="modal-header-simple">
              <h3>Log Student Expense</h3>
              <button className="modal-close" onClick={() => setExpenseModalOpen(false)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleLogExpenseSubmit} className="submodal-form">
              <div className="form-field">
                <label className="form-label">Expense Description</label>
                <input
                  type="text"
                  value={expTitle}
                  onChange={(e) => setExpTitle(e.target.value)}
                  placeholder="e.g. Physics Lab Manual, Espresso"
                  className="input-premium"
                  required
                  autoFocus
                />
              </div>

              <div className="form-field">
                <label className="form-label">Amount (₹)</label>
                <input
                  type="number"
                  step="1"
                  value={expAmount}
                  onChange={(e) => setExpAmount(e.target.value)}
                  placeholder="e.g. 450"
                  className="input-premium"
                  required
                />
              </div>

              {/* Category Selection */}
              <div className="form-field">
                <div className="category-label-row">
                  <label className="form-label">Category</label>
                </div>

                <div className="presets-select-row">
                  {categories.map(cat => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setExpCategory(cat)}
                      className={`preset-select-btn ${expCategory === cat ? 'active' : ''}`}
                    >
                      {cat}
                    </button>
                  ))}

                  {!isAddingCategory ? (
                    <button
                      type="button"
                      onClick={() => setIsAddingCategory(true)}
                      className="add-category-mini-btn"
                      title="Add Custom Category"
                    >
                      <Plus size={11} />
                      <span>Custom</span>
                    </button>
                  ) : (
                    <div className="inline-add-category-box">
                      <input
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="New category..."
                        className="inline-category-input"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleConfirmAddCategory();
                          }
                        }}
                      />
                      <button 
                        type="button" 
                        onClick={handleConfirmAddCategory} 
                        className="confirm-cat-btn"
                        title="Confirm Category"
                      >
                        <Check size={12} />
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setIsAddingCategory(false)} 
                        className="cancel-cat-btn"
                        title="Cancel"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">Payment Method</label>
                <div className="presets-select-row">
                  {['Card', 'UPI', 'Cash'].map(pm => (
                    <button
                      type="button"
                      key={pm}
                      onClick={() => setExpPayment(pm)}
                      className={`preset-select-btn ${expPayment === pm ? 'active' : ''}`}
                    >
                      {pm}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn-primary submodal-btn">
                <span>Save Expense Entry</span>
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .financial-page {
          gap: 16px;
          padding-bottom: 32px;
          animation: fadeIn 0.38s var(--ease-premium);
        }

        .subpage-nav-header {
          display: flex;
          align-items: center;
        }

        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          border-radius: 10px;
          padding: 6px 12px;
          color: var(--text-secondary);
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .back-btn:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.06);
          border-color: var(--border-color-active);
        }

        .financial-header {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .fh-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: var(--accent-gold);
        }

        .fh-icon {
          color: var(--accent-gold);
        }

        .log-expense-btn-main {
          padding: 8px 16px !important;
          font-size: 12px !important;
          border-radius: 10px !important;
        }

        .budget-summary-banner {
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 14px;
          padding: 16px;
        }

        .banner-top-info {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .total-spent-group, .transactions-count-group {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .spent-label {
          font-size: 10px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--text-muted);
        }

        .spent-val {
          font-size: 24px;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        .spent-count-val {
          font-size: 14px;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .budget-progress-bar-bg {
          height: 6px;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 3px;
          overflow: hidden;
        }

        .budget-progress-bar-fill {
          height: 100%;
          background: var(--text-primary);
          border-radius: 3px;
          transition: width 0.4s var(--ease-premium);
        }

        .budget-footer-text {
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          color: var(--text-muted);
          font-weight: 500;
        }

        .filter-chips-row {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 2px;
        }

        .filter-chip {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          font-size: 11px;
          font-weight: 500;
          padding: 6px 12px;
          border-radius: 10px;
          cursor: pointer;
          white-space: nowrap;
          transition: all var(--transition-fast);
        }

        .filter-chip:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-primary);
        }

        .filter-chip.active {
          background: var(--text-primary);
          color: var(--bg-primary);
          border-color: transparent;
          font-weight: 600;
        }

        .expense-list-card {
          gap: 14px;
        }

        .card-header-simple {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .text-muted-sm {
          font-size: 11px;
          color: var(--text-muted);
        }

        .expense-list-container {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .luxury-expense-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 14px;
          gap: 12px;
          transition: all var(--transition-fast);
        }

        .luxury-expense-item:hover {
          background: rgba(255, 255, 255, 0.03);
          border-color: rgba(255, 255, 255, 0.08);
        }

        .expense-icon-box {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          flex-shrink: 0;
        }

        .expense-meta-col {
          display: flex;
          flex-direction: column;
          gap: 3px;
          flex: 1;
        }

        .expense-item-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .expense-tags-row {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          color: var(--text-muted);
        }

        .exp-cat-badge, .exp-payment-badge {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 1px 6px;
          border-radius: 4px;
          color: var(--text-secondary);
        }

        .expense-amount-col {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .expense-amount-val {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .delete-exp-btn {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: color var(--transition-fast);
        }

        .delete-exp-btn:hover {
          color: var(--accent-red);
        }

        .empty-expenses-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 32px 0;
          text-align: center;
          color: var(--text-secondary);
        }

        .empty-wallet-icon {
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
};

export default FinancialPage;
