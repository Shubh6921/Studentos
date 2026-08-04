import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';

const AttendanceWarning = () => {
  const { warnings } = useContext(AppContext);

  if (!warnings || warnings.length === 0) return null;

  return (
    <div className="attention-section">
      <div className="attention-header-row">
        <h3 className="attention-title-caps">REQUIRES ATTENTION</h3>
        <span className="attention-count-tag">{warnings.length} ALERTS</span>
      </div>

      <div className="warning-list">
        {warnings.map((warn) => {
          let Icon = Info;
          let colorClass = 'info';
          if (warn.type === 'danger') {
            Icon = AlertCircle;
            colorClass = 'danger';
          } else if (warn.type === 'warning') {
            Icon = AlertTriangle;
            colorClass = 'warning';
          }
          
          return (
            <div key={warn.id} className={`warning-item ${colorClass}`}>
              <Icon size={14} className={`warn-icon ${colorClass}`} />
              <span className="warning-text">{warn.text}</span>
            </div>
          );
        })}
      </div>

      <style>{`
        .attention-section {
          display: flex;
          flex-direction: column;
          gap: 10px;
          animation: fadeIn 0.4s var(--ease-premium);
        }

        .attention-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .attention-title-caps {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: var(--text-secondary);
        }

        .attention-count-tag {
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: var(--accent-red);
          background: rgba(224, 92, 92, 0.1);
          border: 1px solid rgba(224, 92, 92, 0.2);
          padding: 2px 7px;
          border-radius: 8px;
        }

        .warning-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .warning-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          border-radius: 12px;
          background: #08080A;
          border: 1px solid rgba(255, 255, 255, 0.06);
          transition: all var(--transition-fast);
        }

        .warn-icon {
          flex-shrink: 0;
        }

        .warning-text {
          font-size: 12px;
          font-weight: 500;
          color: #FFFFFF;
          letter-spacing: -0.01em;
        }

        /* Danger state styles */
        .warning-item.danger {
          border-left: 2px solid #E05C5C;
          background: rgba(224, 92, 92, 0.03);
          border-color: rgba(224, 92, 92, 0.12) rgba(255,255,255,0.06) rgba(255,255,255,0.06) #E05C5C;
        }
        .warn-icon.danger {
          color: #E05C5C;
        }

        /* Warning state styles */
        .warning-item.warning {
          border-left: 2px solid #C5A880;
          background: rgba(197, 168, 128, 0.03);
          border-color: rgba(197, 168, 128, 0.12) rgba(255,255,255,0.06) rgba(255,255,255,0.06) #C5A880;
        }
        .warn-icon.warning {
          color: #C5A880;
        }

        /* Info state styles */
        .warning-item.info {
          border-left: 2px solid #7097D1;
          background: rgba(112, 151, 209, 0.03);
          border-color: rgba(112, 151, 209, 0.12) rgba(255,255,255,0.06) rgba(255,255,255,0.06) #7097D1;
        }
        .warn-icon.info {
          color: #7097D1;
        }
      `}</style>
    </div>
  );
};

export default AttendanceWarning;
