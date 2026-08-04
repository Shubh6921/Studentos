import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { BookOpen, Droplet, Dumbbell, Wind, Moon, Code, Brain, Flame, Zap, Check } from 'lucide-react';

const iconMap = {
  BookOpen,
  Droplet,
  Dumbbell,
  Wind,
  Moon,
  Code,
  Brain,
  Flame,
  Zap,
  Check
};

const HabitCircle = () => {
  const { habits, toggleHabit } = useContext(AppContext);

  return (
    <div className="premium-card habits-card">
      <h3 className="text-subtitle">Daily Habits</h3>
      
      <div className="habits-row">
        {habits.map((habit) => {
          const IconComponent = iconMap[habit.icon] || Check;
          return (
            <div key={habit.id} className="habit-container">
              <button
                onClick={() => toggleHabit(habit.id)}
                className={`habit-circle ${habit.completed ? 'completed' : ''}`}
                aria-label={`Mark ${habit.name} as completed`}
              >
                {habit.completed && <div className="ripple-effect"></div>}
                <IconComponent 
                  size={20} 
                  className="habit-icon"
                  strokeWidth={habit.completed ? 2.5 : 1.8} 
                />
              </button>
              <span className="habit-name">{habit.name}</span>
            </div>
          );
        })}
      </div>

      <style>{`
        .habits-card {
          gap: var(--space-md);
          overflow: visible;
        }

        .habits-row {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          gap: var(--space-md);
          overflow-x: auto;
          overflow-y: visible;
          padding: 12px 6px 6px 6px;
          margin: -12px -6px -6px -6px;
          scrollbar-width: none;
        }

        .habits-row::-webkit-scrollbar {
          display: none;
        }

        .habit-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-xs);
          min-width: 60px;
        }

        .habit-circle {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          cursor: pointer;
          position: relative;
          transition: all var(--transition-fast);
        }

        .habit-circle:hover {
          background: rgba(255, 255, 255, 0.03);
          border-color: rgba(255, 255, 255, 0.12);
          color: var(--text-primary);
          transform: scale(1.05);
        }

        .habit-circle.completed {
          background: var(--text-primary);
          border-color: var(--text-primary);
          color: var(--bg-primary);
          box-shadow: 0 0 14px rgba(255, 255, 255, 0.15);
        }

        .ripple-effect {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.4);
          animation: habitRipple 0.6s ease-out forwards;
          pointer-events: none;
        }

        @keyframes habitRipple {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.35); opacity: 0; }
        }

        .habit-name {
          font-size: 11px;
          font-weight: 500;
          color: var(--text-secondary);
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default HabitCircle;
