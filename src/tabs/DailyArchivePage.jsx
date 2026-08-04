import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { ArrowLeft, Calendar as CalendarIcon, Clock, CheckCircle2, Flame, Layers } from 'lucide-react';

const DailyArchivePage = () => {
  const { 
    attendance, 
    habits, 
    expenses, 
    studyProgress, 
    journal,
    streak,
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
        attendanceChecked: Object.keys(attendance).length,
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
      1: { focusMinutes: 45, habitsCompleted: 3, attendanceChecked: 2, reflections: 'Evening complete', expensesLogged: 250, status: 'medium' },
      2: { focusMinutes: 15, habitsCompleted: 2, attendanceChecked: 1, reflections: 'None', expensesLogged: 0, status: 'low' },
      3: { focusMinutes: 90, habitsCompleted: 5, attendanceChecked: 4, reflections: 'Morning & Evening complete', expensesLogged: 120, status: 'high' }
    };

    return mockHistory[day] || { focusMinutes: 0, habitsCompleted: 0, attendanceChecked: 0, reflections: 'None', expensesLogged: 0, status: 'low' };
  };

  const selectedDayData = getDayData(selectedDay);

  return (
    <div className="content-area daily-archive-page-monochrome">
      {/* Navigation Header */}
      <div className="subpage-nav-header">
        <button onClick={() => setActiveTab('analytics')} className="back-btn-mono" aria-label="Back to Analytics">
          <ArrowLeft size={15} />
          <span>Analytics Hub</span>
        </button>
      </div>

      {/* Page Title Header */}
      <div className="archive-header-mono">
        <div className="ah-tag-mono">
          <span className="ah-dot-white" />
          <span>DAILY ARCHIVE & CALENDAR</span>
        </div>
        <h1 className="text-title-mono">Daily Activity Archive</h1>
        <p className="text-desc-mono">Review historical study focus minutes, habit completion rates, and daily logs.</p>
      </div>

      {/* High-Level Monochrome KPI Stat Cards */}
      <div className="kpi-banner-mono">
        <div className="kpi-card-mono">
          <span className="kpi-label-mono">Active Streak</span>
          <div className="kpi-val-row-mono">
            <Flame size={16} className="kpi-icon-mono" />
            <span className="kpi-val-mono">{streak} Days</span>
          </div>
        </div>

        <div className="kpi-divider-mono" />

        <div className="kpi-card-mono">
          <span className="kpi-label-mono">Today's Focus</span>
          <div className="kpi-val-row-mono">
            <Clock size={16} className="kpi-icon-mono" />
            <span className="kpi-val-mono">{studyProgress.completedMinutes}m / {studyProgress.targetMinutes}m</span>
          </div>
        </div>

        <div className="kpi-divider-mono" />

        <div className="kpi-card-mono">
          <span className="kpi-label-mono">Habit Target</span>
          <div className="kpi-val-row-mono">
            <CheckCircle2 size={16} className="kpi-icon-mono" />
            <span className="kpi-val-mono">{completedHabitsCount} / {habits.length} Met</span>
          </div>
        </div>
      </div>

      {/* Monthly Analytics Calendar (Strict Monochrome Black) */}
      <div className="premium-card calendar-card-mono">
        <div className="calendar-header-mono">
          <div className="calendar-title-info-mono">
            <h3 className="calendar-title-text-mono">August 2026 Grid</h3>
            <span className="calendar-sub-label-mono">Select any past date to inspect daily logs</span>
          </div>
          <CalendarIcon size={15} className="calendar-icon-white" />
        </div>

        <div className="calendar-grid-mono">
          {weekdays.map((day, idx) => (
            <div key={idx} className="calendar-day-header-mono">{day}</div>
          ))}

          {Array(startDayOffset).fill(null).map((_, idx) => (
            <div key={`offset-${idx}`} className="calendar-cell-mono offset"></div>
          ))}

          {Array(daysInMonth).fill(null).map((_, idx) => {
            const dayNum = idx + 1;
            const isToday = dayNum === 4;
            const isFuture = dayNum > 4;
            const isSelected = selectedDay === dayNum;
            const dayData = getDayData(dayNum);
            
            let intensityClass = 'intensity-0';
            if (dayData) {
              if (dayData.status === 'high') intensityClass = 'intensity-high';
              else if (dayData.status === 'medium') intensityClass = 'intensity-mid';
            }

            return (
              <button
                key={`day-${dayNum}`}
                onClick={() => !isFuture && setSelectedDay(dayNum)}
                className={`calendar-cell-mono ${isFuture ? 'disabled' : ''} ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''} ${intensityClass}`}
                disabled={isFuture}
                aria-label={`August ${dayNum} analytics`}
              >
                <span className="cell-num-mono">{dayNum}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Day Inspection Panel */}
        {selectedDayData && (
          <div className="day-details-panel-mono">
            <div className="details-title-row-mono">
              <span className="details-date-mono">August {selectedDay}, 2026 Archive</span>
              <span className="details-status-pill-mono">
                {selectedDay === 4 ? 'Today' : 'Past Log'}
              </span>
            </div>
            
            <div className="details-grid-mono">
              <div className="details-item-mono">
                <span className="details-item-label-mono">Focus Duration</span>
                <span className="details-item-val-mono">{selectedDayData.focusMinutes} mins logged</span>
              </div>

              <div className="details-item-mono">
                <span className="details-item-label-mono">Habits Completed</span>
                <span className="details-item-val-mono">{selectedDayData.habitsCompleted} / {habits.length} habits</span>
              </div>

              <div className="details-item-mono">
                <span className="details-item-label-mono">Lectures Checked</span>
                <span className="details-item-val-mono">{selectedDayData.attendanceChecked} classes</span>
              </div>

              <div className="details-item-mono">
                <span className="details-item-label-mono">Logged Outflow</span>
                <span className="details-item-val-mono">₹{selectedDayData.expensesLogged.toFixed(2)}</span>
              </div>

              <div className="details-item-mono details-item-wide-mono">
                <span className="details-item-label-mono">Reflection Alignment</span>
                <span className="details-item-val-mono">{selectedDayData.reflections}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .daily-archive-page-monochrome {
          gap: 16px;
          padding-bottom: 36px;
          animation: fadeIn 0.38s var(--ease-premium);
        }

        .subpage-nav-header {
          display: flex;
          align-items: center;
        }

        .back-btn-mono {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          padding: 6px 12px;
          color: var(--text-primary);
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .back-btn-mono:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .archive-header-mono {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .ah-tag-mono {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: var(--text-secondary);
        }

        .ah-dot-white {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #FFFFFF;
        }

        .text-title-mono {
          font-size: 24px;
          font-weight: 600;
          color: #FFFFFF;
          letter-spacing: -0.02em;
        }

        .text-desc-mono {
          font-size: 13px;
          color: #8E8E93;
          line-height: 1.5;
        }

        /* KPI Stat Cards Banner */
        .kpi-banner-mono {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #080808;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 14px 18px;
        }

        .kpi-card-mono {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
        }

        .kpi-label-mono {
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #8E8E93;
        }

        .kpi-val-row-mono {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .kpi-icon-mono {
          color: #FFFFFF;
        }

        .kpi-val-mono {
          font-size: 13px;
          font-weight: 600;
          color: #FFFFFF;
        }

        .kpi-divider-mono {
          width: 1px;
          height: 24px;
          background: rgba(255, 255, 255, 0.08);
          margin: 0 12px;
        }

        /* Calendar Card */
        .calendar-card-mono {
          background: #080808 !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 20px !important;
          padding: 20px !important;
          gap: 16px;
        }

        .calendar-header-mono {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .calendar-title-info-mono {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .calendar-title-text-mono {
          font-size: 15px;
          font-weight: 600;
          color: #FFFFFF;
        }

        .calendar-sub-label-mono {
          font-size: 11px;
          color: #8E8E93;
          font-weight: 400;
        }

        .calendar-icon-white {
          color: #FFFFFF;
        }

        /* Calendar Grid */
        .calendar-grid-mono {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 6px;
        }

        .calendar-day-header-mono {
          font-size: 11px;
          font-weight: 600;
          text-align: center;
          color: #8E8E93;
          font-family: var(--font-mono, monospace);
          padding-bottom: 4px;
        }

        .calendar-cell-mono {
          aspect-ratio: 1;
          background: #0D0D11;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 500;
          color: #8E8E93;
          cursor: pointer;
          position: relative;
          transition: all var(--transition-fast);
        }

        .calendar-cell-mono:hover:not(.disabled) {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
          color: #FFFFFF;
        }

        .calendar-cell-mono.offset {
          background: transparent;
          border: none;
          cursor: default;
          pointer-events: none;
        }

        .calendar-cell-mono.disabled {
          opacity: 0.2;
          cursor: not-allowed;
          pointer-events: none;
          border-style: dashed;
        }

        /* Strict Monochrome Intensity Levels */
        .calendar-cell-mono.intensity-high {
          background: rgba(255, 255, 255, 0.12);
          color: #FFFFFF;
          border-color: rgba(255, 255, 255, 0.25);
          font-weight: 600;
        }

        .calendar-cell-mono.intensity-mid {
          background: rgba(255, 255, 255, 0.05);
          color: #E5E5EA;
          border-color: rgba(255, 255, 255, 0.12);
        }

        .calendar-cell-mono.selected {
          border-color: #FFFFFF !important;
          color: #FFFFFF !important;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.16) !important;
          box-shadow: 0 0 12px rgba(255, 255, 255, 0.15);
        }

        .calendar-cell-mono.today::after {
          content: '';
          position: absolute;
          bottom: 4px;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #FFFFFF;
        }

        /* Day Details Inspection Panel */
        .day-details-panel-mono {
          margin-top: 4px;
          padding-top: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          gap: 12px;
          animation: fadeIn 0.3s var(--ease-premium);
        }

        .details-title-row-mono {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .details-date-mono {
          font-size: 14px;
          font-weight: 600;
          color: #FFFFFF;
        }

        .details-status-pill-mono {
          font-size: 9px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #FFFFFF;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.14);
          padding: 3px 8px;
          border-radius: 6px;
        }

        .details-grid-mono {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        .details-item-mono {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .details-item-label-mono {
          font-size: 9px;
          color: #8E8E93;
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 0.04em;
        }

        .details-item-val-mono {
          font-size: 13px;
          font-weight: 600;
          color: #FFFFFF;
        }

        .details-item-wide-mono {
          grid-column: span 2;
        }
      `}</style>
    </div>
  );
};

export default DailyArchivePage;
