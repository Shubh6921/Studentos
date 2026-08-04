import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { BookOpen, Check, Feather, X } from 'lucide-react';

const JournalCard = () => {
  const { timeOfDay, journal, saveJournal } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  
  // Decide which journal is relevant
  const currentHour = new Date().getHours();
  let type = 'morning';
  let title = 'Morning Reflection';
  let subtitle = 'Set your intentions for today\'s engineering tasks.';
  
  if (currentHour >= 12 && currentHour < 18) {
    // Afternoon
    if (!journal.completedToday.morning) {
      type = 'morning';
      title = 'Missed Morning Reflection';
      subtitle = 'Better late than never. Log your morning alignment.';
    } else {
      // Show teaser / status
      type = 'teaser';
      title = 'Afternoon Breather';
      subtitle = 'Classes are active. Evening reflection opens at 6:00 PM.';
    }
  } else if (currentHour >= 18 || currentHour < 5) {
    // Evening / Night
    type = 'evening';
    title = 'Evening Reflection';
    subtitle = 'Decompress. What went well? What will you adjust tomorrow?';
  }

  const isCompleted = type === 'teaser' || (type === 'morning' && journal.completedToday.morning) || (type === 'evening' && journal.completedToday.evening);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    saveJournal(type, text);
    setText('');
    setIsOpen(false);
  };

  const handleOpen = () => {
    if (type === 'teaser') return;
    setIsOpen(true);
    // Prefill text if already typed
    setText(journal[type] || '');
  };

  return (
    <>
      <div 
        className={`premium-card journal-card ${isCompleted ? 'completed' : ''}`}
        onClick={handleOpen}
      >
        <div className="journal-header">
          <div className="journal-icon-container">
            <Feather size={16} />
          </div>
          <div className="journal-meta">
            <h4 className="journal-title">{title}</h4>
            <p className="journal-subtitle">{subtitle}</p>
          </div>
        </div>

        {isCompleted && type !== 'teaser' && (
          <div className="completed-badge">
            <Check size={12} />
            <span>Logged</span>
          </div>
        )}

        <style>{`
          .journal-card {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            border: 1px solid rgba(255, 255, 255, 0.04);
          }

          .journal-card.completed {
            background: rgba(10, 10, 12, 0.4);
            border-color: rgba(255, 255, 255, 0.02);
            cursor: default;
          }

          .journal-header {
            display: flex;
            align-items: center;
            gap: var(--space-md);
            flex: 1;
          }

          .journal-icon-container {
            width: 38px;
            height: 38px;
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.04);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--text-secondary);
          }

          .journal-card:hover .journal-icon-container {
            color: var(--text-primary);
            border-color: rgba(255, 255, 255, 0.08);
          }

          .journal-meta {
            display: flex;
            flex-direction: column;
            gap: 2px;
          }

          .journal-title {
            font-size: 14px;
            font-weight: 600;
            color: var(--text-primary);
          }

          .journal-subtitle {
            font-size: 11px;
            color: var(--text-secondary);
            max-width: 250px;
          }

          .completed-badge {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 10px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--accent-green);
            background: var(--accent-green-glowing);
            padding: 4px 8px;
            border-radius: 8px;
          }
        `}</style>
      </div>

      {/* Glassmorphic Reflection Overlay */}
      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-content reflection-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 className="modal-title">{title}</h3>
                <p className="modal-subtitle-text">First-year engineering alignment</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="close-btn">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="reflection-form">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={type === 'morning' ? 'What are your goals today? How will you keep stress low...' : 'Review your lectures. What did you learn? What will you do better tomorrow...'}
                className="textarea-premium reflection-textarea"
                autoFocus
                required
              />
              <button type="submit" className="btn-primary submit-btn">
                <span>Save Reflection</span>
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .reflection-modal {
          max-width: 400px;
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .modal-title {
          font-size: 18px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .modal-subtitle-text {
          font-size: 11px;
          color: var(--text-secondary);
        }

        .close-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 4px;
        }

        .close-btn:hover {
          color: var(--text-primary);
        }

        .reflection-form {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }

        .reflection-textarea {
          min-height: 120px;
          line-height: 1.5;
        }

        .submit-btn {
          width: 100%;
          border-radius: 12px;
          height: 46px;
        }
      `}</style>
    </>
  );
};

export default JournalCard;
