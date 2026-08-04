import React from 'react';
import { Home, Calendar, BookOpen, BarChart2, User, PenLine } from 'lucide-react';

const BottomNavigation = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'planner',   label: 'Planner',   icon: Calendar },
    { id: 'journal',   label: 'Journal',   icon: PenLine },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'profile',   label: 'Profile',   icon: User },
  ];

  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      <div className="bottom-nav-inner">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`nav-btn ${isActive ? 'active' : ''}`}
              aria-label={item.label}
            >
              <div className="nav-icon-wrap">
                {isActive && <span className="nav-active-bg" />}
                <Icon size={20} strokeWidth={isActive ? 2.2 : 1.6} />
              </div>
              <span className="nav-label">{item.label}</span>
            </button>
          );
        })}
      </div>
      
      <style>{`
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 76px;
          background: rgba(0, 0, 0, 0.92);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border-top: 1px solid var(--border-color);
          z-index: 90;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: background 0.35s var(--ease-premium),
                      border-color 0.35s var(--ease-premium);
        }

        [data-theme="light"] .bottom-nav {
          background: rgba(255, 255, 255, 0.92);
          border-color: rgba(0, 0, 0, 0.1);
        }

        .bottom-nav-inner {
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 100%;
          max-width: 520px;
          padding: 0 8px;
        }

        .nav-btn {
          background: none;
          border: none;
          color: var(--text-muted);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          cursor: pointer;
          flex: 1;
          height: 100%;
          padding: 8px 4px;
          transition: color 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }

        .nav-btn:hover {
          color: var(--text-secondary);
        }

        .nav-btn.active {
          color: var(--text-primary);
        }

        .nav-btn:active {
          transform: scale(0.94);
        }

        /* Icon wrapper — hosts the pill bg */
        .nav-icon-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 28px;
        }

        /* Spring active pill behind icon */
        .nav-active-bg {
          position: absolute;
          inset: 0;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.16);
          animation: pillSpring 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        [data-theme="light"] .nav-active-bg {
          background: rgba(0, 0, 0, 0.08);
          border-color: rgba(0, 0, 0, 0.14);
        }

        @keyframes pillSpring {
          0%   { transform: scale(0.6); opacity: 0; }
          70%  { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1);   opacity: 1; }
        }

        .nav-icon-wrap svg {
          position: relative;
          z-index: 1;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .nav-btn.active .nav-icon-wrap svg {
          transform: translateY(-1px) scale(1.05);
        }

        .nav-label {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.03em;
          transition: color 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .nav-btn.active .nav-label {
          color: var(--text-primary);
        }
      `}</style>
    </nav>
  );
};

export default BottomNavigation;
