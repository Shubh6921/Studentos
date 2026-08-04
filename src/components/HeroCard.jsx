import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { Sun, Moon, Quote, Calendar, Zap } from 'lucide-react';

const HeroCard = () => {
  const { userName, semesterDay, week, timeOfDay, customQuote, streak } = useContext(AppContext);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const ticker = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(ticker);
  }, []);

  const getConfig = () => {
    switch (timeOfDay) {
      case 'Morning':
        return { greeting: 'Good Morning', Icon: Sun };
      case 'Afternoon':
        return { greeting: 'Good Afternoon', Icon: Sun };
      case 'Evening':
        return { greeting: 'Good Evening', Icon: Moon };
      case 'Night':
      default:
        return { greeting: 'Rest Well', Icon: Moon };
    }
  };

  const cfg = getConfig();
  const { Icon } = cfg;

  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months   = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const now      = currentTime;
  const dayName  = weekdays[now.getDay()];
  const dateStr  = `${now.getDate()} ${months[now.getMonth()]}`;
  const timeStr  = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

  const firstName = userName ? userName.split(' ')[0] : 'Student';

  return (
    <div className={`hc-root ${mounted ? 'hc-mounted' : ''}`}>
      {/* Subtle ambient background glow */}
      <div className="hc-orb" />

      {/* Top Row — Greeting + Time & Streak */}
      <div className="hc-top">
        <div className="hc-left">
          {/* Status chip */}
          <div className="hc-chip">
            <span className="hc-pulse" />
            <span className="hc-chip-text">SYSTEM ACTIVE</span>
          </div>

          {/* Main greeting */}
          <div className="hc-greeting-row">
            <h1 className="hc-title">
              {cfg.greeting},
              <span className="hc-name">&nbsp;{firstName}</span>
            </h1>
          </div>

          {/* Subtitle — date / week / day */}
          <div className="hc-meta-row">
            <span className="hc-meta-item">
              <Calendar size={10} className="hc-meta-icon" />
              {dayName}, {dateStr}
            </span>
            <span className="hc-dot-sep" />
            <span className="hc-meta-item">Week {week}</span>
            <span className="hc-dot-sep" />
            <span className="hc-meta-item">Day {semesterDay}</span>
          </div>
        </div>

        {/* Right Stack — Clock Pill + Streak Pill below */}
        <div className="hc-right-col">
          <div className="hc-clock-pill">
            <Icon size={12} className="hc-clock-icon" />
            <span className="hc-clock-time">{timeStr}</span>
          </div>

          {/* Streak displayed directly below time */}
          <div className="hc-streak-pill">
            <Zap size={11} className="hc-streak-icon" />
            <span className="hc-streak-text">{streak || 0}d Streak</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="hc-rule" />

      {/* Bottom Row — Custom Motto/Quote read from Context */}
      <div className="hc-quote-section">
        <div className="hc-quote-header">
          <div className="hc-quote-tag">
            <Quote size={11} className="hc-quote-icon" />
            <span>DAILY MOTTO</span>
          </div>
        </div>

        <p className="hc-quote-text">
          "{customQuote || 'Relentless execution beats passive intent.'}"
        </p>
      </div>

      <style>{`
        /* ─── Root Container ─── */
        .hc-root {
          position: relative;
          overflow: hidden;
          padding: 20px 20px 16px 20px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.4s var(--ease-premium), transform 0.4s var(--ease-premium);
        }
        .hc-root.hc-mounted {
          opacity: 1;
          transform: translateY(0);
        }

        /* ─── Ambient Glow ─── */
        .hc-orb {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          border-radius: 20px;
          background: radial-gradient(ellipse at 0% 0%, rgba(255, 255, 255, 0.05) 0%, transparent 70%);
        }

        /* ─── Top Row ─── */
        .hc-top {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }

        .hc-left {
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
          min-width: 0;
        }

        /* Status chip */
        .hc-chip {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .hc-chip-text {
          color: var(--text-muted);
        }
        .hc-pulse {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #FFFFFF;
          box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
          animation: hcPulse 2.4s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes hcPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); }
          50%       { box-shadow: 0 0 0 5px rgba(255, 255, 255, 0); }
        }

        /* Greeting */
        .hc-greeting-row {
          display: flex;
          align-items: baseline;
          gap: 0;
        }
        .hc-title {
          font-size: 26px;
          font-weight: 600;
          letter-spacing: -0.04em;
          color: var(--text-primary);
          line-height: 1.1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .hc-name {
          color: #FFFFFF;
        }

        /* Meta row */
        .hc-meta-row {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: nowrap;
        }
        .hc-meta-item {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 10px;
          font-weight: 500;
          color: var(--text-muted);
          letter-spacing: 0.03em;
          white-space: nowrap;
        }
        .hc-meta-icon {
          color: var(--text-muted);
          flex-shrink: 0;
        }
        .hc-dot-sep {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: var(--border-color);
          flex-shrink: 0;
        }

        /* Right column: Clock & Streak stack */
        .hc-right-col {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
          flex-shrink: 0;
        }

        /* Clock pill */
        .hc-clock-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 40px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-color);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .hc-clock-icon {
          color: #FFFFFF;
        }
        .hc-clock-time {
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: #FFFFFF;
          font-variant-numeric: tabular-nums;
          white-space: nowrap;
        }

        /* Streak pill directly below clock */
        .hc-streak-pill {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid var(--border-color);
        }
        .hc-streak-icon {
          color: #FFFFFF;
        }
        .hc-streak-text {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.02em;
          color: var(--text-primary);
          white-space: nowrap;
        }

        /* ─── Divider rule ─── */
        .hc-rule {
          position: relative;
          z-index: 1;
          height: 1px;
          background: var(--border-color);
          margin: 0 -2px;
        }

        /* ─── Custom Quote Section ─── */
        .hc-quote-section {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .hc-quote-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .hc-quote-tag {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.1em;
          color: var(--text-muted);
        }

        .hc-quote-icon {
          color: var(--text-muted);
        }

        .hc-quote-text {
          font-size: 12px;
          font-weight: 400;
          font-style: italic;
          color: var(--text-secondary);
          line-height: 1.5;
          letter-spacing: -0.01em;
        }

        /* ─── Light theme overrides ─── */
        [data-theme="light"] .hc-root {
          background: #FFFFFF;
          border-color: rgba(0,0,0,0.12);
        }
        [data-theme="light"] .hc-clock-pill,
        [data-theme="light"] .hc-streak-pill {
          background: rgba(0,0,0,0.03);
          border-color: rgba(0,0,0,0.12);
        }
        [data-theme="light"] .hc-clock-icon,
        [data-theme="light"] .hc-clock-time,
        [data-theme="light"] .hc-streak-icon,
        [data-theme="light"] .hc-streak-text {
          color: #000000;
        }
        [data-theme="light"] .hc-pulse {
          background: #000000;
        }
      `}</style>
    </div>
  );
};

export default HeroCard;
