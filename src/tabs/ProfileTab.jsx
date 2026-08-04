import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { AuthContext } from '../context/AuthContext';
import { 
  User, Settings, Cpu, Database, Sliders, Sun, Moon, Sunrise, Sunset, 
  Save, RotateCcw, Check, Bell, Volume2, HardDrive, Download, ShieldCheck, 
  Menu, X, CheckSquare, Clock, ArrowRight, Shield, Zap, Sparkles, Flame, Plus, Trash2, Edit3, LogOut
} from 'lucide-react';

const ProfileTab = () => {
  const { 
    userName,
    studentMeta, 
    streak, 
    semesterDay, 
    week, 
    timeOfDay, 
    setTimeOfDayOverride, 
    timeOfDayOverride,
    updateProfile,
    resetAllData,
    studyProgress,
    attendance,
    addCourse,
    updateCourse,
    deleteCourse,
    schedule,
    addScheduleClass,
    deleteScheduleClass,
    actions,
    addAction,
    deleteAction,
    habits,
    addHabit,
    updateHabit,
    deleteHabit,
    setActiveTab,
    theme,
    toggleTheme,
    customQuote
  } = useContext(AppContext);

  const { logout } = useContext(AuthContext);

  // Profile Drawer Section State ('identity', 'courses', 'timeline', 'tasks', 'habits', 'settings', 'simulator', 'data')
  const [activeSection, setActiveSection] = useState('identity');
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);

  // 1. Identity Form Local State
  const [editName, setEditName] = useState(userName);
  const [editBranch, setEditBranch] = useState(studentMeta.branch || 'Computer Engineering');
  const [editYear, setEditYear] = useState(studentMeta.year || '1st Year');
  const [editSection, setEditSection] = useState(studentMeta.section || 'Section A');
  const [editSemDay, setEditSemDay] = useState(semesterDay);
  const [editWeek, setEditWeek] = useState(week);
  const [editTargetMins, setEditTargetMins] = useState(studyProgress.targetMinutes || 90);
  const [editQuote, setEditQuote] = useState(customQuote || 'Relentless execution beats passive intent.');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // 2. Course Manager Form State
  const [newCourseName, setNewCourseName] = useState('');
  const [newAttended, setNewAttended] = useState('0');
  const [newTotal, setNewTotal] = useState('0');
  const [editingCourse, setEditingCourse] = useState(null);

  // 3. Timeline Class Form State
  const [classTitle, setClassTitle] = useState('');
  const [classTime, setClassTime] = useState('2:00 PM');
  const [classInstructor, setClassInstructor] = useState('');
  const [classRoom, setClassRoom] = useState('');

  // 4. Action Task Form State
  const [taskTitle, setTaskTitle] = useState('');
  const [taskEstTime, setTaskEstTime] = useState('30 mins');
  const [taskDeadline, setTaskDeadline] = useState('Today');

  // 5. Habit Form State
  const [newHabitName, setNewHabitName] = useState('');
  const [editingHabitNames, setEditingHabitNames] = useState({});

  // 6. Settings State
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [hapticsEnabled, setHapticsEnabled] = useState(true);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Handlers
  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(editName, editBranch, editYear, editSection, editSemDay, editWeek, editTargetMins, editQuote);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleAddCourseSubmit = (e) => {
    e.preventDefault();
    if (!newCourseName.trim()) return;
    addCourse(newCourseName.trim(), parseInt(newAttended) || 0, parseInt(newTotal) || 0);
    setNewCourseName('');
    setNewAttended('0');
    setNewTotal('0');
  };

  const handleAddClassSubmit = (e) => {
    e.preventDefault();
    if (!classTitle.trim()) return;
    addScheduleClass(classTitle, classTime, classInstructor, classRoom);
    setClassTitle('');
    setClassInstructor('');
    setClassRoom('');
  };

  const handleAddTaskSubmit = (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    addAction(taskTitle, taskEstTime, taskDeadline);
    setTaskTitle('');
    setTaskEstTime('30 mins');
    setTaskDeadline('Today');
  };

  const handleAddHabitSubmit = (e) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;
    addHabit(newHabitName.trim(), 'BookOpen');
    setNewHabitName('');
  };

  const handleSaveHabitName = (id) => {
    const val = editingHabitNames[id];
    if (val !== undefined && val.trim()) {
      updateHabit(id, val.trim(), null);
    }
  };

  const handleSaveSettings = () => {
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2000);
  };

  const handleExportData = () => {
    const data = {
      userName,
      studentMeta,
      streak,
      semesterDay,
      week,
      studyProgress,
      exportedAt: new Date().toISOString()
    };
    const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", jsonStr);
    downloadAnchor.setAttribute("download", `studentos_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const times = [
    { id: 'Morning', icon: Sunrise, desc: 'Focus on today\'s schedule' },
    { id: 'Afternoon', icon: Sun, desc: 'Focus on lectures & check-ins' },
    { id: 'Evening', icon: Sunset, desc: 'Focus on study focus timer' },
    { id: 'Night', icon: Moon, desc: 'Focus on journals & reflection' }
  ];

  const menuGroups = [
    {
      groupTitle: 'Identity & OS Settings',
      items: [
        { id: 'identity', label: 'Student Identity', icon: User, desc: 'Name, Branch & Semester', badge: 'Editable' },
        { id: 'settings', label: 'OS Preferences', icon: Settings, desc: 'Audio, Haptics & Reminders', badge: 'Active' },
      ]
    },
    {
      groupTitle: 'Edit & Manage Academic Data',
      items: [
        { id: 'courses', label: 'Courses & Attendance', icon: CheckSquare, desc: 'Add, Edit, Delete Subjects', badge: `${Object.keys(attendance).length} Courses` },
        { id: 'timeline', label: 'Today Schedule Timeline', icon: Clock, desc: 'Add & Delete Lectures', badge: `${schedule.length} Classes` },
        { id: 'tasks', label: 'To-Do List', icon: Zap, desc: 'Add & Delete To-Do Tasks', badge: `${actions.length} Tasks` },
        { id: 'habits', label: 'Daily Habits Routine', icon: Sparkles, desc: 'Add, Rename & Pick Icons', badge: `${habits.length} Habits` }
      ]
    },
    {
      groupTitle: 'System & Maintenance',
      items: [
        { id: 'simulator', label: 'Dashboard Simulator', icon: Cpu, desc: 'Time of Day Morphing', badge: timeOfDay },
        { id: 'data', label: 'Data Storage & Backup', icon: Database, desc: 'JSON Backup & Factory Reset', badge: 'Local Cache' }
      ]
    }
  ];

  return (
    <div className="content-area profile-tab">
      {/* Student Profile Header */}
      <div className="profile-header-container">
        <div className="avatar-wrapper">
          <User size={30} className="avatar-icon" />
        </div>
        <div className="profile-info">
          <h2 className="profile-name">{userName}</h2>
          <span className="profile-role">
            {studentMeta.year} &bull; {studentMeta.branch} &bull; {studentMeta.section}
          </span>
        </div>

        {/* Top-Right Control Hub Menu Button */}
        <button 
          onClick={() => setMenuDrawerOpen(!menuDrawerOpen)}
          className={`profile-menu-toggle-btn ${menuDrawerOpen ? 'active' : ''}`}
          aria-label="StudentOS Control Hub Menu"
        >
          {menuDrawerOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Full-Height Slide-in Menu Drawer */}
        {menuDrawerOpen && (
          <div className="pro-drawer-backdrop" onClick={() => setMenuDrawerOpen(false)}>
            <div className="pro-drawer-panel" onClick={(e) => e.stopPropagation()}>
              <div className="pro-drawer-header">
                <div className="pro-drawer-title-col">
                  <div className="pro-logo-row">
                    <Sparkles size={16} className="pro-logo-icon" />
                    <span className="pro-app-title">Control Hub Drawer</span>
                  </div>
                  <span className="pro-app-subtitle">All Edit & Customization Options</span>
                </div>
                <button onClick={() => setMenuDrawerOpen(false)} className="pro-drawer-close-btn">
                  <X size={18} />
                </button>
              </div>

              {/* Student Identity Mini Card */}
              <div className="pro-student-mini-card">
                <div className="mini-avatar">
                  <User size={20} />
                </div>
                <div className="mini-meta">
                  <span className="mini-name">{userName}</span>
                  <span className="mini-branch">{studentMeta.branch}</span>
                </div>
                <div className="mini-streak-pill">
                  <Flame size={12} className="streak-fire" />
                  <span>{streak}d Streak</span>
                </div>
              </div>

              {/* Drawer Categorized Navigation */}
              <div className="pro-drawer-scroll-body">
                {menuGroups.map((group, gIdx) => (
                  <div key={gIdx} className="pro-drawer-group">
                    <span className="pro-group-title">{group.groupTitle}</span>
                    <div className="pro-group-items">
                      {group.items.map(item => {
                        const Icon = item.icon;
                        const isSectionActive = activeSection === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              setActiveSection(item.id);
                              setMenuDrawerOpen(false);
                            }}
                            className={`pro-drawer-item ${isSectionActive ? 'active' : ''}`}
                          >
                            <div className="item-icon-wrapper">
                              <Icon size={16} />
                            </div>
                            <div className="item-text-col">
                              <span className="item-title">{item.label}</span>
                              <span className="item-desc">{item.desc}</span>
                            </div>
                            {item.badge && (
                              <span className="item-badge-pill">{item.badge}</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Drawer Footer Controls */}
              <div className="pro-drawer-footer">
                <div className="drawer-footer-actions">
                  {/* Theme Toggle */}
                  <button
                    onClick={toggleTheme}
                    className={`footer-quick-btn theme-toggle-btn ${theme === 'light' ? 'light-active' : ''}`}
                  >
                    {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
                    <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                  </button>

                  <button 
                    onClick={() => setSoundEnabled(!soundEnabled)} 
                    className={`footer-quick-btn ${soundEnabled ? 'active' : ''}`}
                  >
                    <Volume2 size={14} />
                    <span>{soundEnabled ? 'Sound ON' : 'Sound OFF'}</span>
                  </button>

                  <button onClick={handleExportData} className="footer-quick-btn">
                    <Download size={14} />
                    <span>Export JSON</span>
                  </button>
                </div>

                <button 
                  onClick={logout} 
                  className="footer-quick-btn logout-btn" 
                  style={{ 
                    background: 'rgba(255, 75, 75, 0.08)', 
                    color: '#ff4d4d', 
                    borderColor: 'rgba(255, 75, 75, 0.15)', 
                    width: '100%', 
                    marginTop: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <LogOut size={14} />
                  <span>Sign Out of Account</span>
                </button>
                
                <div className="system-status-indicator" style={{ marginTop: '4px' }}>
                  <ShieldCheck size={12} className="shield-icon" />
                  <span>Control Hub &bull; All Edit Tools Active</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Stats Quick-Bar */}
      <div className="profile-stats-row">
        <div className="profile-stat-box">
          <span className="stat-label">Streak</span>
          <span className="stat-value">{streak} Days</span>
        </div>
        <div className="profile-stat-box">
          <span className="stat-label">Semester Day</span>
          <span className="stat-value">{semesterDay} / 90</span>
        </div>
        <div className="profile-stat-box">
          <span className="stat-label">Current Week</span>
          <span className="stat-value">W{week}</span>
        </div>
      </div>

      {/* Main Active Edit View */}
      <main className="profile-content-view">
        {/* 1. Student Identity Section */}
        {activeSection === 'identity' && (
          <div className="premium-card profile-section-card">
            <div className="console-header">
              <User size={16} className="console-icon" />
              <h3 className="text-subtitle">Student Identity & Academic Meta</h3>
            </div>

            <form onSubmit={handleSaveProfile} className="profile-edit-form">
              <div className="form-group-row">
                <div className="form-field">
                  <label className="form-label">Student Full Name</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="input-premium"
                    required
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Engineering Branch</label>
                  <input
                    type="text"
                    value={editBranch}
                    onChange={(e) => setEditBranch(e.target.value)}
                    className="input-premium"
                    required
                  />
                </div>
              </div>

              <div className="form-group-row">
                <div className="form-field">
                  <label className="form-label">Year & Section</label>
                  <div className="dual-inputs">
                    <input
                      type="text"
                      value={editYear}
                      onChange={(e) => setEditYear(e.target.value)}
                      className="input-premium"
                      placeholder="e.g. 1st Year"
                      required
                    />
                    <input
                      type="text"
                      value={editSection}
                      onChange={(e) => setEditSection(e.target.value)}
                      className="input-premium"
                      placeholder="e.g. Sec A"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-group-row">
                <div className="form-field">
                  <label className="form-label">Semester Day</label>
                  <input
                    type="number"
                    value={editSemDay}
                    onChange={(e) => setEditSemDay(e.target.value)}
                    className="input-premium"
                    required
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Current Week</label>
                  <input
                    type="number"
                    value={editWeek}
                    onChange={(e) => setEditWeek(e.target.value)}
                    className="input-premium"
                    required
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Daily Focus Target (mins)</label>
                  <input
                    type="number"
                    value={editTargetMins}
                    onChange={(e) => setEditTargetMins(e.target.value)}
                    className="input-premium"
                    required
                  />
                </div>
              </div>

              <div className="form-group-row">
                <div className="form-field full-width">
                  <label className="form-label">Daily Motto / Custom Quote</label>
                  <input
                    type="text"
                    value={editQuote}
                    onChange={(e) => setEditQuote(e.target.value)}
                    className="input-premium"
                    placeholder="Enter your custom motto..."
                    required
                  />
                </div>
              </div>

              <div className="form-actions-row">
                <button type="submit" className="btn-primary save-profile-btn">
                  {savedSuccess ? <Check size={16} /> : <Save size={15} />}
                  <span>{savedSuccess ? 'Identity Saved to Local OS' : 'Save Identity Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 2. Courses & Attendance Manager */}
        {activeSection === 'courses' && (
          <div className="premium-card profile-section-card">
            <div className="console-header">
              <CheckSquare size={16} className="console-icon" />
              <h3 className="text-subtitle">Course & Attendance Manager</h3>
            </div>

            {/* Add New Course */}
            <form onSubmit={handleAddCourseSubmit} className="submodal-form">
              <div className="form-field">
                <label className="form-label">Add New Course Title</label>
                <input
                  type="text"
                  value={newCourseName}
                  onChange={(e) => setNewCourseName(e.target.value)}
                  placeholder="e.g. Data Structures & Algorithms"
                  className="input-premium"
                  required
                />
              </div>
              <div className="form-group-row">
                <div className="form-field">
                  <label className="form-label">Attended Classes</label>
                  <input
                    type="number"
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
                    value={newTotal}
                    onChange={(e) => setNewTotal(e.target.value)}
                    className="input-premium"
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn-primary submodal-btn">
                <Plus size={15} />
                <span>Add Course to Matrix</span>
              </button>
            </form>

            {/* Manage Existing Courses */}
            <div className="manager-items-list">
              <span className="form-label">Existing Courses ({Object.keys(attendance).length})</span>
              {Object.entries(attendance).map(([subj, record]) => (
                <div key={subj} className="manager-item-row">
                  <div className="item-main-info">
                    <span className="item-title-bold">{subj}</span>
                    <span className="item-sub-info">{record.attended} / {record.total} attended</span>
                  </div>
                  <div className="item-controls-row">
                    <input 
                      type="number"
                      value={record.attended}
                      onChange={(e) => updateCourse(subj, e.target.value, record.total)}
                      className="input-premium mini-input"
                      title="Attended"
                    />
                    <span>/</span>
                    <input 
                      type="number"
                      value={record.total}
                      onChange={(e) => updateCourse(subj, record.attended, e.target.value)}
                      className="input-premium mini-input"
                      title="Total"
                    />
                    <button onClick={() => deleteCourse(subj)} className="delete-item-icon-btn">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Schedule Timeline Manager */}
        {activeSection === 'timeline' && (
          <div className="premium-card profile-section-card">
            <div className="console-header">
              <Clock size={16} className="console-icon" />
              <h3 className="text-subtitle">Today's Schedule Timeline Manager</h3>
            </div>

            {/* Add Class Form */}
            <form onSubmit={handleAddClassSubmit} className="submodal-form">
              <div className="form-field">
                <label className="form-label">Add Lecture / Class Title</label>
                <input
                  type="text"
                  value={classTitle}
                  onChange={(e) => setClassTitle(e.target.value)}
                  placeholder="e.g. Operating Systems Lab"
                  className="input-premium"
                  required
                />
              </div>

              <div className="form-group-row">
                <div className="form-field">
                  <label className="form-label">Time</label>
                  <input
                    type="text"
                    value={classTime}
                    onChange={(e) => setClassTime(e.target.value)}
                    placeholder="e.g. 2:30 PM"
                    className="input-premium"
                    required
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Room / Hall</label>
                  <input
                    type="text"
                    value={classRoom}
                    onChange={(e) => setClassRoom(e.target.value)}
                    placeholder="e.g. LHC-102"
                    className="input-premium"
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary submodal-btn">
                <Plus size={15} />
                <span>Add Class to Timeline</span>
              </button>
            </form>

            {/* Manage Existing Timeline */}
            <div className="manager-items-list">
              <span className="form-label">Today Scheduled Classes ({schedule.length})</span>
              {schedule.map(item => (
                <div key={item.id} className="manager-item-row">
                  <div className="item-main-info">
                    <span className="item-title-bold">{item.title}</span>
                    <span className="item-sub-info">{item.time} &bull; {item.room}</span>
                  </div>
                  <button onClick={() => deleteScheduleClass(item.id)} className="delete-item-icon-btn">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. To-Do List Manager */}
        {activeSection === 'tasks' && (
          <div className="premium-card profile-section-card">
            <div className="console-header">
              <Zap size={16} className="console-icon" />
              <h3 className="text-subtitle">To-Do List Manager</h3>
            </div>

            {/* Add Task Form */}
            <form onSubmit={handleAddTaskSubmit} className="submodal-form">
              <div className="form-field">
                <label className="form-label">Task Title</label>
                <input
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="e.g. Finish Calculus Problem Set"
                  className="input-premium"
                  required
                />
              </div>

              <div className="form-group-row">
                <div className="form-field">
                  <label className="form-label">Estimated Time</label>
                  <input
                    type="text"
                    value={taskEstTime}
                    onChange={(e) => setTaskEstTime(e.target.value)}
                    placeholder="e.g. 45 mins"
                    className="input-premium"
                    required
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Deadline</label>
                  <input
                    type="text"
                    value={taskDeadline}
                    onChange={(e) => setTaskDeadline(e.target.value)}
                    placeholder="e.g. Tomorrow, 5 PM"
                    className="input-premium"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary submodal-btn">
                <Plus size={15} />
                <span>Queue New Action Task</span>
              </button>
            </form>

            {/* Manage Tasks */}
            <div className="manager-items-list">
              <span className="form-label">Active Action Tasks ({actions.length})</span>
              {actions.map(act => (
                <div key={act.id} className="manager-item-row">
                  <div className="item-main-info">
                    <span className={`item-title-bold ${act.completed ? 'completed' : ''}`}>{act.title}</span>
                    <span className="item-sub-info">{act.estimatedTime} &bull; Due {act.deadline}</span>
                  </div>
                  <button onClick={() => deleteAction(act.id)} className="delete-item-icon-btn">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Daily Habits Manager */}
        {activeSection === 'habits' && (
          <div className="premium-card profile-section-card">
            <div className="console-header">
              <Sparkles size={16} className="console-icon" />
              <h3 className="text-subtitle">Daily Habits Manager</h3>
            </div>

            {/* Add Habit Form */}
            <form onSubmit={handleAddHabitSubmit} className="submodal-form">
              <div className="form-field">
                <label className="form-label">New Habit Title</label>
                <input
                  type="text"
                  value={newHabitName}
                  onChange={(e) => setNewHabitName(e.target.value)}
                  placeholder="e.g. Competitive Coding, Morning Yoga"
                  className="input-premium"
                  required
                />
              </div>
              <button type="submit" className="btn-primary submodal-btn">
                <Plus size={15} />
                <span>Add Habit to Routine</span>
              </button>
            </form>

            {/* Manage Habits */}
            <div className="manager-items-list">
              <span className="form-label">Active Habits Routine ({habits.length})</span>
              {habits.map(h => (
                <div key={h.id} className="manager-item-row">
                  <input
                    type="text"
                    value={editingHabitNames[h.id] !== undefined ? editingHabitNames[h.id] : h.name}
                    onChange={(e) => setEditingHabitNames(prev => ({ ...prev, [h.id]: e.target.value }))}
                    onBlur={() => handleSaveHabitName(h.id)}
                    className="input-premium item-title-bold"
                  />
                  <div className="item-controls-row">
                    <button onClick={() => handleSaveHabitName(h.id)} className="delete-item-icon-btn">
                      <Save size={14} />
                    </button>
                    <button onClick={() => deleteHabit(h.id)} className="delete-item-icon-btn">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. OS & App Settings Section */}
        {activeSection === 'settings' && (
          <div className="premium-card profile-section-card">
            <div className="console-header">
              <Settings size={16} className="console-icon" />
              <h3 className="text-subtitle">OS & Application Preferences</h3>
            </div>

            <div className="settings-options-list">
              <div className="setting-row">
                <div className="setting-meta">
                  <span className="setting-title">Aesthetics & Palette</span>
                  <span className="setting-desc">Obsidian Deep Black (#000000) glassmorphic palette</span>
                </div>
                <span className="setting-badge-active">Obsidian Theme Active</span>
              </div>

              <div className="setting-row">
                <div className="setting-meta">
                  <span className="setting-title">Audio & Sound FX</span>
                  <span className="setting-desc">Focus timer chimes & streak completion sounds</span>
                </div>
                <button 
                  onClick={() => setSoundEnabled(!soundEnabled)} 
                  className={`toggle-switch ${soundEnabled ? 'on' : ''}`}
                >
                  <span className="switch-thumb"></span>
                </button>
              </div>

              <div className="setting-row">
                <div className="setting-meta">
                  <span className="setting-title">Study Reminders & Notifications</span>
                  <span className="setting-desc">Alerts for low attendance & upcoming assignments</span>
                </div>
                <button 
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)} 
                  className={`toggle-switch ${notificationsEnabled ? 'on' : ''}`}
                >
                  <span className="switch-thumb"></span>
                </button>
              </div>

              <div className="setting-row">
                <div className="setting-meta">
                  <span className="setting-title">Haptic Feedback</span>
                  <span className="setting-desc">Vibration pulses on habit completion and check-ins</span>
                </div>
                <button 
                  onClick={() => setHapticsEnabled(!hapticsEnabled)} 
                  className={`toggle-switch ${hapticsEnabled ? 'on' : ''}`}
                >
                  <span className="switch-thumb"></span>
                </button>
              </div>

              <div className="setting-row">
                <div className="setting-meta">
                  <span className="setting-title">PWA & Offline Service Worker</span>
                  <span className="setting-desc">Cache static assets locally for offline use</span>
                </div>
                <div className="setting-status-pill">
                  <ShieldCheck size={12} />
                  <span>Cache Active</span>
                </div>
              </div>

              <button onClick={handleSaveSettings} className="btn-primary save-profile-btn">
                {settingsSaved ? <Check size={16} /> : <Save size={15} />}
                <span>{settingsSaved ? 'Settings Saved' : 'Save OS Preferences'}</span>
              </button>
            </div>
          </div>
        )}

        {/* 7. Dashboard Simulator Section */}
        {activeSection === 'simulator' && (
          <div className="premium-card profile-section-card">
            <div className="console-header">
              <Cpu size={16} className="console-icon" />
              <h3 className="text-subtitle">Dashboard Simulator</h3>
            </div>
            <p className="console-desc">
              StudentOS dynamically morphs the dashboard widgets depending on the hour. Force simulated times below to preview the morning, afternoon, evening, and night views.
            </p>

            <div className="sim-buttons-grid">
              {times.map(t => {
                const Icon = t.icon;
                const isSelected = timeOfDayOverride === t.id || (!timeOfDayOverride && timeOfDay === t.id);
                return (
                  <button
                    key={t.id}
                    onClick={() => setTimeOfDayOverride(t.id)}
                    className={`sim-btn ${isSelected ? 'active' : ''}`}
                    aria-label={`Simulate ${t.id}`}
                  >
                    <Icon size={16} />
                    <div className="sim-btn-meta">
                      <span className="sim-title">{t.id}</span>
                      <span className="sim-sub">{t.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {timeOfDayOverride && (
              <button 
                onClick={() => setTimeOfDayOverride(null)}
                className="reset-override-btn"
              >
                Reset to Actual Local Time
              </button>
            )}
          </div>
        )}

        {/* 8. Data & Storage Section */}
        {activeSection === 'data' && (
          <div className="premium-card profile-section-card">
            <div className="console-header">
              <Database size={16} className="console-icon" />
              <h3 className="text-subtitle">Data Storage & Backup</h3>
            </div>

            <div className="data-management-list">
              <div className="storage-summary-box">
                <div className="storage-meta">
                  <HardDrive size={16} className="storage-icon" />
                  <div className="storage-text">
                    <span className="storage-title">Local Storage Persistence</span>
                    <span className="storage-sub">All custom edits are stored locally in your browser</span>
                  </div>
                </div>
                <span className="storage-size">~12.4 KB Used</span>
              </div>

              <div className="data-action-row">
                <div className="action-desc-col">
                  <span className="action-title">Export OS Backup</span>
                  <span className="action-sub">Download your courses, stats, and profile as a JSON file</span>
                </div>
                <button onClick={handleExportData} className="add-mini-btn export-btn">
                  <Download size={13} />
                  <span>Export JSON</span>
                </button>
              </div>

              <div className="data-action-row">
                <div className="action-desc-col">
                  <span className="action-title">Sign Out of StudentOS</span>
                  <span className="action-sub">Sign out of your active Firebase session</span>
                </div>
                <button 
                  onClick={logout} 
                  className="reset-data-btn" 
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.04)', 
                    color: 'var(--text-primary)', 
                    borderColor: 'var(--border-color)' 
                  }}
                >
                  <LogOut size={13} />
                  <span>Sign Out</span>
                </button>
              </div>

              <div className="data-action-row danger-zone">
                <div className="action-desc-col">
                  <span className="action-title">Reset to Prototype Defaults</span>
                  <span className="action-sub">Clear custom edits and restore original engineering demo state</span>
                </div>
                <button onClick={resetAllData} className="reset-data-btn">
                  <RotateCcw size={13} />
                  <span>Reset All Data</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <style>{`
        .profile-header-container {
          position: relative;
          display: flex;
          align-items: center;
          gap: var(--space-md);
          margin-top: var(--space-sm);
        }

        .avatar-wrapper {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
        }

        .profile-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .profile-name {
          font-size: 20px;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        .profile-role {
          font-size: 12px;
          color: var(--text-secondary);
          font-weight: 500;
        }

        /* Top-Right Professional Menu Button */
        .profile-menu-toggle-btn {
          margin-left: auto;
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: var(--bg-glass);
          border: var(--border-premium);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: var(--shadow-premium);
          transition: all var(--transition-fast);
          z-index: 190;
        }

        .profile-menu-toggle-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .profile-menu-toggle-btn.active {
          background: var(--text-primary);
          color: var(--bg-primary);
          border-color: var(--text-primary);
        }

        /* Full Height Slide-in Professional Menu Drawer - Minimalist Solid Aesthetic */
        .pro-drawer-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          z-index: 300;
          display: flex;
          justify-content: flex-end;
        }

        .pro-drawer-panel {
          width: 100%;
          max-width: 380px;
          height: 100vh;
          background: #000000;
          border-left: 1px solid var(--border-color);
          box-shadow: -10px 0 30px rgba(0, 0, 0, 0.9);
          display: flex;
          flex-direction: column;
          animation: slideInRight 0.25s var(--ease-premium);
        }

        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        .pro-drawer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--space-lg);
          border-bottom: 1px solid var(--border-color);
          background: #000000;
        }

        .pro-drawer-title-col {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .pro-logo-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .pro-logo-icon {
          color: var(--text-primary);
        }

        .pro-app-title {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: -0.01em;
        }

        .pro-app-subtitle {
          font-size: 11px;
          color: var(--text-muted);
        }

        .pro-drawer-close-btn {
          background: #080808;
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .pro-drawer-close-btn:hover {
          background: #141414;
          color: var(--text-primary);
        }

        /* Student Mini Card inside Drawer */
        .pro-student-mini-card {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: var(--space-md);
          padding: 12px;
          background: #080808;
          border: 1px solid var(--border-color);
          border-radius: 14px;
        }

        .mini-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #121212;
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
        }

        .mini-meta {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .mini-name {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .mini-branch {
          font-size: 10px;
          color: var(--text-muted);
        }

        .mini-streak-pill {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          font-weight: 600;
          color: #FFFFFF;
          background: #121212;
          padding: 4px 8px;
          border-radius: 8px;
          border: 1px solid var(--border-color);
        }

        .streak-fire {
          color: #FFFFFF;
        }

        /* Drawer Scroll Body */
        .pro-drawer-scroll-body {
          flex: 1;
          overflow-y: auto;
          padding: 0 var(--space-md) var(--space-md) var(--space-md);
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
          scrollbar-width: none;
        }

        .pro-drawer-scroll-body::-webkit-scrollbar {
          display: none;
        }

        .pro-drawer-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .pro-group-title {
          font-size: 10px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-muted);
          padding-left: 4px;
        }

        .pro-group-items {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .pro-drawer-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          background: #000000;
          border: 1px solid transparent;
          border-radius: 12px;
          color: var(--text-secondary);
          cursor: pointer;
          text-align: left;
          width: 100%;
          transition: all var(--transition-fast);
        }

        .pro-drawer-item:hover {
          background: #0D0D0D;
          color: var(--text-primary);
        }

        .pro-drawer-item.active {
          background: #121212;
          border-color: var(--border-color-active);
          color: var(--text-primary);
        }

        .item-icon-wrapper {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: #0A0A0A;
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: color var(--transition-fast);
        }

        .pro-drawer-item.active .item-icon-wrapper {
          background: var(--text-primary);
          color: var(--bg-primary);
        }

        .item-text-col {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

        .item-title {
          font-size: 13px;
          font-weight: 600;
        }

        .item-desc {
          font-size: 10px;
          color: var(--text-muted);
        }

        .item-badge-pill {
          margin-left: auto;
          font-size: 10px;
          font-weight: 600;
          color: var(--text-secondary);
          background: #080808;
          padding: 3px 8px;
          border-radius: 6px;
          border: 1px solid var(--border-color);
        }

        /* Drawer Footer Bar */
        .pro-drawer-footer {
          padding: var(--space-md);
          border-top: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          gap: 10px;
          background: #000000;
        }

        .drawer-footer-actions {
          display: flex;
          gap: 8px;
        }

        .footer-quick-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          color: var(--text-secondary);
          font-size: 11px;
          font-weight: 600;
          padding: 8px 10px;
          border-radius: 10px;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .footer-quick-btn:hover {
          background: rgba(255, 255, 255, 0.06);
          color: var(--text-primary);
        }

        .footer-quick-btn.active {
          color: var(--accent-green);
          border-color: rgba(72, 154, 126, 0.2);
        }

        .footer-quick-btn.theme-toggle-btn {
          color: var(--accent-gold);
          border-color: rgba(197, 168, 128, 0.2);
          background: rgba(197, 168, 128, 0.05);
        }

        .footer-quick-btn.theme-toggle-btn:hover {
          background: rgba(197, 168, 128, 0.12);
          border-color: rgba(197, 168, 128, 0.35);
          color: var(--accent-gold);
        }

        .footer-quick-btn.theme-toggle-btn.light-active {
          color: #3A6AB5;
          border-color: rgba(58, 106, 181, 0.25);
          background: rgba(58, 106, 181, 0.08);
        }

        .system-status-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 10px;
          font-weight: 500;
          color: var(--text-muted);
        }

        .shield-icon {
          color: var(--accent-green);
        }

        .profile-stats-row {
          display: flex;
          gap: 12px;
          width: 100%;
        }

        .profile-stat-box {
          flex: 1;
          background: var(--bg-glass);
          border: var(--border-premium);
          border-radius: 14px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stat-label {
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-secondary);
        }

        .stat-value {
          font-size: 15px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .profile-content-view {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }

        .profile-section-card {
          gap: var(--space-md);
        }

        .manager-items-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 8px;
        }

        .manager-item-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 12px;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 12px;
        }

        .item-main-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .item-title-bold {
          font-size: 13px;
          font-weight: 500;
          color: var(--text-primary);
        }

        .item-title-bold.completed {
          text-decoration: line-through;
          color: var(--text-muted);
        }

        .item-sub-info {
          font-size: 11px;
          color: var(--text-muted);
        }

        .item-controls-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .mini-input {
          width: 48px;
          padding: 4px 8px;
          font-size: 12px;
          text-align: center;
        }

        .delete-item-icon-btn {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: color var(--transition-fast);
        }

        .delete-item-icon-btn:hover {
          color: var(--accent-red);
        }

        /* Profile Form */
        .profile-edit-form {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }

        .form-group-row {
          display: flex;
          gap: 12px;
        }

        .form-field {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .dual-inputs {
          display: flex;
          gap: 8px;
        }

        .form-label {
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--text-secondary);
          letter-spacing: 0.04em;
        }

        .save-profile-btn {
          width: 100%;
          height: 44px;
          border-radius: 12px;
          margin-top: 4px;
        }

        /* Settings Options List */
        .settings-options-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .setting-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 14px;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 14px;
        }

        .setting-meta {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .setting-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .setting-desc {
          font-size: 11px;
          color: var(--text-muted);
        }

        .setting-badge-active {
          font-size: 10px;
          font-weight: 600;
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.06);
          padding: 4px 10px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .setting-status-pill {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 10px;
          font-weight: 600;
          color: var(--accent-green);
          background: var(--accent-green-glowing);
          padding: 4px 8px;
          border-radius: 8px;
          border: 1px solid rgba(72, 154, 126, 0.2);
        }

        /* Toggle Switches */
        .toggle-switch {
          width: 44px;
          height: 24px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          position: relative;
          cursor: pointer;
          transition: background var(--transition-fast);
        }

        .toggle-switch.on {
          background: var(--text-primary);
        }

        .switch-thumb {
          position: absolute;
          top: 2px;
          left: 2px;
          width: 18px;
          height: 18px;
          background: var(--bg-primary);
          border-radius: 50%;
          transition: transform var(--transition-fast);
        }

        .toggle-switch.on .switch-thumb {
          transform: translateX(20px);
          background: var(--bg-primary);
        }

        /* Data Storage Management */
        .data-management-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .storage-summary-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 14px;
        }

        .storage-meta {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .storage-icon {
          color: var(--text-secondary);
        }

        .storage-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .storage-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .storage-sub {
          font-size: 11px;
          color: var(--text-muted);
        }

        .storage-size {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .data-action-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 14px;
        }

        .data-action-row.danger-zone {
          border-color: rgba(224, 92, 92, 0.15);
        }

        .action-desc-col {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .action-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .action-sub {
          font-size: 11px;
          color: var(--text-muted);
        }

        .export-btn {
          padding: 6px 12px;
        }

        .console-header {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .console-icon {
          color: var(--accent-gold);
        }

        .console-desc {
          font-size: 12px;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        .sim-buttons-grid {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .sim-btn {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          padding: 10px 14px;
          color: var(--text-secondary);
          cursor: pointer;
          text-align: left;
          width: 100%;
          transition: all var(--transition-fast);
        }

        .sim-btn:hover {
          background: rgba(255, 255, 255, 0.03);
          color: var(--text-primary);
        }

        .sim-btn.active {
          background: var(--text-primary);
          color: var(--bg-primary);
          border-color: var(--text-primary);
        }

        .sim-btn-meta {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

        .sim-title {
          font-size: 13px;
          font-weight: 600;
        }

        .sim-sub {
          font-size: 10px;
          opacity: 0.8;
        }

        .reset-override-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          text-decoration: underline;
          cursor: pointer;
          font-size: 11px;
          align-self: center;
          padding: 4px;
        }

        .reset-data-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: rgba(224, 92, 92, 0.08);
          color: var(--accent-red);
          border: 1px solid rgba(224, 92, 92, 0.15);
          padding: 8px 14px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
          width: fit-content;
        }

        .reset-data-btn:hover {
          background: rgba(224, 92, 92, 0.15);
        }
      `}</style>
    </div>
  );
};

export default ProfileTab;
