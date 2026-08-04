import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  Award, AlertTriangle, Calendar as CalendarIcon, Clock, CheckCircle, Wallet, User,
  BookOpen, Coffee, Laptop, Bus, Ticket, CreditCard, DollarSign, Plus, Trash2, TrendingUp, X, Check, Tag
} from 'lucide-react';

const categoryIcons = {
  Academics: BookOpen,
  Food: Coffee,
  Tech: Laptop,
  Transport: Bus,
  Leisure: Ticket
};

const AnalyticsTab = () => {
  const { 
    attendance, 
    habits, 
    expenses, 
    addExpense, 
    deleteExpense, 
    studyProgress, 
    journal
  } = useContext(AppContext);

  const [selectedDay, setSelectedDay] = useState(4);

  // Categories list state
  const [categories, setCategories] = useState(['Academics', 'Food', 'Tech', 'Transport', 'Leisure']);
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

  // Stats calculations
  const completedHabitsCount = habits.filter(h => h.completed).length;
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);

  // Calendar configuration (August 2026)
  const daysInMonth = 31;
  const startDayOffset = 5;
  const weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const getDayData = (day) => {
    if (day === 4) {
      const todayExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
      return {
        focusMinutes: studyProgress.completedMinutes,
        habitsCompleted: completedHabitsCount,
        attendanceChecked: 3,
        reflections: journal.completedToday.morning && journal.completedToday.evening ? 'Morning & Evening complete' : 
                      journal.completedToday.morning ? 'Morning logged' : 
                      journal.completedToday.evening ? 'Evening logged' : 'None logged',
        expensesLogged: todayExpenses,
        status: studyProgress.completedMinutes >= 60 ? 'high' : studyProgress.completedMinutes >= 20 ? 'medium' : 'low'
      };
    }

    if (day > 4) {
      return null;
    }

    const mockHistory = {
      1: { focusMinutes: 45, habitsCompleted: 3, attendanceChecked: 0, reflections: 'Evening complete', expensesLogged: 250, status: 'medium' },
      2: { focusMinutes: 15, habitsCompleted: 2, attendanceChecked: 0, reflections: 'None', expensesLogged: 0, status: 'low' },
      3: { focusMinutes: 90, habitsCompleted: 5, attendanceChecked: 4, reflections: 'Morning & Evening complete', expensesLogged: 120, status: 'high' }
    };

    return mockHistory[day] || { focusMinutes: 0, habitsCompleted: 0, attendanceChecked: 0, reflections: 'None', expensesLogged: 0, status: 'low' };
  };

  const selectedDayData = getDayData(selectedDay);

  return (
    <div className="content-area analytics-tab">
      <div className="analytics-header">
        <h2 className="text-title">Academic Ratios & Financial HUD</h2>
        <p className="text-desc">Review attendance bounds, daily activity archives, and student expenses.</p>
      </div>

      {/* Monthly Analytics Calendar */}
      <div className="premium-card calendar-card">
        <div className="calendar-header-row">
          <div className="calendar-title-info">
            <h3 className="text-subtitle">Daily Archive</h3>
            <span className="current-month-label">August 2026</span>
          </div>
          <CalendarIcon size={14} className="calendar-icon-muted" />
        </div>

        <div className="calendar-grid">
          {weekdays.map((day, idx) => (
            <div key={idx} className="calendar-day-header">{day}</div>
          ))}

          {Array(startDayOffset).fill(null).map((_, idx) => (
            <div key={`offset-${idx}`} className="calendar-cell offset"></div>
          ))}

          {Array(daysInMonth).fill(null).map((_, idx) => {
            const dayNum = idx + 1;
            const isToday = dayNum === 4;
            const isFuture = dayNum > 4;
            const isSelected = selectedDay === dayNum;
            const dayData = getDayData(dayNum);
            
            let statusClass = 'low-study';
            if (dayData) {
              if (dayData.status === 'high') statusClass = 'high-study';
              else if (dayData.status === 'medium') statusClass = 'medium-study';
            }

            return (
              <button
                key={`day-${dayNum}`}
                onClick={() => !isFuture && setSelectedDay(dayNum)}
                className={`calendar-cell ${isFuture ? 'disabled' : ''} ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''} ${statusClass}`}
                disabled={isFuture}
                aria-label={`August ${dayNum} analytics`}
              >
                <span>{dayNum}</span>
              </button>
            );
          })}
        </div>

        {selectedDayData && (
          <div className="day-details-panel">
            <div className="details-title-row">
              <span className="details-date">August {selectedDay}, 2026</span>
              <span className="details-status-pill">
                {selectedDay === 4 ? 'Today' : 'Archive'}
              </span>
            </div>
            
            <div className="details-grid">
              <div className="details-item">
                <span className="details-item-label">Habits Met</span>
                <span className="details-item-val">{selectedDayData.habitsCompleted} / 5 habits</span>
              </div>
              <div className="details-item">
                <span className="details-item-label">Lectures Checked</span>
                <span className="details-item-val">{selectedDayData.attendanceChecked} classes</span>
              </div>
              <div className="details-item details-item-wide">
                <span className="details-item-label">Reflection Alignment</span>
                <span className="details-item-val">{selectedDayData.reflections}</span>
              </div>
              <div className="details-item details-item-wide">
                <span className="details-item-label">Logged Expenses</span>
                <span className="details-item-val">₹{selectedDayData.expensesLogged.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Attendance Matrix */}
      <div className="premium-card attendance-analytics-card">
        <h3 className="text-subtitle">Attendance Matrix</h3>
        
        <div className="attendance-meters">
          {Object.entries(attendance).length === 0 ? (
            <div className="empty-state">
              <p className="empty-state-text">No courses added. Use Control Hub Drawer to manage courses.</p>
            </div>
          ) : (
            Object.entries(attendance).map(([subject, record]) => {
              const a = record.attended;
              const t = record.total;
              const percent = t > 0 ? (a / t) * 100 : 0;
              
              const safeAbsences = t > 0 ? Math.floor((4 * a - 3 * t) / 3) : 0;
              const consecutiveNeeded = t > 0 ? (3 * t) - (4 * a) : 0;
              
              let statusPillText = '';
              let statusClass = '';
              
              if (t === 0) {
                statusClass = 'warning';
                statusPillText = 'No classes held yet';
              } else if (percent < 75) {
                statusClass = 'danger';
                statusPillText = `Alert: Attend ${consecutiveNeeded} classes consecutively`;
              } else if (safeAbsences > 0) {
                statusClass = 'success';
                statusPillText = `Safe: Can miss ${safeAbsences} ${safeAbsences === 1 ? 'class' : 'classes'}`;
              } else {
                statusClass = 'warning';
                statusPillText = `Borderline: Attend next class`;
              }

              const radius = 20;
              const circumference = 2 * Math.PI * radius;
              const strokeDashoffset = circumference - (percent / 100) * circumference;
              
              return (
                <div key={subject} className="attendance-row-card">
                  <div className="attendance-info-side">
                    <span className="subject-name-tag">{subject}</span>
                    <span className="subject-stats-tag">
                      {a} / {t} attended &bull; {percent.toFixed(0)}%
                    </span>
                    <span className={`status-pill-sub ${statusClass}`}>
                      {statusPillText}
                    </span>
                  </div>
                  
                  <div className="attendance-radial-side">
                    <svg className="radial-svg" width="56" height="56">
                      <circle 
                        className="radial-bg-circle"
                        cx="28" 
                        cy="28" 
                        r={radius} 
                        strokeWidth="2.5" 
                        fill="transparent"
                      />
                      <circle 
                        className={`radial-fg-circle ${statusClass}`}
                        cx="28" 
                        cy="28" 
                        r={radius} 
                        strokeWidth="2.5" 
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        transform="rotate(-90 28 28)"
                      />
                    </svg>
                    <span className="radial-percentage-text">{percent.toFixed(0)}%</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Executive Financial HUD & Student Expenses */}
      <div className="premium-card luxury-expense-card">
        <div className="expense-header-row">
          <div className="expense-title-col">
            <h3 className="text-subtitle">Financial HUD</h3>
            <span className="expense-subtitle-desc">Manage academic purchases, meals & gear</span>
          </div>
          <button onClick={() => setExpenseModalOpen(true)} className="log-expense-btn">
            <Plus size={14} className="log-icon-gold" />
            <span>Log Expense</span>
          </button>
        </div>

        {/* Financial Summary Outflow Banner */}
        <div className="budget-summary-banner">
          <div className="banner-top-info">
            <div className="total-spent-group">
              <span className="spent-label">Total Outflow</span>
              <span className="spent-val">₹{totalExpenses.toFixed(2)}</span>
            </div>
            <div className="transactions-count-group">
              <span className="spent-label">Logged Entries</span>
              <span className="spent-count-val">{expenses.length} Purchases</span>
            </div>
          </div>
        </div>

        {/* Detailed Expenses List */}
        <div className="expense-list-container">
          {expenses.length === 0 ? (
            <div className="empty-expenses-state">
              <Wallet size={24} className="empty-wallet-icon" />
              <span>No logged expenses yet. Click "+ Log Expense" to track books, canteen or tech.</span>
            </div>
          ) : (
            expenses.map(exp => {
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

              {/* Minimal Category Selection + Custom Category Option */}
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
        .analytics-header {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        /* Calendar styles */
        .calendar-card {
          gap: var(--space-md);
        }

        .calendar-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .calendar-title-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .current-month-label {
          font-size: 12px;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .calendar-icon-muted {
          color: var(--text-muted);
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 6px;
          margin-top: 4px;
        }

        .calendar-day-header {
          font-size: 10px;
          font-weight: 600;
          text-align: center;
          color: var(--text-muted);
          text-transform: uppercase;
          padding-bottom: 4px;
        }

        .calendar-cell {
          aspect-ratio: 1;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 500;
          color: var(--text-secondary);
          cursor: pointer;
          position: relative;
          transition: all var(--transition-fast);
        }

        .calendar-cell:hover:not(.disabled) {
          background: rgba(255, 255, 255, 0.03);
          border-color: rgba(255, 255, 255, 0.08);
          color: var(--text-primary);
        }

        .calendar-cell.offset {
          background: transparent;
          border: none;
          cursor: default;
          pointer-events: none;
        }

        .calendar-cell.disabled {
          opacity: 0.25;
          cursor: not-allowed;
          pointer-events: none;
          border-style: dashed;
        }

        .calendar-cell.high-study {
          background: rgba(197, 168, 128, 0.08);
          color: var(--accent-gold);
          border-color: rgba(197, 168, 128, 0.2);
        }

        .calendar-cell.medium-study {
          background: rgba(112, 151, 209, 0.08);
          color: var(--accent-blue);
          border-color: rgba(112, 151, 209, 0.2);
        }

        .calendar-cell.low-study {
          background: rgba(255, 255, 255, 0.01);
        }

        .calendar-cell.selected {
          border-color: var(--text-primary) !important;
          color: var(--text-primary);
          font-weight: 600;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.06);
        }

        .calendar-cell.today::after {
          content: '';
          position: absolute;
          bottom: 3px;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: var(--text-primary);
        }

        .calendar-cell.today.high-study::after {
          background: var(--accent-gold);
        }

        .day-details-panel {
          margin-top: var(--space-xs);
          padding-top: var(--space-md);
          border-top: 1px solid rgba(255, 255, 255, 0.03);
          display: flex;
          flex-direction: column;
          gap: 12px;
          animation: fadeIn 0.3s var(--ease-premium);
        }

        .details-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .details-date {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .details-status-pill {
          font-size: 9px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.03);
          padding: 2px 6px;
          border-radius: 6px;
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }

        .details-item {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.02);
          border-radius: 10px;
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .details-item-label {
          font-size: 9px;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        .details-item-val {
          font-size: 12px;
          font-weight: 500;
          color: var(--text-primary);
        }

        .details-item-wide {
          grid-column: span 2;
        }

        .attendance-meters {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .attendance-row-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--space-md);
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 16px;
          transition: all var(--transition-fast);
        }

        .attendance-row-card:hover {
          border-color: rgba(255, 255, 255, 0.06);
          background: rgba(255, 255, 255, 0.02);
        }

        .attendance-info-side {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
        }

        .subject-name-tag {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: -0.01em;
        }

        .subject-stats-tag {
          font-size: 11px;
          color: var(--text-muted);
          font-weight: 500;
        }

        .status-pill-sub {
          display: inline-block;
          font-size: 10px;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 8px;
          width: fit-content;
          margin-top: 4px;
        }

        .status-pill-sub.success {
          background: var(--accent-green-glowing);
          color: var(--accent-green);
          border: 1px solid rgba(72, 154, 126, 0.15);
        }

        .status-pill-sub.warning {
          background: var(--accent-gold-glowing);
          color: var(--accent-gold);
          border: 1px solid rgba(197, 168, 128, 0.15);
        }

        .status-pill-sub.danger {
          background: var(--accent-red-glowing);
          color: var(--accent-red);
          border: 1px solid rgba(224, 92, 92, 0.15);
        }

        .attendance-radial-side {
          position: relative;
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .radial-svg {
          width: 56px;
          height: 56px;
        }

        .radial-bg-circle {
          stroke: rgba(255, 255, 255, 0.02);
        }

        .radial-fg-circle {
          stroke-linecap: round;
          transition: stroke-dashoffset 1s var(--ease-premium);
        }

        .radial-fg-circle.success {
          stroke: var(--accent-green);
        }

        .radial-fg-circle.warning {
          stroke: var(--accent-gold);
        }

        .radial-fg-circle.danger {
          stroke: var(--accent-red);
        }

        .radial-percentage-text {
          position: absolute;
          font-size: 10px;
          font-weight: 500;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        /* Luxury Expense Card */
        .luxury-expense-card {
          gap: var(--space-md);
        }

        .expense-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .expense-title-col {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .expense-subtitle-desc {
          font-size: 11px;
          color: var(--text-muted);
        }

        .log-expense-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-primary);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: -0.01em;
          padding: 6px 12px;
          border-radius: 10px;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(255, 255, 255, 0.03);
          transition: all 0.2s var(--ease-premium);
        }

        .log-expense-btn:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.18);
          color: #FFFFFF;
          transform: translateY(-1px);
          box-shadow: 0 3px 12px rgba(255, 255, 255, 0.08);
        }

        .log-expense-btn:active {
          transform: translateY(0) scale(0.98);
        }

        .log-expense-btn .log-icon-gold {
          color: var(--text-primary);
          opacity: 0.9;
          transition: transform 0.2s ease;
        }

        .log-expense-btn:hover .log-icon-gold {
          transform: rotate(90deg);
          opacity: 1;
        }

        /* Budget Summary Banner */
        .budget-summary-banner {
          background: rgba(255, 255, 255, 0.015);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 14px;
          padding: 12px 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .banner-top-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .total-spent-group, .transactions-count-group {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .spent-label {
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--text-muted);
          letter-spacing: 0.03em;
        }

        .spent-val {
          font-size: 18px;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        .spent-count-val {
          font-size: 13px;
          font-weight: 600;
          color: var(--accent-gold);
          text-align: right;
        }

        /* Expense List Container */
        .expense-list-container {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .luxury-expense-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 14px;
          transition: all var(--transition-fast);
        }

        .luxury-expense-item:hover {
          background: rgba(255, 255, 255, 0.025);
          border-color: rgba(255, 255, 255, 0.07);
        }

        .expense-icon-box {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.025);
          border: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          flex-shrink: 0;
        }

        .expense-meta-col {
          display: flex;
          flex-direction: column;
          gap: 4px;
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
          flex-wrap: wrap;
        }

        .exp-cat-badge {
          font-size: 9px;
          font-weight: 600;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.04);
          padding: 2px 6px;
          border-radius: 6px;
        }

        .exp-payment-badge {
          font-size: 9px;
          font-weight: 600;
          color: var(--accent-gold);
          background: rgba(197, 168, 128, 0.08);
          padding: 2px 6px;
          border-radius: 6px;
        }

        .exp-date-text {
          font-size: 10px;
          color: var(--text-muted);
        }

        .expense-amount-col {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .expense-amount-val {
          font-size: 14px;
          font-weight: 500;
          color: var(--text-primary);
          letter-spacing: -0.01em;
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
          padding: var(--space-lg) 0;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: var(--text-secondary);
        }

        .empty-wallet-icon {
          color: var(--text-muted);
        }

        /* Preset select buttons */
        .category-label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .presets-select-row {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          align-items: center;
        }

        .preset-select-btn {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          color: var(--text-secondary);
          font-size: 11px;
          font-weight: 500;
          padding: 6px 12px;
          border-radius: 8px;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .preset-select-btn.active {
          background: var(--text-primary);
          color: var(--bg-primary);
          border-color: var(--text-primary);
          font-weight: 600;
        }

        /* Minimal Add Custom Category Option */
        .add-category-mini-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px dashed rgba(255, 255, 255, 0.12);
          color: var(--text-secondary);
          font-size: 11px;
          font-weight: 500;
          padding: 5px 10px;
          border-radius: 8px;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .add-category-mini-btn:hover {
          background: rgba(255, 255, 255, 0.07);
          border-color: rgba(255, 255, 255, 0.25);
          color: var(--text-primary);
        }

        .inline-add-category-box {
          display: flex;
          align-items: center;
          gap: 4px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 8px;
          padding: 2px 4px;
        }

        .inline-category-input {
          background: transparent;
          border: none;
          outline: none;
          color: var(--text-primary);
          font-size: 11px;
          width: 110px;
          padding: 2px 4px;
        }

        .confirm-cat-btn, .cancel-cat-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2px;
          border-radius: 4px;
        }

        .confirm-cat-btn:hover {
          color: var(--accent-green);
        }

        .cancel-cat-btn:hover {
          color: var(--accent-red);
        }
      `}</style>
    </div>
  );
};

export default AnalyticsTab;
