import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  Plus, X, CheckSquare, Calendar, Feather, Clock, FileText, DollarSign, Mic, CheckCircle, Radio, BookOpen, Sun, Moon
} from 'lucide-react';

const QuickActionFAB = () => {
  const { 
    addNote, 
    addExpense, 
    logAttendance, 
    markAllAttendanceAttended,
    startFocus, 
    completeAction,
    actions,
    attendance,
    saveJournal,
    journal
  } = useContext(AppContext);

  const [isOpen, setIsOpen] = useState(false);
  const [activeSubModal, setActiveSubModal] = useState(null); // 'attendance', 'task', 'note', 'expense', 'voicememo'
  const [allAttendedSuccess, setAllAttendedSuccess] = useState(false);

  // Local Form states
  const [noteText, setNoteText] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskEst, setTaskEst] = useState('30 mins');
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordComplete, setRecordComplete] = useState(false);

  // Journal drawer state
  const [journalType, setJournalType] = useState(() => {
    const h = new Date().getHours();
    return h >= 17 || h < 5 ? 'evening' : 'morning';
  });
  const [journalText, setJournalText] = useState('');
  const [journalSaved, setJournalSaved] = useState(false);

  const JOURNAL_PROMPTS = {
    morning: [
      "What's the ONE thing I must accomplish today?",
      "What am I grateful for right now?",
      "What would make today feel like a win?",
    ],
    evening: [
      "What went well today?",
      "What did I struggle with and learn?",
      "What will I do differently tomorrow?",
    ],
  };

  const handleOpenJournal = () => {
    const type = new Date().getHours() >= 17 ? 'evening' : 'morning';
    setJournalType(type);
    setJournalText(journal[type] || '');
    setJournalSaved(false);
    setIsOpen(false);
    setActiveSubModal('journal');
  };

  const handleJournalTypeSwitch = (type) => {
    setJournalType(type);
    setJournalText(journal[type] || '');
    setJournalSaved(false);
  };

  const handleJournalSave = () => {
    if (!journalText.trim()) return;
    saveJournal(journalType, journalText);
    setJournalSaved(true);
    setTimeout(() => {
      setJournalSaved(false);
      setActiveSubModal(null);
    }, 1500);
  };

  const injectJournalPrompt = (p) => {
    setJournalText(prev => prev ? prev + '\n\n' + p + '\n' : p + '\n');
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (isOpen) setActiveSubModal(null);
  };

  const handleActionClick = (actionType) => {
    if (actionType === 'timer') {
      setIsOpen(false);
      setActiveSubModal(null);
      startFocus(25); // Start a 25m focus timer
    } else if (actionType === 'attendance') {
      setActiveSubModal('attendance');
      setIsOpen(true); // Keep speed dial pill active and visible on right
    } else {
      setIsOpen(false);
      setActiveSubModal(actionType);
    }
  };

  const handleCloseAttendance = () => {
    setActiveSubModal(null);
    setIsOpen(false);
  };

  const handleMarkAllAttended = () => {
    markAllAttendanceAttended();
    setAllAttendedSuccess(true);
    setTimeout(() => {
      setAllAttendedSuccess(false);
      handleCloseAttendance();
    }, 1000);
  };

  const handleAddNoteSubmit = (e) => {
    e.preventDefault();
    addNote(noteText);
    setNoteText('');
    setActiveSubModal(null);
  };

  const handleAddTaskSubmit = (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    addAction(taskTitle, taskEst, 'Today');
    setTaskTitle('');
    setTaskEst('30 mins');
    setActiveSubModal(null);
  };

  const handleAddExpenseSubmit = (e) => {
    e.preventDefault();
    addExpense(expenseTitle, expenseAmount);
    setExpenseTitle('');
    setExpenseAmount('');
    setActiveSubModal(null);
  };

  const handleAddAttendance = (subject, attended) => {
    logAttendance(subject, attended);
  };

  const handleSimulateVoiceMemo = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setRecordComplete(true);
      setTimeout(() => {
        setRecordComplete(false);
        setActiveSubModal(null);
      }, 1500);
    }, 3000);
  };

  return (
    <div className="quick-action-fab-container">
      {/* Speed Dial Pill Stack (Localized Slide-up Stack directly above FAB) */}
      {isOpen && (
        <div className="speed-dial-stack">
          <button 
            onClick={() => handleActionClick('timer')} 
            className={`speed-dial-pill ${activeSubModal === 'timer' ? 'active' : ''}`}
          >
            <Clock size={16} className="pill-icon gold" />
            <span className="pill-text">Focus Timer</span>
          </button>

          <button 
            onClick={() => handleActionClick('attendance')} 
            className={`speed-dial-pill ${activeSubModal === 'attendance' ? 'active' : ''}`}
          >
            <CheckCircle size={16} className="pill-icon green" />
            <span className="pill-text">Attendance</span>
          </button>

          <button 
            onClick={() => handleActionClick('note')} 
            className={`speed-dial-pill ${activeSubModal === 'note' ? 'active' : ''}`}
          >
            <FileText size={16} className="pill-icon blue" />
            <span className="pill-text">Quick Note</span>
          </button>

          <button 
            onClick={handleOpenJournal} 
            className={`speed-dial-pill ${activeSubModal === 'journal' ? 'active' : ''}`}
          >
            <BookOpen size={16} className="pill-icon teal" />
            <span className="pill-text">Journal</span>
          </button>

          <button 
            onClick={() => handleActionClick('voicememo')} 
            className={`speed-dial-pill ${activeSubModal === 'voicememo' ? 'active' : ''}`}
          >
            <Mic size={16} className="pill-icon purple" />
            <span className="pill-text">Voice Memo</span>
          </button>
        </div>
      )}

      {/* Main Trigger FAB */}
      <button 
        onClick={handleToggle}
        className={`main-fab-trigger ${isOpen ? 'open' : ''}`}
        aria-label="Quick Action Control Hub"
      >
        {isOpen ? <X size={22} /> : <Plus size={22} />}
      </button>

      {/* Bottom Sub-modals & Drawers */}
      {activeSubModal === 'note' && (
        <div className="modal-overlay" onClick={() => setActiveSubModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-handle"></div>
            <div className="modal-header-simple">
              <h3>Quick Note</h3>
              <button className="modal-close" onClick={() => setActiveSubModal(null)}><X size={16} /></button>
            </div>
            <form onSubmit={handleAddNoteSubmit} className="submodal-form">
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Jot down quick thoughts, formulas, or reminders..."
                className="textarea-premium"
                rows={4}
                required
                autoFocus
              ></textarea>
              <button type="submit" className="btn-primary submodal-btn">Save Note</button>
            </form>
          </div>
        </div>
      )}

      {activeSubModal === 'expense' && (
        <div className="modal-overlay" onClick={() => setActiveSubModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-handle"></div>
            <div className="modal-header-simple">
              <h3>Log Expense</h3>
              <button className="modal-close" onClick={() => setActiveSubModal(null)}><X size={16} /></button>
            </div>
            <form onSubmit={handleAddExpenseSubmit} className="submodal-form">
              <input
                type="text"
                value={expenseTitle}
                onChange={(e) => setExpenseTitle(e.target.value)}
                placeholder="Expense (e.g., Lab Manual, Coffee)"
                className="input-premium"
                required
                autoFocus
              />
              <input
                type="number"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                placeholder="Amount (₹)"
                className="input-premium"
                required
              />
              <button type="submit" className="btn-primary submodal-btn">Log Expense</button>
            </form>
          </div>
        </div>
      )}

      {/* Left-Aligned Attendance Check-in Popover */}
      {activeSubModal === 'attendance' && (
        <div className="popover-backdrop" onClick={handleCloseAttendance}>
          <div className="attendance-popover-card" onClick={(e) => e.stopPropagation()}>
            <div className="popover-arrow-right"></div>
            <div className="modal-header-simple">
              <h3>Check-in Attendance</h3>
              <button className="modal-close" onClick={handleCloseAttendance}><X size={16} /></button>
            </div>

            {/* Single 1-Tap Option to Mark All Courses Attended */}
            <button 
              onClick={handleMarkAllAttended}
              className={`mark-all-attended-btn ${allAttendedSuccess ? 'success' : ''}`}
            >
              <CheckCircle size={15} />
              <span>{allAttendedSuccess ? 'All Courses Marked Attended!' : 'Mark All Courses Attended'}</span>
            </button>

            <div className="attendance-choices">
              {Object.keys(attendance).map(subj => (
                <div key={subj} className="attendance-choice-row">
                  <span className="choice-subject">{subj}</span>
                  <div className="choice-btns">
                    <button 
                      onClick={() => handleAddAttendance(subj, false)} 
                      className="choice-btn absent"
                    >
                      Missed
                    </button>
                    <button 
                      onClick={() => handleAddAttendance(subj, true)} 
                      className="choice-btn present"
                    >
                      Attended
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeSubModal === 'journal' && (
        <div className="modal-overlay" onClick={() => setActiveSubModal(null)}>
          <div className="modal-content journal-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-handle"></div>
            <div className="modal-header-simple">
              <h3>Daily Journal</h3>
              <button className="modal-close" onClick={() => setActiveSubModal(null)}><X size={16} /></button>
            </div>

            {/* Morning / Evening Toggle */}
            <div className="journal-type-toggle">
              <button
                className={`journal-toggle-btn ${journalType === 'morning' ? 'active' : ''}`}
                onClick={() => handleJournalTypeSwitch('morning')}
              >
                <Sun size={13} />
                <span>Morning</span>
              </button>
              <button
                className={`journal-toggle-btn ${journalType === 'evening' ? 'active' : ''}`}
                onClick={() => handleJournalTypeSwitch('evening')}
              >
                <Moon size={13} />
                <span>Evening</span>
              </button>
            </div>

            {/* Prompt Chips */}
            <div className="journal-prompt-chips">
              {JOURNAL_PROMPTS[journalType].map((p, i) => (
                <button key={i} className="prompt-chip" onClick={() => injectJournalPrompt(p)}>
                  {p}
                </button>
              ))}
            </div>

            {/* Textarea */}
            <textarea
              className="textarea-premium journal-textarea"
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
              placeholder={journalType === 'morning'
                ? 'Set your intentions for the day...'
                : 'Reflect on your day...'}
              rows={5}
              autoFocus
            />

            <button
              className={`btn-primary submodal-btn journal-save-btn ${journalSaved ? 'saved' : ''}`}
              onClick={handleJournalSave}
              disabled={journalSaved}
            >
              {journalSaved ? '✓ Saved!' : 'Save Entry'}
            </button>
          </div>
        </div>
      )}

      {activeSubModal === 'voicememo' && (
        <div className="modal-overlay" onClick={() => setActiveSubModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-handle"></div>
            <div className="modal-header-simple">
              <h3>Voice Recorder</h3>
              <button className="modal-close" onClick={() => setActiveSubModal(null)}><X size={16} /></button>
            </div>
            <div className="voicememo-body">
              {isRecording ? (
                <div className="recording-wave-container">
                  <div className="recording-wave-bar"></div>
                  <div className="recording-wave-bar wave-2"></div>
                  <div className="recording-wave-bar wave-3"></div>
                  <div className="recording-wave-bar wave-4"></div>
                  <div className="recording-wave-bar wave-5"></div>
                  <span className="recording-status">Recording Lecture Audio...</span>
                </div>
              ) : recordComplete ? (
                <div className="recording-complete">
                  <CheckCircle size={32} className="success-icon" />
                  <span>Audio Saved to Local OS</span>
                </div>
              ) : (
                <div className="recording-start-state">
                  <Mic size={40} className="mic-icon-large" />
                  <p className="record-desc">Record equations, lecture concepts, or audio study cards.</p>
                  <button onClick={handleSimulateVoiceMemo} className="btn-primary record-btn">
                    Start Recording
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .quick-action-fab-container {
          position: fixed !important;
          top: auto !important;
          bottom: 80px !important;
          right: 20px !important;
          z-index: 150;
        }

        .main-fab-trigger {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: var(--text-primary);
          color: var(--bg-primary);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(255, 255, 255, 0.15);
          cursor: pointer;
          transition: transform var(--transition-fast), background var(--transition-fast);
          z-index: 160;
        }

        .main-fab-trigger:hover {
          transform: scale(1.06);
        }

        .main-fab-trigger.open {
          background: #25252b;
          color: var(--text-primary);
          transform: rotate(90deg);
        }

        /* Speed Dial Stack (Localized above FAB) */
        .speed-dial-stack {
          position: absolute;
          bottom: 66px;
          right: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
          animation: slideUpStack 0.25s var(--ease-premium);
        }

        @keyframes slideUpStack {
          from { opacity: 0; transform: translateY(12px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .speed-dial-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: var(--bg-card);
          backdrop-filter: var(--blur-glass);
          border: var(--border-premium);
          border-radius: 24px;
          color: var(--text-primary);
          cursor: pointer;
          white-space: nowrap;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
          transition: all var(--transition-fast);
        }

        .speed-dial-pill:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateX(-4px);
        }

        .speed-dial-pill.active {
          border-color: var(--text-primary);
          background: rgba(255, 255, 255, 0.12);
        }

        .pill-icon {
          flex-shrink: 0;
        }

        .pill-icon.gold { color: var(--accent-gold); }
        .pill-icon.green { color: var(--accent-green); }
        .pill-icon.blue { color: var(--accent-blue); }
        .pill-icon.purple { color: #a78bfa; }
        .pill-icon.teal { color: #2dd4bf; }

        .pill-text {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: -0.01em;
        }

        /* Mark All Attended Button */
        .mark-all-attended-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          width: 100%;
          padding: 10px;
          margin-bottom: 12px;
          background: rgba(72, 154, 126, 0.12);
          border: 1px solid rgba(72, 154, 126, 0.25);
          color: var(--accent-green);
          font-size: 12px;
          font-weight: 600;
          border-radius: 12px;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .mark-all-attended-btn:hover {
          background: rgba(72, 154, 126, 0.22);
          border-color: rgba(72, 154, 126, 0.4);
        }

        .mark-all-attended-btn.success {
          background: var(--accent-green);
          color: var(--bg-primary);
          border-color: var(--accent-green);
        }

        /* Submodal Drawers */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(6px);
          z-index: 200;
          display: flex;
          align-items: flex-end;
        }

        .modal-content {
          width: 100%;
          background: var(--bg-card);
          border-top: var(--border-premium);
          border-radius: 20px 20px 0 0;
          padding: var(--space-lg);
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
          animation: slideUp 0.25s var(--ease-premium);
        }

        .drawer-handle {
          width: 36px;
          height: 4px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 2px;
          align-self: center;
          margin-bottom: 4px;
        }

        .modal-header-simple {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-header-simple h3 {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .modal-close {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
        }

        .submodal-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .submodal-btn {
          height: 44px;
          font-size: 14px;
          margin-top: 4px;
        }

        .attendance-choices {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .attendance-choice-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
        }

        .attendance-choice-row:last-child {
          border-bottom: none;
        }

        .choice-subject {
          font-size: 13px;
          font-weight: 500;
          color: var(--text-primary);
        }

        .choice-btns {
          display: flex;
          gap: 6px;
        }

        .choice-btn {
          font-size: 11px;
          font-weight: 600;
          padding: 6px 12px;
          border-radius: 8px;
          border: 1px solid transparent;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .choice-btn.absent {
          background: rgba(224, 92, 92, 0.08);
          color: var(--accent-red);
          border-color: rgba(224, 92, 92, 0.15);
        }

        .choice-btn.present {
          background: rgba(72, 154, 126, 0.08);
          color: var(--accent-green);
          border-color: rgba(72, 154, 126, 0.15);
        }

        .voicememo-body {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: var(--space-xl) 0;
        }

        .recording-start-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          text-align: center;
        }

        .mic-icon-large {
          color: #a78bfa;
        }

        .record-desc {
          font-size: 12px;
          color: var(--text-secondary);
          max-width: 240px;
        }

        .record-btn {
          width: 180px;
          height: 42px;
          margin-top: 8px;
        }

        .recording-wave-container {
          display: flex;
          align-items: center;
          gap: 6px;
          height: 80px;
        }

        .recording-wave-bar {
          width: 4px;
          height: 40px;
          background: #a78bfa;
          border-radius: 2px;
          animation: wave 1s infinite ease-in-out;
        }

        .wave-2 { animation-delay: 0.2s; }
        .wave-3 { animation-delay: 0.4s; }
        .wave-4 { animation-delay: 0.6s; }
        .wave-5 { animation-delay: 0.8s; }

        @keyframes wave {
          0%, 100% { height: 20px; }
          50% { height: 60px; }
        }

        .recording-status {
          margin-top: 16px;
          font-size: 13px;
          color: var(--text-primary);
        }

        .recording-complete {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: var(--accent-green);
        }

        /* ── Journal Drawer ─────────────────────── */
        .journal-drawer {
          max-height: 88vh;
          overflow-y: auto;
        }

        .journal-type-toggle {
          display: flex;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 12px;
          padding: 3px;
          gap: 3px;
        }

        .journal-toggle-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 8px 0;
          border-radius: 9px;
          border: none;
          background: transparent;
          color: var(--text-muted);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .journal-toggle-btn.active {
          background: var(--bg-primary);
          color: var(--text-primary);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .journal-prompt-chips {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .prompt-chip {
          text-align: left;
          padding: 8px 12px;
          background: rgba(45, 212, 191, 0.06);
          border: 1px solid rgba(45, 212, 191, 0.15);
          border-radius: 10px;
          color: var(--text-secondary);
          font-size: 11.5px;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition-fast);
          line-height: 1.4;
        }

        .prompt-chip:hover {
          background: rgba(45, 212, 191, 0.12);
          color: #2dd4bf;
          border-color: rgba(45, 212, 191, 0.3);
        }

        .journal-textarea {
          resize: none;
          font-size: 13.5px;
          line-height: 1.65;
        }

        .journal-save-btn {
          transition: all var(--transition-fast);
        }

        .journal-save-btn.saved {
          background: var(--accent-green) !important;
          color: var(--bg-primary) !important;
        }
      `}</style>
    </div>
  );
};

export default QuickActionFAB;
