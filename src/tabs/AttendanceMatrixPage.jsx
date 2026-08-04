import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  ArrowLeft, BookOpen, AlertTriangle, ShieldCheck, Plus, Trash2, X, Check,
  Sparkles, TrendingUp, CheckCircle2, XCircle, Flame, Layers
} from 'lucide-react';

const AttendanceMatrixPage = () => {
  const { 
    attendance, 
    addCourse, 
    updateCourse, 
    deleteCourse, 
    setActiveTab 
  } = useContext(AppContext);

  // Modal State for Adding Course
  const [addCourseModalOpen, setAddCourseModalOpen] = useState(false);
  const [newCourseName, setNewCourseName] = useState('');
  const [newAttended, setNewAttended] = useState('15');
  const [newTotal, setNewTotal] = useState('18');

  // Overall Statistics
  const courseEntries = Object.entries(attendance);
  let totalAttendedSum = 0;
  let totalClassesSum = 0;
  let dangerCount = 0;
  let warningCount = 0;
  let safeCount = 0;

  courseEntries.forEach(([_, record]) => {
    const a = record.attended;
    const t = record.total;
    totalAttendedSum += a;
    totalClassesSum += t;

    if (t > 0) {
      const pct = (a / t) * 100;
      if (pct < 75) dangerCount++;
      else if (pct < 80) warningCount++;
      else safeCount++;
    }
  });

  const overallPercent = totalClassesSum > 0 ? (totalAttendedSum / totalClassesSum) * 100 : 0;

  const handleAddCourseSubmit = (e) => {
    e.preventDefault();
    if (!newCourseName.trim()) return;
    addCourse(newCourseName.trim(), parseInt(newAttended) || 0, parseInt(newTotal) || 0);
    setNewCourseName('');
    setNewAttended('15');
    setNewTotal('18');
    setAddCourseModalOpen(false);
  };

  const handleMarkPresent = (subject, record) => {
    updateCourse(subject, record.attended + 1, record.total + 1);
  };

  const handleMarkAbsent = (subject, record) => {
    updateCourse(subject, record.attended, record.total + 1);
  };

  return (
    <div className="content-area attendance-matrix-page">
      {/* Navigation Header */}
      <div className="subpage-nav-header">
        <button onClick={() => setActiveTab('analytics')} className="back-btn" aria-label="Back to Analytics">
          <ArrowLeft size={16} />
          <span>Analytics Hub</span>
        </button>
      </div>

      {/* Main Header */}
      <div className="attendance-header">
        <div className="att-tag">
          <Sparkles size={13} className="att-icon" />
          <span>ACADEMIC COMPLIANCE & ATTENDANCE HUD</span>
        </div>
        <h1 className="text-title">Active Courses & Ratios</h1>
        <p className="text-desc">Monitor minimum thresholds, safe absence allowances, and 1-tap attendance logs.</p>
      </div>

      {/* Overall Attendance Summary Banner */}
      <div className="premium-card luxury-attendance-banner">
        <div className="banner-header-row">
          <div className="banner-info-col">
            <span className="banner-subtitle">Overall Attendance Health</span>
            <div className="banner-percent-row">
              <span className="banner-percent-val">{overallPercent.toFixed(0)}%</span>
              <span className={`banner-health-pill ${overallPercent >= 85 ? 'health-excellent' : overallPercent >= 75 ? 'health-good' : 'health-danger'}`}>
                <span className="pill-dot" />
                {overallPercent >= 85 ? 'Optimal Standing' : overallPercent >= 75 ? 'Compliant (75%+)' : 'Below 75% Limit'}
              </span>
            </div>
          </div>

          <button onClick={() => setAddCourseModalOpen(true)} className="btn-primary add-course-header-btn">
            <Plus size={15} />
            <span>Add Course</span>
          </button>
        </div>

        {/* Global Progress Bar */}
        <div className="global-progress-bar-bg">
          <div 
            className="global-progress-bar-fill" 
            style={{ width: `${Math.min(100, overallPercent)}%` }} 
          />
        </div>

        {/* Metrics Grid Row */}
        <div className="banner-metrics-grid">
          <div className="banner-metric-item">
            <span className="metric-lbl">Active Courses</span>
            <span className="metric-val">{courseEntries.length} Subjects</span>
          </div>
          <div className="metric-v-divider" />
          <div className="banner-metric-item">
            <span className="metric-lbl">Compliant Courses</span>
            <span className="metric-val text-green">{safeCount + warningCount} Safe</span>
          </div>
          <div className="metric-v-divider" />
          <div className="banner-metric-item">
            <span className="metric-lbl">Critical Alerts</span>
            <span className={`metric-val ${dangerCount > 0 ? 'text-danger' : 'text-muted'}`}>
              {dangerCount > 0 ? `${dangerCount} Below 75%` : 'None'}
            </span>
          </div>
        </div>
      </div>

      {/* Active Courses List */}
      <div className="courses-grid-container">
        {courseEntries.length === 0 ? (
          <div className="premium-card empty-courses-card">
            <BookOpen size={32} className="empty-book-icon" />
            <h3 className="empty-card-title">No Active Courses Added</h3>
            <p className="empty-card-desc">Click "+ Add Course" above to start tracking your attendance ratios and safe absence bounds.</p>
            <button onClick={() => setAddCourseModalOpen(true)} className="btn-primary">
              <Plus size={15} />
              <span>Add Your First Course</span>
            </button>
          </div>
        ) : (
          courseEntries.map(([subject, record]) => {
            const a = record.attended;
            const t = record.total;
            const percent = t > 0 ? (a / t) * 100 : 0;
            
            const safeAbsences = t > 0 ? Math.floor((4 * a - 3 * t) / 3) : 0;
            const consecutiveNeeded = t > 0 ? (3 * t) - (4 * a) : 0;
            
            let statusPillText = '';
            let statusClass = '';
            
            if (t === 0) {
              statusClass = 'warning';
              statusPillText = 'No classes held yet';
            } else if (percent < 75) {
              statusClass = 'danger';
              statusPillText = `Alert: Attend ${consecutiveNeeded} classes consecutively`;
            } else if (safeAbsences > 0) {
              statusClass = 'success';
              statusPillText = `Safe: Can miss ${safeAbsences} ${safeAbsences === 1 ? 'class' : 'classes'}`;
            } else {
              statusClass = 'warning';
              statusPillText = `Borderline: Attend next class`;
            }

            const radius = 26;
            const circumference = 2 * Math.PI * radius;
            const strokeDashoffset = circumference - (percent / 100) * circumference;

            return (
              <div key={subject} className="premium-card luxury-course-card">
                {/* SVG Radial & Status Header */}
                <div className="course-card-top-row">
                  <div className="course-title-col">
                    <div className="course-badge-row">
                      <span className="course-type-pill">CORE SUBJECT</span>
                    </div>
                    <h3 className="course-name">{subject}</h3>
                    <span className="course-ratio-text">{a} / {t} Attended</span>
                  </div>

                  {/* Radial Gauge */}
                  <div className="course-radial-wrap">
                    <svg className="radial-svg" width="68" height="68">
                      <defs>
                        <linearGradient id="gradient-success" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="var(--accent-green)" />
                          <stop offset="100%" stopColor="#2D7A62" />
                        </linearGradient>
                        <linearGradient id="gradient-warning" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="var(--accent-gold)" />
                          <stop offset="100%" stopColor="#A8854A" />
                        </linearGradient>
                        <linearGradient id="gradient-danger" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="var(--accent-red)" />
                          <stop offset="100%" stopColor="#C93E3E" />
                        </linearGradient>
                      </defs>

                      <circle 
                        className="radial-bg-circle"
                        cx="34" 
                        cy="34" 
                        r={radius} 
                        strokeWidth="3.5" 
                        fill="transparent"
                      />
                      <circle 
                        className="radial-fg-circle"
                        cx="34" 
                        cy="34" 
                        r={radius} 
                        strokeWidth="3.5" 
                        fill="transparent"
                        stroke={percent >= 80 ? 'url(#gradient-success)' : percent >= 75 ? 'url(#gradient-warning)' : 'url(#gradient-danger)'}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        transform="rotate(-90 34 34)"
                      />
                    </svg>
                    <span className="radial-percent-val">{percent.toFixed(0)}%</span>
                  </div>
                </div>

                {/* Status Pill Indicator */}
                <div className={`course-status-banner ${statusClass}`}>
                  <span className="status-banner-dot" />
                  <span className="status-banner-text">{statusPillText}</span>
                </div>

                {/* Individual Progress Bar */}
                <div className="course-card-progress-bg">
                  <div 
                    className={`course-card-progress-fill ${statusClass}`}
                    style={{ width: `${Math.min(100, percent)}%` }} 
                  />
                </div>

                {/* 1-Tap Attendance Controls */}
                <div className="course-card-actions-row">
                  <button 
                    onClick={() => handleMarkPresent(subject, record)} 
                    className="att-action-btn present-btn"
                    title="Mark Present (+1 Attended)"
                  >
                    <CheckCircle2 size={14} />
                    <span>+ Present</span>
                  </button>

                  <button 
                    onClick={() => handleMarkAbsent(subject, record)} 
                    className="att-action-btn absent-btn"
                    title="Mark Absent (+1 Total Missed)"
                  >
                    <XCircle size={14} />
                    <span>+ Absent</span>
                  </button>

                  <button 
                    onClick={() => deleteCourse(subject)} 
                    className="delete-course-icon-btn"
                    title="Delete Course"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add Course Slide-Up Drawer */}
      {addCourseModalOpen && (
        <div className="modal-overlay" onClick={() => setAddCourseModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-handle"></div>
            <div className="modal-header-simple">
              <h3>Add Active Course</h3>
              <button className="modal-close" onClick={() => setAddCourseModalOpen(false)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddCourseSubmit} className="submodal-form">
              <div className="form-field">
                <label className="form-label">Course / Subject Name</label>
                <input
                  type="text"
                  value={newCourseName}
                  onChange={(e) => setNewCourseName(e.target.value)}
                  placeholder="e.g. Thermodynamics, Data Structures"
                  className="input-premium"
                  required
                  autoFocus
                />
              </div>

              <div className="form-group-row">
                <div className="form-field">
                  <label className="form-label">Attended Classes</label>
                  <input
                    type="number"
                    min="0"
                    value={newAttended}
                    onChange={(e) => setNewAttended(e.target.value)}
                    className="input-premium"
                    required
                  />
                </div>

                <div className="form-field">
                  <label className="form-label">Total Held Classes</label>
                  <input
                    type="number"
                    min="0"
                    value={newTotal}
                    onChange={(e) => setNewTotal(e.target.value)}
                    className="input-premium"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary submodal-btn">
                <span>Save New Course</span>
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .attendance-matrix-page {
          gap: 16px;
          padding-bottom: 36px;
          animation: fadeIn 0.38s var(--ease-premium);
        }

        .subpage-nav-header {
          display: flex;
          align-items: center;
        }

        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          border-radius: 10px;
          padding: 6px 12px;
          color: var(--text-secondary);
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .back-btn:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.06);
          border-color: var(--border-color-active);
        }

        .attendance-header {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .att-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: var(--accent-gold);
        }

        /* Summary Banner */
        .luxury-attendance-banner {
          gap: 14px;
          padding: 20px !important;
          background: rgba(16, 16, 20, 0.75) !important;
        }

        .banner-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .banner-info-col {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .banner-subtitle {
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--text-muted);
        }

        .banner-percent-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .banner-percent-val {
          font-size: 32px;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.03em;
          line-height: 1;
        }

        .banner-health-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 20px;
          border: 1px solid transparent;
        }

        .health-excellent {
          background: var(--accent-green-glowing);
          color: var(--accent-green);
          border-color: rgba(72, 154, 126, 0.25);
        }

        .health-good {
          background: var(--accent-gold-glowing);
          color: var(--accent-gold);
          border-color: rgba(197, 168, 128, 0.25);
        }

        .health-danger {
          background: var(--accent-red-glowing);
          color: var(--accent-red);
          border-color: rgba(224, 92, 92, 0.25);
        }

        .pill-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: currentColor;
        }

        .add-course-header-btn {
          padding: 8px 14px !important;
          font-size: 12px !important;
          border-radius: 10px !important;
        }

        .global-progress-bar-bg {
          height: 6px;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 3px;
          overflow: hidden;
        }

        .global-progress-bar-fill {
          height: 100%;
          background: var(--text-primary);
          border-radius: 3px;
          transition: width 0.4s var(--ease-premium);
        }

        .banner-metrics-grid {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 12px;
          padding: 10px 14px;
        }

        .banner-metric-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
        }

        .metric-v-divider {
          width: 1px;
          height: 20px;
          background: rgba(255, 255, 255, 0.06);
          margin: 0 10px;
        }

        .metric-lbl {
          font-size: 9px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--text-muted);
        }

        .metric-val {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .metric-val.text-green { color: var(--accent-green); }
        .metric-val.text-danger { color: var(--accent-red); }

        /* Courses Grid */
        .courses-grid-container {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .luxury-course-card {
          gap: 14px;
          padding: 18px !important;
          background: rgba(12, 12, 16, 0.85) !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          border-radius: 20px !important;
        }

        .course-card-top-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .course-title-col {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .course-type-pill {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.06em;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 2px 6px;
          border-radius: 4px;
        }

        .course-name {
          font-size: 17px;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: -0.01em;
        }

        .course-ratio-text {
          font-size: 12px;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .course-radial-wrap {
          position: relative;
          width: 68px;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .radial-bg-circle {
          stroke: rgba(255, 255, 255, 0.04);
        }

        .radial-fg-circle {
          stroke-linecap: round;
          transition: stroke-dashoffset 0.8s var(--ease-premium);
        }

        .radial-percent-val {
          position: absolute;
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        .course-status-banner {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 10px;
          font-size: 11px;
          font-weight: 500;
        }

        .course-status-banner.success {
          background: var(--accent-green-glowing);
          color: var(--accent-green);
          border: 1px solid rgba(72, 154, 126, 0.2);
        }

        .course-status-banner.warning {
          background: var(--accent-gold-glowing);
          color: var(--accent-gold);
          border: 1px solid rgba(197, 168, 128, 0.2);
        }

        .course-status-banner.danger {
          background: var(--accent-red-glowing);
          color: var(--accent-red);
          border: 1px solid rgba(224, 92, 92, 0.2);
        }

        .status-banner-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
          flex-shrink: 0;
        }

        .course-card-progress-bg {
          height: 4px;
          background: rgba(255, 255, 255, 0.04);
          border-radius: 2px;
          overflow: hidden;
        }

        .course-card-progress-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 0.4s var(--ease-premium);
        }

        .course-card-progress-fill.success { background: var(--accent-green); }
        .course-card-progress-fill.warning { background: var(--accent-gold); }
        .course-card-progress-fill.danger { background: var(--accent-red); }

        /* Actions row */
        .course-card-actions-row {
          display: flex;
          align-items: center;
          gap: 8px;
          padding-top: 4px;
        }

        .att-action-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 12px;
          border-radius: 10px;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .present-btn {
          background: rgba(72, 154, 126, 0.08);
          border: 1px solid rgba(72, 154, 126, 0.2);
          color: var(--accent-green);
        }

        .present-btn:hover {
          background: rgba(72, 154, 126, 0.16);
          border-color: rgba(72, 154, 126, 0.35);
          transform: translateY(-1px);
        }

        .absent-btn {
          background: rgba(224, 92, 92, 0.08);
          border: 1px solid rgba(224, 92, 92, 0.2);
          color: var(--accent-red);
        }

        .absent-btn:hover {
          background: rgba(224, 92, 92, 0.16);
          border-color: rgba(224, 92, 92, 0.35);
          transform: translateY(-1px);
        }

        .delete-course-icon-btn {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 10px;
          color: var(--text-muted);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .delete-course-icon-btn:hover {
          color: var(--accent-red);
          background: rgba(224, 92, 92, 0.1);
          border-color: rgba(224, 92, 92, 0.25);
        }

        .empty-courses-card {
          align-items: center;
          text-align: center;
          padding: 36px 20px !important;
          gap: 12px;
        }

        .empty-book-icon {
          color: var(--text-muted);
        }

        .empty-card-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .empty-card-desc {
          font-size: 13px;
          color: var(--text-secondary);
          max-width: 320px;
          line-height: 1.5;
        }

        .form-group-row {
          display: flex;
          gap: 12px;
        }

        .form-group-row .form-field {
          flex: 1;
        }
      `}</style>
    </div>
  );
};

export default AttendanceMatrixPage;
