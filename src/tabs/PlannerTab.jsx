import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { CheckSquare, Plus, Trash2, X, Calendar, Clock, Flame, AlertCircle } from 'lucide-react';
import TimelineCard from '../components/TimelineCard';

const PlannerTab = () => {
  const { actions, addAction, deleteAction, completeAction } = useContext(AppContext);
  
  // Add Task Drawer state
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskEstTime, setTaskEstTime] = useState('30 mins');
  const [taskDeadline, setTaskDeadline] = useState('Today, 11:59 PM');
  const [customDateTime, setCustomDateTime] = useState('');

  const handleAddTaskSubmit = (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    const finalDeadline = customDateTime ? formatDateString(customDateTime) : taskDeadline;
    addAction(taskTitle, taskEstTime, finalDeadline);
    setTaskTitle('');
    setTaskEstTime('30 mins');
    setTaskDeadline('Today, 11:59 PM');
    setCustomDateTime('');
    setTaskModalOpen(false);
  };

  const formatDateString = (dateTimeStr) => {
    try {
      const dt = new Date(dateTimeStr);
      if (isNaN(dt.getTime())) return dateTimeStr;
      return dt.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ', ' + dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return dateTimeStr;
    }
  };

  const getDeadlineBadgeClass = (dl) => {
    if (!dl) return 'upcoming';
    const lower = dl.toLowerCase();
    if (lower.includes('today') || lower.includes('overdue') || lower.includes('urgent')) return 'urgent';
    if (lower.includes('tomorrow')) return 'warning';
    return 'upcoming';
  };

  const pendingActions = actions.filter(a => !a.completed);
  const completedActions = actions.filter(a => a.completed);

  return (
    <div className="content-area planner-tab">
      <div className="planner-header">
        <h2 className="text-title">Academic Planner</h2>
        <p className="text-desc">Plan and manage your daily engineering To-Do tasks.</p>
      </div>

      {/* To-Do List Card */}
      <div className="premium-card planner-card">
        <div className="card-header-with-action">
          <h3 className="text-subtitle">To-Do List</h3>
          <button onClick={() => setTaskModalOpen(true)} className="add-mini-btn">
            <Plus size={13} />
            <span>Add Task</span>
          </button>
        </div>
        
        <div className="actions-list">
          {pendingActions.length === 0 ? (
            <div className="empty-planner-state">
              <span>All tasks completed! Click "+ Add Task" to add a new item to your To-Do list.</span>
            </div>
          ) : (
            pendingActions.map(action => {
              const badgeClass = getDeadlineBadgeClass(action.deadline);
              return (
                <div key={action.id} className="planner-action-item">
                  <div className="action-info">
                    <span className="action-title-text">{action.title}</span>
                    <div className="action-meta-row">
                      <span className="meta-time">{action.estimatedTime}</span>
                      <span>&bull;</span>
                      <span className={`meta-deadline-pill ${badgeClass}`}>
                        {badgeClass === 'urgent' ? (
                          <Flame size={10} />
                        ) : badgeClass === 'warning' ? (
                          <Clock size={10} />
                        ) : (
                          <Calendar size={10} />
                        )}
                        <span>Due {action.deadline}</span>
                      </span>
                    </div>
                  </div>
                  
                  <div className="action-item-btns">
                    <button 
                      onClick={() => deleteAction(action.id)}
                      className="delete-task-btn"
                      title="Delete To-Do Task"
                    >
                      <Trash2 size={13} />
                    </button>
                    <button 
                      onClick={() => completeAction(action.id)}
                      className="complete-circle-btn"
                      title="Mark Completed"
                    >
                      <CheckSquare size={16} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {completedActions.length > 0 && (
          <div className="completed-actions-section">
            <span className="completed-header">Completed Tasks ({completedActions.length})</span>
            <div className="completed-list">
              {completedActions.map(a => (
                <div key={a.id} className="completed-task-row">
                  <span className="completed-task-title">{a.title}</span>
                  <button onClick={() => deleteAction(a.id)} className="delete-task-btn">
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Timeline Section */}
      <TimelineCard />

      {/* Add Task Drawer */}
      {taskModalOpen && (
        <div className="modal-overlay" onClick={() => setTaskModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-handle"></div>
            <div className="modal-header-simple">
              <h3>Add Item to To-Do List</h3>
              <button className="modal-close" onClick={() => setTaskModalOpen(false)}>
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleAddTaskSubmit} className="submodal-form">
              <div className="form-field">
                <label className="form-label">Task Title</label>
                <input
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="e.g., Finish Thermodynamics Lab Report"
                  className="input-premium"
                  required
                  autoFocus
                />
              </div>

              <div className="form-group-row">
                <div className="form-field">
                  <label className="form-label">Estimated Time</label>
                  <input
                    type="text"
                    value={taskEstTime}
                    onChange={(e) => setTaskEstTime(e.target.value)}
                    placeholder="e.g., 45 mins"
                    className="input-premium"
                    required
                  />
                </div>
              </div>

              {/* Improved Deadline Selection */}
              <div className="form-field">
                <label className="form-label">Deadline & Target Due Date</label>
                
                {/* 1-Tap Presets */}
                <div className="deadline-presets-row">
                  <button 
                    type="button" 
                    onClick={() => { setTaskDeadline('Today, 11:59 PM'); setCustomDateTime(''); }} 
                    className={`deadline-preset-btn ${taskDeadline.includes('Today') ? 'active urgent' : ''}`}
                  >
                    ⚡ Today
                  </button>
                  <button 
                    type="button" 
                    onClick={() => { setTaskDeadline('Tomorrow, 9 AM'); setCustomDateTime(''); }} 
                    className={`deadline-preset-btn ${taskDeadline.includes('Tomorrow') ? 'active warning' : ''}`}
                  >
                    🌅 Tomorrow
                  </button>
                  <button 
                    type="button" 
                    onClick={() => { setTaskDeadline('This Weekend'); setCustomDateTime(''); }} 
                    className={`deadline-preset-btn ${taskDeadline.includes('Weekend') ? 'active' : ''}`}
                  >
                    📅 Weekend
                  </button>
                  <button 
                    type="button" 
                    onClick={() => { setTaskDeadline('Next Week'); setCustomDateTime(''); }} 
                    className={`deadline-preset-btn ${taskDeadline.includes('Next Week') ? 'active' : ''}`}
                  >
                    ⏳ Next Week
                  </button>
                </div>

                {/* Text / Date Input options */}
                <div className="deadline-inputs-group">
                  <input
                    type="text"
                    value={taskDeadline}
                    onChange={(e) => { setTaskDeadline(e.target.value); setCustomDateTime(''); }}
                    placeholder="Or type custom deadline (e.g., Aug 10, 5 PM)"
                    className="input-premium"
                    required
                  />
                  <input
                    type="datetime-local"
                    value={customDateTime}
                    onChange={(e) => { setCustomDateTime(e.target.value); setTaskDeadline(formatDateString(e.target.value)); }}
                    className="input-premium date-picker-input"
                    title="Pick exact date and time"
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary submodal-btn">
                <span>Add Task to List</span>
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .planner-header {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .card-header-with-action {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .add-mini-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: var(--text-primary);
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 10px;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .add-mini-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .planner-card {
          gap: var(--space-md);
        }

        .actions-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .planner-action-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--space-md);
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 14px;
          transition: all var(--transition-fast);
        }

        .planner-action-item:hover {
          background: rgba(255, 255, 255, 0.02);
          border-color: rgba(255, 255, 255, 0.06);
        }

        .action-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .action-title-text {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .action-meta-row {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: var(--text-muted);
        }

        .meta-deadline-pill {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 10px;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 6px;
          border: 1px solid transparent;
        }

        .meta-deadline-pill.urgent {
          background: var(--accent-red-glowing);
          color: var(--accent-red);
          border-color: rgba(224, 92, 92, 0.2);
        }

        .meta-deadline-pill.warning {
          background: var(--accent-gold-glowing);
          color: var(--accent-gold);
          border-color: rgba(197, 168, 128, 0.2);
        }

        .meta-deadline-pill.upcoming {
          background: rgba(255, 255, 255, 0.03);
          color: var(--text-secondary);
          border-color: rgba(255, 255, 255, 0.05);
        }

        .deadline-presets-row {
          display: flex;
          gap: 6px;
          overflow-x: auto;
          padding-bottom: 2px;
        }

        .deadline-preset-btn {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          color: var(--text-secondary);
          font-size: 11px;
          font-weight: 500;
          padding: 6px 10px;
          border-radius: 8px;
          cursor: pointer;
          white-space: nowrap;
          transition: all var(--transition-fast);
        }

        .deadline-preset-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-primary);
        }

        .deadline-preset-btn.active {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
          color: var(--text-primary);
          font-weight: 600;
        }

        .deadline-preset-btn.active.urgent {
          background: rgba(224, 92, 92, 0.15);
          border-color: rgba(224, 92, 92, 0.3);
          color: var(--accent-red);
        }

        .deadline-preset-btn.active.warning {
          background: rgba(197, 168, 128, 0.15);
          border-color: rgba(197, 168, 128, 0.3);
          color: var(--accent-gold);
        }

        .deadline-inputs-group {
          display: flex;
          gap: 8px;
          margin-top: 6px;
        }

        .date-picker-input {
          max-width: 140px;
          color-scheme: dark;
        }

        .action-item-btns {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .delete-task-btn {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: color var(--transition-fast);
        }

        .delete-task-btn:hover {
          color: var(--accent-red);
        }

        .complete-circle-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          transition: color var(--transition-fast);
        }

        .complete-circle-btn:hover {
          color: var(--accent-green);
        }

        .empty-planner-state {
          padding: var(--space-md) 0;
          text-align: center;
          font-size: 12px;
          color: var(--text-secondary);
        }

        .completed-actions-section {
          margin-top: var(--space-xs);
          padding-top: var(--space-md);
          border-top: 1px solid rgba(255, 255, 255, 0.03);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .completed-header {
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--text-muted);
          letter-spacing: 0.04em;
        }

        .completed-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .completed-task-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          color: var(--text-muted);
          text-decoration: line-through;
        }
      `}</style>
    </div>
  );
};

export default PlannerTab;
