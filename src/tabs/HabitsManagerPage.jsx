import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  BookOpen, Droplet, Dumbbell, Wind, Moon, Zap, Brain, Code, Flame, 
  Check, ArrowLeft, Plus, Trash2, Edit3, Save, Sparkles 
} from 'lucide-react';

const iconOptions = [
  { id: 'BookOpen', label: 'Study', icon: BookOpen },
  { id: 'Droplet', label: 'Water', icon: Droplet },
  { id: 'Dumbbell', label: 'Fitness', icon: Dumbbell },
  { id: 'Wind', label: 'Meditation', icon: Wind },
  { id: 'Moon', label: 'Sleep', icon: Moon },
  { id: 'Code', label: 'Coding', icon: Code },
  { id: 'Brain', label: 'Focus', icon: Brain },
  { id: 'Flame', label: 'Streak', icon: Flame },
  { id: 'Zap', label: 'Energy', icon: Zap }
];

const iconMap = {
  BookOpen, Droplet, Dumbbell, Wind, Moon, Code, Brain, Flame, Zap, Check
};

const HabitsManagerPage = () => {
  const { habits, addHabit, updateHabit, deleteHabit, setActiveTab } = useContext(AppContext);
  
  // New Habit State
  const [newHabitName, setNewHabitName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('BookOpen');

  // Edit inline habit state ({ [id]: name })
  const [editingNames, setEditingNames] = useState({});

  const handleNameChange = (id, val) => {
    setEditingNames(prev => ({ ...prev, [id]: val }));
  };

  const handleSaveName = (id) => {
    const newName = editingNames[id];
    if (newName !== undefined && newName.trim()) {
      updateHabit(id, newName.trim(), null);
    }
  };

  const handleIconChange = (id, newIcon) => {
    updateHabit(id, undefined, newIcon);
  };

  const handleCreateHabit = (e) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;
    addHabit(newHabitName.trim(), selectedIcon);
    setNewHabitName('');
  };

  return (
    <div className="content-area habits-manager-page">
      {/* Navigation Top Bar */}
      <div className="manager-top-bar">
        <button onClick={() => setActiveTab('dashboard')} className="back-btn">
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </button>
      </div>

      <div className="manager-header">
        <h2 className="text-title">Habits Manager</h2>
        <p className="text-desc">Customize your daily routine items, edit habit names, and pick icons.</p>
      </div>

      {/* Add New Habit Form */}
      <div className="premium-card add-habit-card">
        <div className="card-header-simple">
          <Sparkles size={16} className="sparkle-icon" />
          <h3 className="text-subtitle">Add New Routine Habit</h3>
        </div>

        <form onSubmit={handleCreateHabit} className="create-habit-form">
          <div className="form-field">
            <label className="form-label">Habit Name</label>
            <input
              type="text"
              value={newHabitName}
              onChange={(e) => setNewHabitName(e.target.value)}
              placeholder="e.g., LeetCode 1 Problem, Morning Run, Read 10 Pages"
              className="input-premium"
              required
            />
          </div>

          <div className="form-field">
            <label className="form-label">Choose Icon</label>
            <div className="icon-selector-grid">
              {iconOptions.map(opt => {
                const Icon = opt.icon;
                const isSelected = selectedIcon === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedIcon(opt.id)}
                    className={`icon-opt-btn ${isSelected ? 'selected' : ''}`}
                    title={opt.label}
                  >
                    <Icon size={18} />
                  </button>
                );
              })}
            </div>
          </div>

          <button type="submit" className="btn-primary add-habit-submit-btn">
            <Plus size={15} />
            <span>Add Habit to Routine</span>
          </button>
        </form>
      </div>

      {/* Habits List Manager */}
      <div className="premium-card habits-list-card">
        <h3 className="text-subtitle">Active Habits ({habits.length})</h3>

        <div className="habits-edit-list">
          {habits.map((habit) => {
            const CurrentIcon = iconMap[habit.icon] || Check;
            const currentEditingVal = editingNames[habit.id] !== undefined ? editingNames[habit.id] : habit.name;

            return (
              <div key={habit.id} className="habit-edit-row">
                {/* Icon preview & picker popover */}
                <div className="habit-icon-picker">
                  <div className="current-icon-badge">
                    <CurrentIcon size={20} />
                  </div>
                  <div className="mini-icon-dropdown">
                    {iconOptions.map(opt => {
                      const OptIcon = opt.icon;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleIconChange(habit.id, opt.id)}
                          className={`mini-icon-btn ${habit.icon === opt.id ? 'active' : ''}`}
                          title={`Change to ${opt.label}`}
                        >
                          <OptIcon size={13} />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name Edit Input */}
                <div className="habit-name-edit-col">
                  <input
                    type="text"
                    value={currentEditingVal}
                    onChange={(e) => handleNameChange(habit.id, e.target.value)}
                    onBlur={() => handleSaveName(habit.id)}
                    className="input-premium habit-rename-input"
                  />
                </div>

                {/* Actions */}
                <div className="habit-row-actions">
                  <button 
                    onClick={() => handleSaveName(habit.id)}
                    className="save-habit-btn"
                    title="Save habit name"
                  >
                    <Save size={14} />
                  </button>

                  {habits.length > 1 && (
                    <button 
                      onClick={() => deleteHabit(habit.id)} 
                      className="delete-habit-icon-btn"
                      title="Delete habit"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .habits-manager-page {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }

        .manager-top-bar {
          display: flex;
          align-items: center;
          margin-bottom: -4px;
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: var(--text-primary);
          font-size: 12px;
          font-weight: 600;
          padding: 8px 14px;
          border-radius: 12px;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .back-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .manager-header {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .card-header-simple {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .sparkle-icon {
          color: var(--accent-gold);
        }

        .create-habit-form {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }

        .icon-selector-grid {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 4px;
        }

        .icon-opt-btn {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: all var(--transition-fast);
        }

        .icon-opt-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-primary);
        }

        .icon-opt-btn.selected {
          background: var(--text-primary);
          border-color: var(--text-primary);
          color: var(--bg-primary);
        }

        .add-habit-submit-btn {
          width: 100%;
          height: 44px;
          border-radius: 12px;
        }

        .habits-edit-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .habit-edit-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 16px;
        }

        .habit-icon-picker {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          position: relative;
        }

        .current-icon-badge {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
        }

        .mini-icon-dropdown {
          display: flex;
          gap: 4px;
          flex-wrap: wrap;
          max-width: 110px;
          justify-content: center;
        }

        .mini-icon-btn {
          width: 20px;
          height: 20px;
          border-radius: 4px;
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color var(--transition-fast);
        }

        .mini-icon-btn:hover {
          color: var(--text-primary);
        }

        .mini-icon-btn.active {
          color: var(--accent-gold);
        }

        .habit-name-edit-col {
          flex: 1;
        }

        .habit-rename-input {
          font-weight: 500;
        }

        .habit-row-actions {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .save-habit-btn, .delete-habit-icon-btn {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 6px;
          border-radius: 6px;
          transition: color var(--transition-fast);
        }

        .save-habit-btn:hover {
          color: var(--text-primary);
        }

        .delete-habit-icon-btn:hover {
          color: var(--accent-red);
        }
      `}</style>
    </div>
  );
};

export default HabitsManagerPage;
