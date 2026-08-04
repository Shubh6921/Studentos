import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Play, CheckCircle, Clock, Calendar } from 'lucide-react';

const ActionCard = () => {
  const { currentAction, completeAction } = useContext(AppContext);
  const [isCompleting, setIsCompleting] = useState(false);

  const handleComplete = () => {
    if (!currentAction) return;
    setIsCompleting(true);
    
    setTimeout(() => {
      completeAction(currentAction.id);
      setIsCompleting(false);
    }, 400);
  };

  if (!currentAction) {
    return (
      <div className="premium-card empty-action-card">
        <div className="empty-content">
          <div className="empty-status-pill">
            <span className="pill-dot"></span>
            <span>ALL CAUGHT UP</span>
          </div>
          <h2 className="empty-title">Rest & Reflect</h2>
          <p className="empty-subtitle">
            No pending tasks in queue. Review lecture notes or take time to recharge.
          </p>
        </div>
        
        <style>{`
          .empty-action-card {
            border: 1px solid var(--border-color);
            background: var(--bg-card);
            padding: var(--space-xl) var(--space-lg);
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .empty-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            text-align: center;
          }

          .empty-status-pill {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 10px;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #FFFFFF;
            background: rgba(255, 255, 255, 0.06);
            padding: 4px 12px;
            border-radius: 20px;
            border: 1px solid var(--border-color);
          }

          .pill-dot {
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: #FFFFFF;
          }

          .empty-title {
            font-size: 20px;
            font-weight: 600;
            letter-spacing: -0.03em;
            color: #FFFFFF;
          }

          .empty-subtitle {
            font-size: 12px;
            color: var(--text-secondary);
            line-height: 1.6;
            max-width: 280px;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className={`premium-card action-card ${isCompleting ? 'completing' : ''}`}>
      <div className="action-tag">
        <span className="tag-dot"></span>
        <span>PRIMARY FOCUS TASK</span>
      </div>
      
      <div className="action-details">
        <h2 className="action-title">{currentAction.title}</h2>
        
        <div className="action-meta">
          <div className="meta-item">
            <Clock size={12} className="meta-icon" />
            <span>{currentAction.estimatedTime}</span>
          </div>
          <div className="meta-divider">&bull;</div>
          <div className="meta-item">
            <Calendar size={12} className="meta-icon" />
            <span>Due {currentAction.deadline}</span>
          </div>
        </div>
      </div>
      
      <button 
        onClick={handleComplete}
        className="action-cta"
        disabled={isCompleting}
      >
        {isCompleting ? (
          <CheckCircle size={16} className="animate-spin" />
        ) : (
          <Play size={14} fill="currentColor" />
        )}
        <span>{isCompleting ? 'MARKING COMPLETE...' : 'START FOCUS TASK'}</span>
      </button>

      <style>{`
        .action-card {
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-premium);
          gap: 16px;
          background: var(--bg-card);
          padding: 20px;
          transition: all 0.3s var(--ease-premium);
        }

        .action-card.completing {
          transform: scale(0.98);
          opacity: 0.6;
        }

        .action-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-secondary);
        }

        .tag-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #FFFFFF;
        }

        .action-details {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .action-title {
          font-size: 20px;
          font-weight: 600;
          line-height: 1.3;
          letter-spacing: -0.03em;
          color: #FFFFFF;
        }

        .action-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .meta-icon {
          color: var(--text-muted);
        }

        .meta-divider {
          color: var(--text-muted);
        }

        .action-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          background: #FFFFFF;
          color: #000000;
          border-radius: 12px;
          height: 46px;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.04em;
          border: none;
          cursor: pointer;
          transition: all 0.2s var(--ease-premium);
        }
        
        .action-cta:hover {
          background: #EAEAEA;
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(255, 255, 255, 0.15);
        }

        .action-cta:active {
          transform: translateY(0) scale(0.98);
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ActionCard;
