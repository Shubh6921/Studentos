import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import {
  ArrowLeft, Sun, Moon, BookOpen, Search, Filter,
  Trash2, Quote, Calendar, Clock, FileText
} from 'lucide-react';

/* ── helpers ── */
const TYPE_META = {
  morning: { icon: Sun,  label: 'Morning',  color: '#C5A880', bg: 'rgba(197,168,128,0.08)', border: 'rgba(197,168,128,0.18)' },
  evening: { icon: Moon, label: 'Evening',  color: '#7097D1', bg: 'rgba(112,151,209,0.08)', border: 'rgba(112,151,209,0.18)' },
};

const excerpt = (text, limit = 160) =>
  text.length > limit ? text.slice(0, limit).trimEnd() + '…' : text;

/* ── component ── */
const JournalEntriesPage = () => {
  const { journal, setJournal, setActiveTab } = useContext(AppContext);

  const entries = (journal.entries || []).slice().sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const [filter, setFilter]   = useState('all');     // 'all' | 'morning' | 'evening'
  const [search, setSearch]   = useState('');
  const [expanded, setExpanded] = useState(null);    // id of expanded entry
  const [deleting, setDeleting] = useState(null);    // id awaiting confirm

  /* filtered list */
  const visible = entries.filter(e => {
    if (filter !== 'all' && e.type !== filter) return false;
    if (search.trim() && !e.text.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleDelete = (id) => {
    setJournal(prev => ({
      ...prev,
      entries: (prev.entries || []).filter(e => e.id !== id)
    }));
    setDeleting(null);
    if (expanded === id) setExpanded(null);
  };

  /* group by date label */
  const grouped = visible.reduce((acc, entry) => {
    const key = entry.dateLabel || 'Unknown Date';
    if (!acc[key]) acc[key] = [];
    acc[key].push(entry);
    return acc;
  }, {});

  return (
    <div className="content-area je-page">

      {/* ── Top Bar ── */}
      <div className="je-topbar">
        <button className="je-back-btn" onClick={() => setActiveTab('journal')}>
          <ArrowLeft size={18} />
        </button>
        <div className="je-topbar-text">
          <h1 className="je-title">Saved Entries</h1>
          <span className="je-count">{entries.length} total</span>
        </div>
      </div>

      {/* ── Search + Filter ── */}
      <div className="je-controls">
        <div className="je-search-wrap">
          <Search size={13} className="je-search-icon" />
          <input
            className="je-search"
            placeholder="Search entries…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="je-filter-pills">
          {['all', 'morning', 'evening'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`je-filter-pill ${filter === f ? 'active' : ''} ${f}`}
            >
              {f === 'all' ? 'All' : f === 'morning' ? '☀ Morning' : '🌙 Evening'}
            </button>
          ))}
        </div>
      </div>

      {/* ── Empty State ── */}
      {visible.length === 0 && (
        <div className="je-empty">
          <div className="je-empty-icon">
            <BookOpen size={28} />
          </div>
          <p className="je-empty-title">
            {search ? 'No entries match your search' : 'No entries yet'}
          </p>
          <p className="je-empty-sub">
            {search
              ? 'Try a different keyword.'
              : 'Save your first journal entry and it will appear here.'}
          </p>
          {!search && (
            <button className="je-empty-cta" onClick={() => setActiveTab('journal')}>
              Write First Entry
            </button>
          )}
        </div>
      )}

      {/* ── Grouped Entries ── */}
      {Object.entries(grouped).map(([dateLabel, group]) => (
        <div key={dateLabel} className="je-date-group">
          <div className="je-date-label">
            <Calendar size={11} />
            <span>{dateLabel}</span>
          </div>

          <div className="je-entries-col">
            {group.map(entry => {
              const meta = TYPE_META[entry.type] || TYPE_META.morning;
              const Icon = meta.icon;
              const isExpanded = expanded === entry.id;
              const isDeleting = deleting === entry.id;

              return (
                <div
                  key={entry.id}
                  className={`je-entry-card ${isExpanded ? 'expanded' : ''}`}
                  style={{ '--entry-color': meta.color, '--entry-bg': meta.bg, '--entry-border': meta.border }}
                >
                  {/* Card Header */}
                  <div
                    className="je-entry-header"
                    onClick={() => setExpanded(isExpanded ? null : entry.id)}
                  >
                    <div className="je-entry-type-badge" style={{ background: meta.bg, border: `1px solid ${meta.border}`, color: meta.color }}>
                      <Icon size={11} />
                      <span>{meta.label}</span>
                    </div>
                    <div className="je-entry-time">
                      <Clock size={10} />
                      <span>{entry.timeLabel}</span>
                    </div>
                  </div>

                  {/* Quote excerpt / full text */}
                  <div
                    className="je-entry-body"
                    onClick={() => setExpanded(isExpanded ? null : entry.id)}
                  >
                    <Quote size={13} className="je-quote-icon" />
                    <p className="je-entry-text">
                      {isExpanded ? entry.text : excerpt(entry.text)}
                    </p>
                  </div>

                  {/* Word count pill */}
                  <div className="je-entry-footer">
                    <span className="je-word-pill">
                      <FileText size={10} />
                      {entry.text.trim().split(/\s+/).filter(Boolean).length} words
                    </span>

                    {/* Expand / Delete controls */}
                    <div className="je-entry-actions">
                      <button
                        className="je-action-btn expand"
                        onClick={() => setExpanded(isExpanded ? null : entry.id)}
                      >
                        {isExpanded ? 'Collapse' : 'Read'}
                      </button>

                      {isDeleting ? (
                        <div className="je-confirm-row">
                          <span className="je-confirm-label">Delete?</span>
                          <button className="je-action-btn confirm-yes" onClick={() => handleDelete(entry.id)}>Yes</button>
                          <button className="je-action-btn confirm-no"  onClick={() => setDeleting(null)}>No</button>
                        </div>
                      ) : (
                        <button
                          className="je-action-btn delete"
                          onClick={(e) => { e.stopPropagation(); setDeleting(entry.id); }}
                        >
                          <Trash2 size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <style>{`
        /* ── Page ── */
        .je-page {
          gap: 20px;
          padding-bottom: 32px;
          animation: fadeIn 0.35s var(--ease-premium);
        }

        /* ── Top Bar ── */
        .je-topbar {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 4px 0 8px;
        }
        .je-back-btn {
          width: 38px; height: 38px;
          display: flex; align-items: center; justify-content: center;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
          flex-shrink: 0;
        }
        .je-back-btn:hover { color: var(--text-primary); border-color: var(--border-color-active); }
        .je-topbar-text { display: flex; flex-direction: column; gap: 2px; }
        .je-title {
          font-size: 24px; font-weight: 600;
          letter-spacing: -0.04em;
          color: var(--text-primary);
          line-height: 1.2;
        }
        .je-count {
          font-size: 11px; font-weight: 500;
          color: var(--text-muted);
          letter-spacing: 0.03em;
        }

        /* ── Controls ── */
        .je-controls { display: flex; flex-direction: column; gap: 10px; }
        .je-search-wrap {
          display: flex; align-items: center; gap: 10px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 0 14px;
          transition: border-color var(--transition-fast);
        }
        .je-search-wrap:focus-within { border-color: var(--border-color-active); }
        .je-search-icon { color: var(--text-muted); flex-shrink: 0; }
        .je-search {
          flex: 1; height: 42px;
          background: transparent; border: none; outline: none;
          color: var(--text-primary);
          font-family: var(--font-sans);
          font-size: 13px;
        }
        .je-search::placeholder { color: var(--text-muted); }

        /* Filter pills */
        .je-filter-pills { display: flex; gap: 8px; }
        .je-filter-pill {
          flex: 1;
          padding: 8px 12px;
          border-radius: 10px;
          border: 1px solid var(--border-color);
          background: var(--bg-card);
          color: var(--text-muted);
          font-size: 11px; font-weight: 500;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .je-filter-pill:hover { color: var(--text-secondary); border-color: var(--border-color-active); }
        .je-filter-pill.active.all     { color: var(--text-primary); border-color: rgba(255,255,255,0.15); background: rgba(255,255,255,0.06); }
        .je-filter-pill.active.morning { color: #C5A880; border-color: rgba(197,168,128,0.3); background: rgba(197,168,128,0.08); }
        .je-filter-pill.active.evening { color: #7097D1; border-color: rgba(112,151,209,0.3); background: rgba(112,151,209,0.08); }
        [data-theme="light"] .je-filter-pill.active.all { background: rgba(0,0,0,0.06); border-color: rgba(0,0,0,0.12); }

        /* ── Empty ── */
        .je-empty {
          display: flex; flex-direction: column; align-items: center;
          gap: 10px; padding: 48px 24px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          text-align: center;
        }
        .je-empty-icon {
          width: 56px; height: 56px;
          border-radius: 16px;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border-color);
          display: flex; align-items: center; justify-content: center;
          color: var(--text-muted);
          margin-bottom: 4px;
        }
        [data-theme="light"] .je-empty-icon { background: rgba(0,0,0,0.03); }
        .je-empty-title { font-size: 16px; font-weight: 600; color: var(--text-primary); }
        .je-empty-sub { font-size: 12px; color: var(--text-muted); line-height: 1.5; }
        .je-empty-cta {
          margin-top: 8px;
          padding: 10px 24px;
          background: var(--text-primary); color: var(--bg-primary);
          border: none; border-radius: 10px;
          font-size: 12px; font-weight: 500;
          letter-spacing: 0.04em; cursor: pointer;
          transition: all var(--transition-fast);
        }
        .je-empty-cta:hover { transform: translateY(-1px); }

        /* ── Date Group ── */
        .je-date-group { display: flex; flex-direction: column; gap: 10px; }
        .je-date-label {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 10px; font-weight: 500;
          letter-spacing: 0.08em; color: var(--text-muted);
          padding-left: 2px;
        }
        .je-entries-col { display: flex; flex-direction: column; gap: 10px; }

        /* ── Entry Card ── */
        .je-entry-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 18px;
          overflow: hidden;
          transition: all var(--transition-fast);
          /* left accent line uses CSS var */
          border-left: 3px solid var(--entry-color, var(--border-color));
        }
        .je-entry-card:hover { border-color: var(--entry-color, var(--border-color-active)); }
        .je-entry-card.expanded { box-shadow: 0 8px 32px rgba(0,0,0,0.25); }
        [data-theme="light"] .je-entry-card.expanded { box-shadow: 0 8px 24px rgba(0,0,0,0.07); }

        /* Header row */
        .je-entry-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 16px 0;
          cursor: pointer;
        }
        .je-entry-type-badge {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 10px; font-weight: 500; letter-spacing: 0.05em;
        }
        .je-entry-time {
          display: flex; align-items: center; gap: 4px;
          font-size: 10px; font-weight: 500; color: var(--text-muted);
        }

        /* Body */
        .je-entry-body {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 12px 16px;
          cursor: pointer;
        }
        .je-quote-icon { color: var(--entry-color); flex-shrink: 0; margin-top: 2px; opacity: 0.6; }
        .je-entry-text {
          font-size: 13px; line-height: 1.65;
          color: var(--text-secondary);
          white-space: pre-wrap;
          word-break: break-word;
          transition: all 0.3s var(--ease-premium);
        }
        .je-entry-card.expanded .je-entry-text { color: var(--text-primary); }

        /* Footer */
        .je-entry-footer {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 16px 14px;
          gap: 10px;
        }
        .je-word-pill {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 10px; font-weight: 500;
          color: var(--text-muted); letter-spacing: 0.02em;
        }
        .je-entry-actions { display: flex; align-items: center; gap: 6px; }
        .je-action-btn {
          padding: 5px 12px;
          border-radius: 8px; border: 1px solid var(--border-color);
          background: transparent;
          font-size: 10px; font-weight: 500; letter-spacing: 0.04em;
          cursor: pointer; transition: all var(--transition-fast);
        }
        .je-action-btn.expand { color: var(--text-secondary); }
        .je-action-btn.expand:hover { color: var(--text-primary); border-color: var(--border-color-active); }
        .je-action-btn.delete {
          display: flex; align-items: center; justify-content: center;
          width: 28px; padding: 5px;
          color: var(--text-muted); border-color: transparent;
        }
        .je-action-btn.delete:hover { color: var(--accent-red); border-color: rgba(224,92,92,0.25); background: rgba(224,92,92,0.06); }

        /* Delete confirm row */
        .je-confirm-row { display: flex; align-items: center; gap: 6px; }
        .je-confirm-label { font-size: 10px; font-weight: 500; color: var(--accent-red); letter-spacing: 0.04em; }
        .je-action-btn.confirm-yes { color: var(--accent-red); border-color: rgba(224,92,92,0.3); background: rgba(224,92,92,0.08); }
        .je-action-btn.confirm-yes:hover { background: rgba(224,92,92,0.15); }
        .je-action-btn.confirm-no  { color: var(--text-muted); }
        .je-action-btn.confirm-no:hover  { color: var(--text-primary); border-color: var(--border-color-active); }
      `}</style>
    </div>
  );
};

export default JournalEntriesPage;
