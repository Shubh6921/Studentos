import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { ArrowLeft, Calendar as CalendarIcon, Clock, CheckCircle, Award } from 'lucide-react';

const DailyArchivePage = () => {
  const { 
    attendance, 
    habits, 
    expenses, 
    studyProgress, 
    journal,
    setActiveTab
  } = useContext(AppContext);

  const [selectedDay, setSelectedDay] = useState(4);

  const completedHabitsCount = habits.filter(h => h.completed).length;

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
    <div className="content-area daily-archive-page">
      {/* Navigation Header */}
      <div className="subpage-nav-header">
        <button onClick={() => setActiveTab('analytics')} className="back-btn" aria-label="Back to Analytics">
          <ArrowLeft size={16} />
          <span>Analytics Hub</span>
        </button>
      </div>

      {/* Page Title Header */}
      <div className="archive-header">
        <div className="ah-tag">
          <CalendarIcon size={13} className="ah-icon" />
          <span>MONTHLY LOG ARCHIVE</span>
        </div>
        <h1 className="text-title">Daily Activity & Study Archive</h1>
        <p className="text-desc">Review your historical daily focus minutes, habit completion rates, and journal entries.</p>
      </div>

      {/* Monthly Analytics Calendar */}
      <div className="premium-card calendar-card">
        <div className="calendar-header-row">
          <div className="calendar-title-info">
            <h3 className="text-subtitle">August 2026 Grid</h3>
            <span className="current-month-label">Tap any past day to inspect logs</span>
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
              <span className="details-date">August {selectedDay}, 2026 Log</span>
              <span className="details-status-pill">
                {selectedDay === 4 ? 'Today' : 'Historical Archive'}
              </span>
            </div>
            
            <div className="details-grid">
              <div className="details-item">
                <span className="details-item-label">Focus Duration</span>
                <span className="details-item-val">{selectedDayData.focusMinutes} mins</span>
              </div>
              <div className="details-item">
                <span className="details-item-label">Habits Met</span>
                <span className="details-item-val">{selectedDayData.habitsCompleted} / 5 habits</span>
              </div>
              <div className="details-item">
                <span className="details-item-label">Lectures Attended</span>
                <span className="details-item-val">{selectedDayData.attendanceChecked} classes</span>
              </div>
              <div className="details-item">
                <span className="details-item-label">Logged Expenses</span>
                <span className="details-item-val">₹{selectedDayData.expensesLogged.toFixed(2)}</span>
              </div>
              <div className="details-item details-item-wide">
                <span className="details-item-label">Reflection Alignment</span>
                <span className="details-item-val">{selectedDayData.reflections}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .daily-archive-page {
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

        .archive-header {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .ah-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: var(--accent-gold);
        }

        .ah-icon {
          color: var(--accent-gold);
        }
      `}</style>
    </div>
  );
};

export default DailyArchivePage;
