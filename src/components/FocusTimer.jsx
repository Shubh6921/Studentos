import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Play, Pause, RotateCcw, Award } from 'lucide-react';

const FocusTimer = ({ compact = false }) => {
  const { 
    focusActive, 
    focusTimeLeft, 
    focusDuration, 
    studyProgress, 
    startFocus, 
    resumeFocus, 
    pauseFocus, 
    resetFocus 
  } = useContext(AppContext);

  // Helper to format MM:SS
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const progressPercent = ((focusDuration - focusTimeLeft) / focusDuration) * 100;
  const dailyPercent = Math.min(100, (studyProgress.completedMinutes / studyProgress.targetMinutes) * 100);

  return (
    <div className="premium-card focus-timer-card">
      <div className="timer-header">
        <h3 className="text-subtitle">Focus Session</h3>
        <div className="daily-target-indicator">
          <Award size={13} className="target-icon" />
          <span>{studyProgress.completedMinutes}m / {studyProgress.targetMinutes}m today</span>
        </div>
      </div>

      {!compact && (
        <div className="timer-body">
          {/* Countdown display */}
          <div className="timer-display-container">
            <div className="timer-clock">{formatTime(focusTimeLeft)}</div>
            
            {/* Active progress bar */}
            <div className="timer-progress-bg">
              <div 
                className="timer-progress-fill" 
                style={{ width: `${focusActive ? progressPercent : 0}%` }}
              ></div>
            </div>
          </div>

          {/* Buttons Row */}
          <div className="timer-controls">
            {focusActive ? (
              <button onClick={pauseFocus} className="timer-btn pause" aria-label="Pause session">
                <Pause size={16} fill="currentColor" />
                <span>Pause</span>
              </button>
            ) : (
              <button 
                onClick={focusTimeLeft === focusDuration ? () => startFocus(25) : resumeFocus} 
                className="timer-btn start btn-primary"
                aria-label="Start focus session"
              >
                <Play size={15} fill="currentColor" />
                <span>{focusTimeLeft === focusDuration ? 'Start Focus' : 'Resume'}</span>
              </button>
            )}

            <button onClick={resetFocus} className="timer-btn-secondary reset" aria-label="Reset timer">
              <RotateCcw size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Target Progress Bar */}
      <div className="daily-progress-row">
        <div className="progress-bar-label">
          <span>Daily Progress</span>
          <span>{dailyPercent.toFixed(0)}%</span>
        </div>
        <div className="overall-progress-track">
          <div className="overall-progress-bar" style={{ width: `${dailyPercent}%` }}></div>
        </div>
      </div>

      <style>{`
        .focus-timer-card {
          gap: var(--space-md);
        }

        .timer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .daily-target-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 600;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          padding: 4px 10px;
          border-radius: 12px;
        }

        .target-icon {
          color: var(--accent-gold);
        }

        .timer-body {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-md);
          width: 100%;
        }

        .timer-display-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 8px 0;
        }

        .timer-clock {
          font-size: 48px;
          font-weight: 500;
          letter-spacing: -0.04em;
          font-variant-numeric: tabular-nums;
          color: var(--text-primary);
        }

        .timer-progress-bg {
          width: 80%;
          height: 2px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 1px;
          overflow: hidden;
          position: relative;
        }

        .timer-progress-fill {
          height: 100%;
          background: var(--text-primary);
          border-radius: 1px;
          transition: width 1s linear; /* Smooth linear animation */
        }

        .timer-controls {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          justify-content: center;
        }

        .timer-btn {
          flex: 1;
          max-width: 180px;
          height: 44px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all var(--transition-fast);
        }

        .timer-btn.start {
          background: var(--text-primary);
          color: var(--bg-primary);
        }
        
        .timer-btn.start:hover {
          opacity: 0.9;
        }

        .timer-btn.pause {
          background: rgba(255, 255, 255, 0.02);
          color: var(--text-primary);
        }

        .timer-btn.pause:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .timer-btn-secondary {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .timer-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-primary);
          border-color: rgba(255, 255, 255, 0.1);
        }

        /* Daily Progress bar styling */
        .daily-progress-row {
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 100%;
          border-top: 1px solid rgba(255, 255, 255, 0.03);
          padding-top: var(--space-md);
        }

        .progress-bar-label {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .overall-progress-track {
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 2px;
          overflow: hidden;
        }

        .overall-progress-bar {
          height: 100%;
          background: var(--accent-gold);
          border-radius: 2px;
          transition: width var(--transition-slow);
        }
      `}</style>
    </div>
  );
};

export default FocusTimer;
