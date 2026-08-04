import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  Wallet, Calendar as CalendarIcon, BookOpen, ArrowRight, 
  TrendingUp, Award, AlertTriangle, ShieldCheck, ChevronRight
} from 'lucide-react';

const AnalyticsTab = () => {
  const { 
    attendance, 
    expenses, 
    habits, 
    studyProgress, 
    journal,
    setActiveTab
  } = useContext(AppContext);

  // High-level statistics computations
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const completedHabitsCount = habits.filter(h => h.completed).length;

  // Attendance overall average calculation
  const courseEntries = Object.entries(attendance);
  let totalAttended = 0;
  let totalClasses = 0;
  let warningCount = 0;

  courseEntries.forEach(([_, record]) => {
    totalAttended += record.attended;
    totalClasses += record.total;
    if (record.total > 0 && (record.attended / record.total) < 0.75) {
      warningCount++;
    }
  });

  const overallAttendancePercent = totalClasses > 0 ? (totalAttended / totalClasses) * 100 : 0;

  return (
    <div className="content-area analytics-tab-hub">
      {/* Analytics Main Header */}
      <div className="analytics-header">
        <h2 className="text-title">Analytics Hub</h2>
        <p className="text-desc">High-level overview of student metrics, daily archives, and financial outflow.</p>
      </div>

      {/* 1. Dedicated Financial HUD Redirect Card */}
      <div 
        onClick={() => setActiveTab('financial-page')} 
        className="premium-card analytics-module-card luxury-financial-hub-card"
        role="button"
        tabIndex={0}
      >
        <div className="module-top-row">
          <div className="module-icon-wrap gold-wrap">
            <Wallet size={20} />
          </div>
          <span className="module-badge">Financial Hub</span>
        </div>

        <div className="module-content-col">
          <div className="module-title-group">
            <h3 className="module-card-title">Financial Outflow & Expenses</h3>
            <p className="module-card-desc">Track lab manuals, campus dining, transport, and monthly budget limits.</p>
          </div>

          <div className="module-stat-banner">
            <div className="mod-stat-item">
              <span className="mod-stat-label">Total Outflow</span>
              <span className="mod-stat-value">₹{totalExpenses.toFixed(2)}</span>
            </div>
            <div className="mod-stat-divider" />
            <div className="mod-stat-item">
              <span className="mod-stat-label">Logged Entries</span>
              <span className="mod-stat-value">{expenses.length} Purchases</span>
            </div>
          </div>
        </div>

        <div className="module-card-footer">
          <span>Open Full Financial Page</span>
          <ArrowRight size={16} className="cta-arrow" />
        </div>
      </div>

      {/* 2. Dedicated Daily Archive Redirect Card */}
      <div 
        onClick={() => setActiveTab('daily-archive-page')} 
        className="premium-card analytics-module-card luxury-archive-hub-card"
        role="button"
        tabIndex={0}
      >
        <div className="module-top-row">
          <div className="module-icon-wrap blue-wrap">
            <CalendarIcon size={20} />
          </div>
          <span className="module-badge">Daily Archive</span>
        </div>

        <div className="module-content-col">
          <div className="module-title-group">
            <h3 className="module-card-title">Daily Activity & Calendar Log</h3>
            <p className="module-card-desc">Review historical study focus minutes, reflection alignment, and habit completion.</p>
          </div>

          <div className="module-stat-banner">
            <div className="mod-stat-item">
              <span className="mod-stat-label">Current Month</span>
              <span className="mod-stat-value">August 2026</span>
            </div>
            <div className="mod-stat-divider" />
            <div className="mod-stat-item">
              <span className="mod-stat-label">Today's Focus</span>
              <span className="mod-stat-value">{studyProgress.completedMinutes} mins</span>
            </div>
          </div>
        </div>

        <div className="module-card-footer">
          <span>Open Daily Calendar Archive</span>
          <ArrowRight size={16} className="cta-arrow" />
        </div>
      </div>

      {/* 3. Dedicated Attendance Matrix Redirect Card */}
      <div 
        onClick={() => setActiveTab('attendance-matrix-page')} 
        className="premium-card analytics-module-card luxury-attendance-hub-card"
        role="button"
        tabIndex={0}
      >
        <div className="module-top-row">
          <div className="module-icon-wrap green-wrap">
            <BookOpen size={20} />
          </div>
          <span className="module-badge">Attendance Matrix</span>
        </div>

        <div className="module-content-col">
          <div className="module-title-group">
            <h3 className="module-card-title">Attendance Matrix & Bounds</h3>
            <p className="module-card-desc">Monitor percentage thresholds, mandatory minimums, and safe absence allowances.</p>
          </div>

          <div className="module-stat-banner">
            <div className="mod-stat-item">
              <span className="mod-stat-label">Overall Ratio</span>
              <span className="mod-stat-value">{overallAttendancePercent.toFixed(0)}%</span>
            </div>
            <div className="mod-stat-divider" />
            <div className="mod-stat-item">
              <span className="mod-stat-label">Low Attendance Alerts</span>
              <span className={`mod-stat-value ${warningCount > 0 ? 'text-danger' : ''}`}>
                {warningCount > 0 ? `${warningCount} Alert${warningCount > 1 ? 's' : ''}` : 'All Safe'}
              </span>
            </div>
          </div>
        </div>

        <div className="module-card-footer">
          <span>Open Attendance Matrix</span>
          <ArrowRight size={16} className="cta-arrow" />
        </div>
      </div>

      <style>{`
        .analytics-tab-hub {
          gap: 16px;
          padding-bottom: 24px;
          animation: fadeIn 0.4s var(--ease-premium);
        }

        .analytics-header {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .analytics-module-card {
          cursor: pointer;
          gap: 16px;
          padding: 20px !important;
          transition: transform 0.22s var(--ease-premium), 
                      border-color 0.22s var(--ease-premium), 
                      box-shadow 0.22s var(--ease-premium);
        }

        .analytics-module-card:hover {
          transform: translateY(-3px);
          border-color: var(--border-color-active) !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4) !important;
        }

        .module-top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .module-icon-wrap {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid transparent;
        }

        .gold-wrap {
          background: rgba(197, 168, 128, 0.08);
          border-color: rgba(197, 168, 128, 0.2);
          color: var(--accent-gold);
        }

        .blue-wrap {
          background: rgba(112, 151, 209, 0.08);
          border-color: rgba(112, 151, 209, 0.2);
          color: var(--accent-blue);
        }

        .green-wrap {
          background: rgba(72, 154, 126, 0.08);
          border-color: rgba(72, 154, 126, 0.2);
          color: var(--accent-green);
        }

        .module-badge {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 3px 8px;
          border-radius: 6px;
        }

        .module-content-col {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .module-title-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .module-card-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: -0.01em;
        }

        .module-card-desc {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .module-stat-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 12px;
          padding: 12px 16px;
        }

        .mod-stat-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
        }

        .mod-stat-divider {
          width: 1px;
          height: 24px;
          background: rgba(255, 255, 255, 0.06);
          margin: 0 12px;
        }

        .mod-stat-label {
          font-size: 10px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--text-muted);
        }

        .mod-stat-value {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .mod-stat-value.text-danger {
          color: var(--accent-red);
        }

        .module-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.03);
          font-size: 12px;
          font-weight: 500;
          color: var(--text-primary);
        }

        .cta-arrow {
          color: var(--text-muted);
          transition: transform var(--transition-fast), color var(--transition-fast);
        }

        .analytics-module-card:hover .cta-arrow {
          transform: translateX(4px);
          color: var(--text-primary);
        }
      `}</style>
    </div>
  );
};

export default AnalyticsTab;
