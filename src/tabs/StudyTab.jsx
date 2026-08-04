import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import FocusTimer from '../components/FocusTimer';
import { FileText, Clipboard, Clock, ExternalLink } from 'lucide-react';

const StudyTab = () => {
  const { notes } = useContext(AppContext);

  return (
    <div className="content-area study-tab">
      <div className="study-header">
        <h2 className="text-title">Study Sanctuary</h2>
        <p className="text-desc">Launch deep study sessions and organize thoughts.</p>
      </div>

      {/* Focus Timer core widget */}
      <FocusTimer />

      {/* Quick Notes section */}
      <div className="premium-card study-notes-card">
        <div className="notes-header-row">
          <h3 className="text-subtitle">Quick Notes</h3>
          <span className="notes-count-badge">{notes.length} Active</span>
        </div>

        <div className="notes-list">
          {notes.length === 0 ? (
            <div className="empty-notes-state">
              <Clipboard size={20} className="empty-notes-icon" />
              <p className="empty-notes-text">
                Capture quick equations, formulas, or note fragments using the persistent + action button.
              </p>
            </div>
          ) : (
            notes.map(note => (
              <div key={note.id} className="note-item">
                <p className="note-content">{note.content}</p>
                <div className="note-meta">
                  <Clock size={10} />
                  <span>Captured at {note.timestamp}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Future scalability: flashcards & PDFs mock */}
      <div className="premium-card future-modules-teaser">
        <h3 className="text-subtitle">Future Capabilities</h3>
        <div className="teaser-grid">
          <div className="teaser-pill">AI Notes</div>
          <div className="teaser-pill">PDF Scanner</div>
          <div className="teaser-pill">Flashcards</div>
        </div>
      </div>

      <style>{`
        .study-header {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .notes-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .notes-count-badge {
          font-size: 10px;
          font-weight: 600;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 2px 8px;
          border-radius: 10px;
        }

        .notes-list {
          display: flex;
          flex-direction: column;
          max-height: 280px;
          overflow-y: auto;
          gap: 12px;
          padding-right: 4px;
        }

        .note-item {
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .note-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .note-content {
          font-size: 13px;
          line-height: 1.5;
          color: var(--text-primary);
        }

        .note-meta {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 10px;
          color: var(--text-muted);
        }

        .empty-notes-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          text-align: center;
          padding: var(--space-lg) 0;
          color: var(--text-secondary);
        }

        .empty-notes-icon {
          color: var(--text-muted);
        }

        .empty-notes-text {
          font-size: 12px;
          line-height: 1.6;
          max-width: 260px;
        }

        /* Teaser grid styles */
        .teaser-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 4px;
        }

        .teaser-pill {
          font-size: 11px;
          font-weight: 500;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.01);
          border: 1px dashed rgba(255, 255, 255, 0.05);
          padding: 6px 12px;
          border-radius: 8px;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default StudyTab;
