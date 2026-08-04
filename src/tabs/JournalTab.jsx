import React, { useContext, useState, useRef } from 'react';
import { AppContext } from '../context/AppContext';
import {
  PenLine, Check, Sun, Moon, Sparkles, BookOpen,
  ChevronRight, ArrowRight, Edit3, Plus, Trash2, X, RotateCcw
} from 'lucide-react';

const WORD_GOAL = 50;
const countWords = (str) => str.trim().split(/\s+/).filter(Boolean).length;

const DEFAULT_PROMPTS = {
  morning: [
    "What is the ONE thing I must accomplish today?",
    "What am I grateful for right now?",
    "What would make today feel like a success?",
    "What distracts me most — and how will I avoid it today?",
  ],
  evening: [
    "What went well today? What can I be proud of?",
    "What did I struggle with, and what did I learn?",
    "What habit made the biggest difference today?",
    "What will I do differently tomorrow?",
  ],
};

const JournalTab = () => {
  const {
    journal, saveJournal, streak, setActiveTab,
    journalPrompts, saveJournalPrompts
  } = useContext(AppContext);

  const hour = new Date().getHours();
  const defaultType = hour >= 17 || hour < 5 ? 'evening' : 'morning';

  const [activeType, setActiveType] = useState(defaultType);
  const [text, setText] = useState(journal[activeType] || '');
  const [saved, setSaved] = useState(false);

  /* Prompts edit state */
  const [editMode, setEditMode] = useState(false);
  const [editDraft, setEditDraft] = useState([]);   // local copy while editing
  const [newPrompt, setNewPrompt] = useState('');
  const [editingIdx, setEditingIdx] = useState(null);  // index being inline-edited
  const [editingVal, setEditingVal]  = useState('');
  const newInputRef = useRef(null);

  const entries = journal.entries || [];
  const wordCount = countWords(text);
  const wordProgress = Math.min(100, (wordCount / WORD_GOAL) * 100);

  const prompts = (journalPrompts || DEFAULT_PROMPTS)[activeType] || [];

  /* ─── type switch ── */
  const switchType = (type) => {
    setActiveType(type);
    setText(journal[type] || '');
    setSaved(false);
    setEditMode(false);
  };

  /* ─── editor ── */
  const handleSave = () => {
    if (!text.trim()) return;
    saveJournal(activeType, text);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const injectPrompt = (p) => {
    if (editMode) return;
    setText(prev => prev ? prev + '\n\n' + p + '\n' : p + '\n');
  };

  /* ─── prompt edit helpers ── */
  const openEdit = () => {
    setEditDraft([...prompts]);
    setEditMode(true);
    setNewPrompt('');
    setEditingIdx(null);
  };

  const cancelEdit = () => {
    setEditMode(false);
    setEditingIdx(null);
    setNewPrompt('');
  };

  const saveEdit = () => {
    const cleaned = editDraft.map(p => p.trim()).filter(Boolean);
    saveJournalPrompts(activeType, cleaned);
    setEditMode(false);
    setEditingIdx(null);
    setNewPrompt('');
  };

  const resetToDefault = () => {
    setEditDraft([...DEFAULT_PROMPTS[activeType]]);
  };

  const addPrompt = () => {
    if (!newPrompt.trim()) return;
    setEditDraft(prev => [...prev, newPrompt.trim()]);
    setNewPrompt('');
    newInputRef.current?.focus();
  };

  const removePrompt = (i) => {
    setEditDraft(prev => prev.filter((_, idx) => idx !== i));
    if (editingIdx === i) setEditingIdx(null);
  };

  const startInlineEdit = (i) => {
    setEditingIdx(i);
    setEditingVal(editDraft[i]);
  };

  const confirmInlineEdit = (i) => {
    if (!editingVal.trim()) return;
    setEditDraft(prev => prev.map((p, idx) => idx === i ? editingVal.trim() : p));
    setEditingIdx(null);
  };

  /* ─── render ── */
  return (
    <div className="content-area journal-page">

      {/* Hero */}
      <div className="journal-hero">
        <div className="journal-hero-tag">
          <span className="jh-dot" />
          <span>DAILY JOURNAL</span>
        </div>
        <h1 className="journal-hero-title">
          {activeType === 'morning' ? 'Morning Pages' : 'Evening Reflection'}
        </h1>
        <p className="journal-hero-sub">
          {activeType === 'morning'
            ? 'Set your intentions and prime your mind for the day.'
            : "Decompress. Capture wins, struggles, and tomorrow's edge."}
        </p>
      </div>

      {/* Type Switcher */}
      <div className="journal-type-switcher">
        <button onClick={() => switchType('morning')} className={`type-btn ${activeType === 'morning' ? 'active' : ''}`}>
          <Sun size={14} /><span>Morning</span>
          {journal.completedToday.morning && <Check size={11} className="type-check" />}
        </button>
        <button onClick={() => switchType('evening')} className={`type-btn ${activeType === 'evening' ? 'active' : ''}`}>
          <Moon size={14} /><span>Evening</span>
          {journal.completedToday.evening && <Check size={11} className="type-check" />}
        </button>
      </div>

      {/* ── Prompts Card ── */}
      <div className="journal-prompts-card premium-card">

        {/* Card header */}
        <div className="jpc-header">
          <div className="jpc-header-left">
            <Sparkles size={13} className="jpc-icon" />
            <span className="jpc-label">REFLECTION PROMPTS</span>
          </div>
          {!editMode ? (
            <button className="jpc-edit-btn" onClick={openEdit} title="Edit prompts">
              <Edit3 size={13} />
              <span>Edit</span>
            </button>
          ) : (
            <div className="jpc-edit-actions">
              <button className="jpc-act-btn reset" onClick={resetToDefault} title="Reset to defaults">
                <RotateCcw size={12} />
              </button>
              <button className="jpc-act-btn cancel" onClick={cancelEdit}>
                <X size={12} /><span>Cancel</span>
              </button>
              <button className="jpc-act-btn save" onClick={saveEdit}>
                <Check size={12} /><span>Save</span>
              </button>
            </div>
          )}
        </div>

        {/* View mode — clickable chips */}
        {!editMode && (
          <div className="jpc-chips">
            {prompts.length === 0 && (
              <p className="jpc-empty-note">No prompts yet. Tap Edit to add some.</p>
            )}
            {prompts.map((p, i) => (
              <button key={i} className="prompt-chip" onClick={() => injectPrompt(p)}>
                <span>{p}</span>
                <ChevronRight size={12} className="chip-arrow" />
              </button>
            ))}
          </div>
        )}

        {/* Edit mode — drag-free list with inline text edit */}
        {editMode && (
          <div className="jpc-edit-list">
            {editDraft.map((p, i) => (
              <div key={i} className="jpe-row">
                {editingIdx === i ? (
                  /* Inline textarea for the prompt being edited */
                  <div className="jpe-inline-edit">
                    <textarea
                      className="jpe-inline-input"
                      value={editingVal}
                      autoFocus
                      rows={2}
                      onChange={e => setEditingVal(e.target.value)}
                      onBlur={() => confirmInlineEdit(i)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); confirmInlineEdit(i); }
                        if (e.key === 'Escape') setEditingIdx(null);
                      }}
                    />
                    <button className="jpe-confirm-btn" onMouseDown={() => confirmInlineEdit(i)}>
                      <Check size={12} />
                    </button>
                  </div>
                ) : (
                  /* Normal row */
                  <div className="jpe-item" onClick={() => startInlineEdit(i)}>
                    <span className="jpe-num">{i + 1}</span>
                    <span className="jpe-text">{p}</span>
                    <button
                      className="jpe-delete-btn"
                      onMouseDown={(e) => { e.stopPropagation(); removePrompt(i); }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                )}
              </div>
            ))}

            {/* Add new prompt input */}
            <div className="jpe-add-row">
              <input
                ref={newInputRef}
                className="jpe-add-input"
                placeholder="Type a new prompt and press +"
                value={newPrompt}
                onChange={e => setNewPrompt(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') addPrompt(); }}
              />
              <button
                className="jpe-add-btn"
                onClick={addPrompt}
                disabled={!newPrompt.trim()}
              >
                <Plus size={14} />
              </button>
            </div>

            <p className="jpe-hint">Tap a prompt to edit it inline · Press + to add</p>
          </div>
        )}
      </div>

      {/* Editor */}
      <div className="journal-editor-card premium-card">
        <div className="jec-header">
          <div className="jec-title-row">
            <PenLine size={14} className="jec-pen" />
            <span className="jec-label">{activeType === 'morning' ? 'Morning Entry' : 'Evening Entry'}</span>
          </div>
          <span className="jec-date">
            {new Date().toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
          </span>
        </div>

        <textarea
          className="journal-textarea"
          value={text}
          onChange={(e) => { setText(e.target.value); setSaved(false); }}
          placeholder={activeType === 'morning'
            ? "Write freely. No rules. Just honesty and intention…"
            : "What happened today? Be honest with yourself…"}
          rows={8}
          spellCheck={false}
        />

        <div className="word-progress-row">
          <div className="word-progress-track">
            <div className={`word-progress-fill ${wordProgress >= 100 ? 'done' : ''}`} style={{ width: `${wordProgress}%` }} />
          </div>
          <span className="word-count-label">{wordCount} / {WORD_GOAL} words</span>
        </div>

        <button onClick={handleSave} disabled={!text.trim()} className={`journal-save-btn ${saved ? 'saved' : ''}`}>
          {saved ? <><Check size={15} /><span>SAVED</span></> : <><PenLine size={15} /><span>SAVE ENTRY</span></>}
        </button>
      </div>

      {/* Saved Entries CTA */}
      <button className="journal-entries-cta" onClick={() => setActiveTab('journal-entries')}>
        <div className="jecta-left">
          <div className="jecta-icon-wrap"><BookOpen size={16} /></div>
          <div className="jecta-text">
            <span className="jecta-title">Saved Entries</span>
            <span className="jecta-sub">
              {entries.length > 0
                ? `${entries.length} entr${entries.length === 1 ? 'y' : 'ies'} in your archive`
                : 'Your archive is empty — start writing'}
            </span>
          </div>
        </div>
        <ArrowRight size={16} className="jecta-arrow" />
      </button>

      {/* Streak bar */}
      <div className="journal-streak-bar">
        <span className="jsb-fire">🔥</span>
        <span className="jsb-text">{streak}-day streak — keep writing daily to protect it.</span>
      </div>

      <style>{`
        .journal-page { gap: 16px; padding-bottom: 28px; animation: fadeIn 0.4s var(--ease-premium); }

        /* Hero */
        .journal-hero { display: flex; flex-direction: column; gap: 4px; padding: 4px 0 8px; }
        .journal-hero-tag { display: inline-flex; align-items: center; gap: 6px; font-size: 10px; font-weight: 500; letter-spacing: 0.1em; color: var(--text-muted); margin-bottom: 2px; }
        .jh-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--accent-gold); }
        .journal-hero-title { font-size: 28px; font-weight: 600; letter-spacing: -0.04em; color: var(--text-primary); line-height: 1.15; }
        .journal-hero-sub { font-size: 13px; color: var(--text-secondary); line-height: 1.5; }

        /* Switcher */
        .journal-type-switcher { display: flex; gap: 10px; }
        .type-btn { flex: 1; display: flex; align-items: center; justify-content: center; gap: 7px; padding: 11px 0; border-radius: 14px; border: 1px solid var(--border-color); background: var(--bg-card); color: var(--text-secondary); font-size: 13px; font-weight: 500; cursor: pointer; transition: all var(--transition-fast); position: relative; }
        .type-btn:hover { border-color: var(--border-color-active); color: var(--text-primary); }
        .type-btn.active { background: var(--text-primary); color: var(--bg-primary); border-color: transparent; }
        .type-check { position: absolute; top: 6px; right: 8px; color: var(--accent-green); }
        .type-btn.active .type-check { color: var(--bg-primary); opacity: 0.7; }

        /* Prompts card */
        .journal-prompts-card { gap: 12px; padding: 16px; }
        .jpc-header { display: flex; align-items: center; justify-content: space-between; }
        .jpc-header-left { display: flex; align-items: center; gap: 6px; }
        .jpc-icon { color: var(--accent-gold); }
        .jpc-label { font-size: 10px; font-weight: 500; letter-spacing: 0.08em; color: var(--text-muted); }

        /* Edit button */
        .jpc-edit-btn {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 5px 11px;
          border-radius: 8px;
          border: 1px solid var(--border-color);
          background: rgba(255,255,255,0.02);
          color: var(--text-muted);
          font-size: 11px; font-weight: 500;
          cursor: pointer; transition: all var(--transition-fast);
        }
        .jpc-edit-btn:hover { color: var(--text-primary); border-color: var(--border-color-active); background: rgba(255,255,255,0.04); }
        [data-theme="light"] .jpc-edit-btn { background: rgba(0,0,0,0.02); }
        [data-theme="light"] .jpc-edit-btn:hover { background: rgba(0,0,0,0.05); }

        /* Edit mode action buttons */
        .jpc-edit-actions { display: flex; align-items: center; gap: 6px; }
        .jpc-act-btn {
          display: inline-flex; align-items: center; gap: 4px;
          padding: 5px 10px; border-radius: 8px;
          font-size: 10px; font-weight: 500; letter-spacing: 0.04em;
          cursor: pointer; transition: all var(--transition-fast);
          border: 1px solid var(--border-color);
          background: transparent;
        }
        .jpc-act-btn.reset { color: var(--text-muted); padding: 5px 8px; }
        .jpc-act-btn.reset:hover { color: var(--accent-gold); border-color: rgba(197,168,128,0.3); }
        .jpc-act-btn.cancel { color: var(--text-muted); }
        .jpc-act-btn.cancel:hover { color: var(--accent-red); border-color: rgba(224,92,92,0.25); }
        .jpc-act-btn.save { color: var(--accent-green); border-color: rgba(72,154,126,0.3); background: rgba(72,154,126,0.06); }
        .jpc-act-btn.save:hover { background: rgba(72,154,126,0.12); }

        /* View chips */
        .jpc-chips { display: flex; flex-direction: column; gap: 6px; }
        .jpc-empty-note { font-size: 12px; color: var(--text-muted); font-style: italic; padding: 4px 0; }
        .prompt-chip { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 10px 12px; background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); border-radius: 10px; color: var(--text-secondary); font-size: 12px; font-weight: 500; text-align: left; cursor: pointer; transition: all var(--transition-fast); }
        .prompt-chip:hover { background: rgba(255,255,255,0.05); color: var(--text-primary); border-color: var(--border-color-active); }
        [data-theme="light"] .prompt-chip { background: rgba(0,0,0,0.02); }
        [data-theme="light"] .prompt-chip:hover { background: rgba(0,0,0,0.04); }
        .chip-arrow { flex-shrink: 0; color: var(--text-muted); }

        /* ── Edit list ── */
        .jpc-edit-list { display: flex; flex-direction: column; gap: 6px; }
        .jpe-row { width: 100%; }

        /* Normal item row */
        .jpe-item {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 10px 12px;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border-color);
          border-radius: 10px;
          cursor: text;
          transition: all var(--transition-fast);
        }
        .jpe-item:hover { border-color: var(--border-color-active); background: rgba(255,255,255,0.04); }
        [data-theme="light"] .jpe-item { background: rgba(0,0,0,0.02); }
        [data-theme="light"] .jpe-item:hover { background: rgba(0,0,0,0.04); }

        .jpe-num {
          font-size: 10px; font-weight: 500; color: var(--text-muted);
          min-width: 16px; line-height: 1.7; flex-shrink: 0;
        }
        .jpe-text {
          flex: 1; font-size: 12px; line-height: 1.55;
          color: var(--text-secondary); text-align: left; word-break: break-word;
        }
        .jpe-delete-btn {
          display: flex; align-items: center; justify-content: center;
          width: 24px; height: 24px; flex-shrink: 0;
          background: transparent; border: none;
          color: var(--text-muted); cursor: pointer; border-radius: 6px;
          transition: all var(--transition-fast);
          margin-top: 1px;
        }
        .jpe-delete-btn:hover { color: var(--accent-red); background: rgba(224,92,92,0.08); }

        /* Inline editing */
        .jpe-inline-edit {
          display: flex; gap: 8px;
          padding: 10px 12px;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--border-color-active);
          border-radius: 10px;
        }
        [data-theme="light"] .jpe-inline-edit { background: rgba(0,0,0,0.03); }
        .jpe-inline-input {
          flex: 1; background: transparent; border: none; outline: none;
          color: var(--text-primary); font-family: var(--font-sans);
          font-size: 12px; line-height: 1.55; resize: none;
        }
        .jpe-confirm-btn {
          display: flex; align-items: center; justify-content: center;
          width: 28px; height: 28px; flex-shrink: 0;
          background: rgba(72,154,126,0.1); border: 1px solid rgba(72,154,126,0.25);
          border-radius: 8px; color: var(--accent-green); cursor: pointer;
          align-self: flex-start;
        }

        /* Add new row */
        .jpe-add-row {
          display: flex; gap: 8px;
          padding: 4px 0 2px;
        }
        .jpe-add-input {
          flex: 1; height: 38px;
          background: var(--bg-card);
          border: 1px dashed var(--border-color-active);
          border-radius: 10px;
          padding: 0 12px;
          color: var(--text-primary);
          font-family: var(--font-sans);
          font-size: 12px; outline: none;
          transition: border-color var(--transition-fast);
        }
        .jpe-add-input:focus { border-color: var(--accent-gold); border-style: solid; }
        .jpe-add-input::placeholder { color: var(--text-muted); font-style: italic; }
        .jpe-add-btn {
          width: 38px; height: 38px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: rgba(197,168,128,0.08);
          border: 1px solid rgba(197,168,128,0.2);
          border-radius: 10px; color: var(--accent-gold);
          cursor: pointer; transition: all var(--transition-fast);
        }
        .jpe-add-btn:hover:not(:disabled) { background: rgba(197,168,128,0.15); }
        .jpe-add-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        .jpe-hint { font-size: 10px; color: var(--text-muted); font-style: italic; text-align: center; padding-top: 2px; }

        /* Editor */
        .journal-editor-card { gap: 14px; padding: 18px; }
        .jec-header { display: flex; justify-content: space-between; align-items: center; }
        .jec-title-row { display: flex; align-items: center; gap: 6px; }
        .jec-pen { color: var(--text-muted); }
        .jec-label { font-size: 11px; font-weight: 500; letter-spacing: 0.06em; color: var(--text-secondary); }
        .jec-date { font-size: 10px; font-weight: 500; color: var(--text-muted); letter-spacing: 0.02em; }
        .journal-textarea { width: 100%; background: transparent; border: none; outline: none; color: var(--text-primary); font-family: var(--font-sans); font-size: 14px; line-height: 1.7; resize: none; min-height: 180px; border-bottom: 1px solid var(--border-color); padding-bottom: 12px; transition: border-color var(--transition-fast); }
        .journal-textarea:focus { border-bottom-color: var(--border-color-active); }
        .journal-textarea::placeholder { color: var(--text-muted); font-style: italic; }

        .word-progress-row { display: flex; align-items: center; gap: 10px; }
        .word-progress-track { flex: 1; height: 3px; background: rgba(255,255,255,0.06); border-radius: 2px; overflow: hidden; }
        [data-theme="light"] .word-progress-track { background: rgba(0,0,0,0.08); }
        .word-progress-fill { height: 100%; background: var(--accent-gold); border-radius: 2px; transition: width 0.3s var(--ease-premium), background 0.3s; }
        .word-progress-fill.done { background: var(--accent-green); }
        .word-count-label { font-size: 10px; font-weight: 500; color: var(--text-muted); white-space: nowrap; }

        .journal-save-btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; height: 46px; background: var(--text-primary); color: var(--bg-primary); border: none; border-radius: 12px; font-size: 12px; font-weight: 500; letter-spacing: 0.06em; cursor: pointer; transition: all 0.2s var(--ease-premium); }
        .journal-save-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(255,255,255,0.1); }
        .journal-save-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        .journal-save-btn.saved { background: var(--accent-green); color: #fff; }

        /* Saved Entries CTA */
        .journal-entries-cta { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 16px 18px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; cursor: pointer; transition: all var(--transition-fast); text-align: left; }
        .journal-entries-cta:hover { border-color: var(--border-color-active); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,0,0,0.3); }
        [data-theme="light"] .journal-entries-cta:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.08); }
        .jecta-left { display: flex; align-items: center; gap: 14px; }
        .jecta-icon-wrap { width: 40px; height: 40px; border-radius: 12px; background: rgba(197,168,128,0.08); border: 1px solid rgba(197,168,128,0.15); display: flex; align-items: center; justify-content: center; color: var(--accent-gold); flex-shrink: 0; }
        .jecta-text { display: flex; flex-direction: column; gap: 3px; }
        .jecta-title { font-size: 14px; font-weight: 600; color: var(--text-primary); letter-spacing: -0.01em; }
        .jecta-sub { font-size: 11px; color: var(--text-muted); font-weight: 500; }
        .jecta-arrow { color: var(--text-muted); flex-shrink: 0; transition: transform var(--transition-fast); }
        .journal-entries-cta:hover .jecta-arrow { transform: translateX(3px); color: var(--text-primary); }

        /* Streak */
        .journal-streak-bar { display: flex; align-items: center; gap: 8px; padding: 12px 16px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 14px; }
        .jsb-fire { font-size: 16px; }
        .jsb-text { font-size: 12px; font-weight: 500; color: var(--text-secondary); }
      `}</style>
    </div>
  );
};

export default JournalTab;
