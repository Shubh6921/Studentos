import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { ArrowLeft, BookOpen, AlertTriangle, ShieldCheck, Plus } from 'lucide-react';

const AttendanceMatrixPage = () => {
  const { attendance, setActiveTab } = useContext(AppContext);

  return (
    <div className="content-area attendance-matrix-page">
      {/* Navigation Header */}
      <div className="subpage-nav-header">
        <button onClick={() => setActiveTab('analytics')} className="back-btn" aria-label="Back to Analytics">
          <ArrowLeft size={16} />
          <span>Analytics Hub</span>
        </button>
      </div>

      {/* Page Title Header */}
      <div className="attendance-header">
        <div className="att-tag">
          <BookOpen size={13} className="att-icon" />
          <span>ACADEMIC COMPLIANCE & RATIOS</span>
        </div>
        <h1 className="text-title">Attendance Matrix</h1>
        <p className="text-desc">Monitor percentage thresholds, mandatory minimums, and safe absence allowances.</p>
      </div>

      {/* Attendance Matrix Details Card */}
      <div className="premium-card attendance-analytics-card">
        <div className="card-header-with-btn">
          <h3 className="text-subtitle">Active Course Meters</h3>
          <button onClick={() => setActiveTab('profile')} className="add-mini-btn">
            <Plus size={12} />
            <span>Manage Courses</span>
          </button>
        </div>
        
        <div className="attendance-meters">
          {Object.entries(attendance).length === 0 ? (
            <div className="empty-state">
              <p className="empty-state-text">No courses added. Use Control Hub Drawer in Profile to add courses.</p>
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

              const radius = 24;
              const circumference = 2 * Math.PI * radius;
              const strokeDashoffset = circumference - (percent / 100) * circumference;
              
              return (
                <div key={subject} className="attendance-row-card luxury-att-item">
                  <div className="attendance-info-side">
                    <span className="subject-name-tag">{subject}</span>
                    <span className="subject-stats-tag">
                      {a} / {t} classes attended &bull; {percent.toFixed(0)}%
                    </span>
                    <span className={`status-pill-sub ${statusClass}`}>
                      {statusPillText}
                    </span>
                  </div>
                  
                  <div className="attendance-radial-side">
                    <svg className="radial-svg" width="64" height="64">
                      <circle 
                        className="radial-bg-circle"
                        cx="32" 
                        cy="32" 
                        r={radius} 
                        strokeWidth="3" 
                        fill="transparent"
                      />
                      <circle 
                        className={`radial-fg-circle ${statusClass}`}
                        cx="32" 
                        cy="32" 
                        r={radius} 
                        strokeWidth="3" 
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        transform="rotate(-90 32 32)"
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

      <style>{`
        .attendance-matrix-page {
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

        .attendance-header {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .att-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: var(--accent-gold);
        }

        .card-header-with-btn {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .luxury-att-item {
          padding: 16px !important;
        }
      `}</style>
    </div>
  );
};

export default AttendanceMatrixPage;
