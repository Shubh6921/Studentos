import React, { createContext, useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { getUserData, saveUserData } from '../supabase/db';

export const AppContext = createContext();

const initialHabits = [
  { id: 'study', name: 'Study', completed: false, icon: 'BookOpen' },
  { id: 'water', name: 'Water', completed: false, icon: 'Droplet' },
  { id: 'gym', name: 'Gym', completed: false, icon: 'Dumbbell' },
  { id: 'meditation', name: 'Meditate', completed: false, icon: 'Wind' },
  { id: 'sleep', name: 'Sleep', completed: false, icon: 'Moon' },
];

const initialSchedule = [
  { id: 'physics', time: '8:30 AM', title: 'Physics I Lecture', status: 'completed', instructor: 'Dr. Sen', room: 'LHC-101' },
  { id: 'math', time: '10:30 AM', title: 'Calculus & Algebra', status: 'completed', instructor: 'Prof. Rao', room: 'LHC-203' },
  { id: 'electronics', time: '1:00 PM', title: 'Basic Electronics Lab', status: 'completed', instructor: 'Dr. Mehta', room: 'Lab-4' },
  { id: 'workshop', time: '4:00 PM', title: 'Engineering Workshop', status: 'upcoming', instructor: 'Mr. Joshi', room: 'WS-2' },
  { id: 'seminar', time: '6:30 PM', title: 'AI & Engineering Seminar', status: 'upcoming', instructor: 'Guest Speaker', room: 'Audi-A' },
];

const initialActions = [
  { id: 'act-math', title: 'Revise Mathematics Calculus Notes', estimatedTime: '30 mins', deadline: 'Today, 8 PM', type: 'revision', completed: false },
  { id: 'act-physics', title: 'Finish Physics Lab Assignment', estimatedTime: '1 hr 15 mins', deadline: 'Tomorrow', type: 'assignment', completed: false },
  { id: 'act-electronics', title: 'Pre-read Electronics Lab Guide', estimatedTime: '20 mins', deadline: 'Aug 6', type: 'prep', completed: false },
];

const initialAttendance = {
  'Basic Electronics': { attended: 14, total: 20 },
  'Calculus & Algebra': { attended: 18, total: 22 },
  'Physics I': { attended: 19, total: 23 },
  'Engineering Workshop': { attended: 15, total: 18 },
};

const getSystemTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'Morning';
  if (hour >= 12 && hour < 17) return 'Afternoon';
  if (hour >= 17 && hour < 21) return 'Evening';
  return 'Night';
};

const loadStorage = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (e) {
    return fallback;
  }
};

const saveStorage = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {}
};

export const AppProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  // Global Tab Navigation State
  const [activeTab, setActiveTab] = useState('dashboard');

  // Config & Metadata state
  const [userName, setUserName] = useState(() => loadStorage('studentos_userName', 'Shubham'));
  const [studentMeta, setStudentMeta] = useState(() => loadStorage('studentos_studentMeta', {
    branch: 'Computer Engineering',
    year: '1st Year',
    section: 'Section A'
  }));
  const [streak, setStreak] = useState(() => loadStorage('studentos_streak', 18));
  const [semesterDay, setSemesterDay] = useState(() => loadStorage('studentos_semesterDay', 28));
  const [week, setWeek] = useState(() => loadStorage('studentos_week', 5));
  
  // Dynamic Time of Day
  const [timeOfDayOverride, setTimeOfDayOverride] = useState(null);
  const [timeOfDay, setTimeOfDay] = useState(getSystemTimeOfDay());
  
  useEffect(() => {
    if (timeOfDayOverride) {
      setTimeOfDay(timeOfDayOverride);
    } else {
      setTimeOfDay(getSystemTimeOfDay());
      const interval = setInterval(() => {
        if (!timeOfDayOverride) setTimeOfDay(getSystemTimeOfDay());
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [timeOfDayOverride]);

  // Core App states
  const [habits, setHabits] = useState(() => loadStorage('studentos_habits', initialHabits));
  const [schedule, setSchedule] = useState(() => loadStorage('studentos_schedule', initialSchedule));
  const [actions, setActions] = useState(() => loadStorage('studentos_actions', initialActions));
  const [attendance, setAttendance] = useState(() => loadStorage('studentos_attendance', initialAttendance));
  const [warnings, setWarnings] = useState([]);
  
  // Quick Journal reflection state
  const [journal, setJournal] = useState(() => loadStorage('studentos_journal', {
    morning: '',
    evening: '',
    completedToday: { morning: false, evening: false },
    entries: []  // { id, type, text, date, dateLabel, mood }
  }));

  // Editable reflection prompts
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
  const [journalPrompts, setJournalPrompts] = useState(() =>
    loadStorage('studentos_journal_prompts', DEFAULT_PROMPTS)
  );
  
  const saveJournalPrompts = (type, newList) => {
    setJournalPrompts(prev => ({ ...prev, [type]: newList }));
  };
  
  // Initial default expenses demo (in Rupees)
  const initialExpenses = [
    { id: 1, title: 'Physics Lab Manual', amount: 450, category: 'Academics', paymentMethod: 'Card', date: 'Today, 2:15 PM' },
    { id: 2, title: 'Espresso & Sandwich', amount: 180, category: 'Food', paymentMethod: 'UPI', date: 'Today, 11:30 AM' },
    { id: 3, title: 'Campus Bus Pass', amount: 350, category: 'Transport', paymentMethod: 'Cash', date: 'Yesterday' }
  ];

  // Fast elements entries
  const [notes, setNotes] = useState(() => loadStorage('studentos_notes', []));
  const [expenses, setExpenses] = useState(() => loadStorage('studentos_expenses', initialExpenses));
  const [monthlyBudget, setMonthlyBudget] = useState(() => loadStorage('studentos_monthlyBudget', 5000));
  
  // Focus Timer state
  const [focusActive, setFocusActive] = useState(false);
  const [focusTimeLeft, setFocusTimeLeft] = useState(25 * 60);
  const [focusDuration, setFocusDuration] = useState(25 * 60);
  const [studyProgress, setStudyProgress] = useState(() => loadStorage('studentos_studyProgress', { targetMinutes: 90, completedMinutes: 35 }));
  const timerRef = useRef(null);

  // Sync warnings and schedule based on timeOfDay and attendance values
  useEffect(() => {
    const hour = timeOfDayOverride ? 
      (timeOfDayOverride === 'Morning' ? 9 : 
       timeOfDayOverride === 'Afternoon' ? 14 : 
       timeOfDayOverride === 'Evening' ? 18 : 22) 
      : new Date().getHours();
      
    setSchedule(prev => {
      let changed = false;
      const updated = prev.map(item => {
        const [timeStr, ampm] = item.time.split(' ');
        const [hStr, mStr] = timeStr.split(':');
        let itemHour = parseInt(hStr) || 9;
        if (ampm === 'PM' && itemHour !== 12) itemHour += 12;
        if (ampm === 'AM' && itemHour === 12) itemHour = 0;
        
        let status = 'upcoming';
        if (itemHour < hour - 1) {
          status = 'completed';
        } else if (itemHour >= hour - 1 && itemHour <= hour + 1) {
          status = 'live';
        }
        if (item.status !== status) changed = true;
        return { ...item, status };
      });
      return changed ? updated : prev;
    });

    // Dynamic warnings (Max 3)
    const newWarnings = [];
    
    Object.entries(attendance).forEach(([subject, record]) => {
      if (record.total > 0) {
        const percentage = (record.attended / record.total) * 100;
        if (percentage < 75) {
          newWarnings.push({
            id: `warn-att-${subject}`,
            text: `Attendance in ${subject} falls below 75% (${percentage.toFixed(0)}%)`,
            type: 'danger'
          });
        }
      }
    });

    const incompleteAssignment = actions.find(a => a.type === 'assignment' && !a.completed);
    if (incompleteAssignment) {
      newWarnings.push({
        id: 'warn-assign',
        text: `${incompleteAssignment.title} due soon`,
        type: 'warning'
      });
    }

    if (timeOfDay === 'Night' && !journal.completedToday.evening) {
      newWarnings.push({
        id: 'warn-journal',
        text: 'Evening Reflection skipped yesterday',
        type: 'info'
      });
    } else if (timeOfDay === 'Afternoon' && !journal.completedToday.morning) {
      newWarnings.push({
        id: 'warn-journal-morning',
        text: 'Morning Reflection skipped today',
        type: 'info'
      });
    }

    setWarnings(newWarnings.slice(0, 3));
  }, [timeOfDay, attendance, actions, journal.completedToday, timeOfDayOverride]);

  // Custom user motto / quote
  const [customQuote, setCustomQuote] = useState(() => loadStorage('studentos_custom_quote', 'Relentless execution beats passive intent.'));

  // Theme Mode (Dark/Light)
  const [theme, setTheme] = useState(() => loadStorage('studentos_theme', 'dark'));

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Firestore Sync States
  const [dataLoaded, setDataLoaded] = useState(false);
  const isInitialLoad = useRef(true);

  // 1. Initial Load from Firestore when user logs in
  useEffect(() => {
    if (!user) {
      setDataLoaded(false);
      isInitialLoad.current = true;
      return;
    }

    const loadData = async () => {
      try {
        const firestoreData = await getUserData(user.id);
        if (firestoreData) {
          if (firestoreData.userName) setUserName(firestoreData.userName);
          if (firestoreData.studentMeta) setStudentMeta(firestoreData.studentMeta);
          if (firestoreData.streak !== undefined) setStreak(firestoreData.streak);
          if (firestoreData.semesterDay !== undefined) setSemesterDay(firestoreData.semesterDay);
          if (firestoreData.week !== undefined) setWeek(firestoreData.week);
          if (firestoreData.habits) setHabits(firestoreData.habits);
          if (firestoreData.schedule) setSchedule(firestoreData.schedule);
          if (firestoreData.actions) setActions(firestoreData.actions);
          if (firestoreData.attendance) setAttendance(firestoreData.attendance);
          if (firestoreData.journal) setJournal(firestoreData.journal);
          if (firestoreData.journalPrompts) setJournalPrompts(firestoreData.journalPrompts);
          if (firestoreData.notes) setNotes(firestoreData.notes);
          if (firestoreData.expenses) setExpenses(firestoreData.expenses);
          if (firestoreData.monthlyBudget !== undefined) setMonthlyBudget(firestoreData.monthlyBudget);
          if (firestoreData.studyProgress) setStudyProgress(firestoreData.studyProgress);
          if (firestoreData.theme) setTheme(firestoreData.theme);
          if (firestoreData.customQuote !== undefined) setCustomQuote(firestoreData.customQuote);
        } else {
          // Document does not exist, initialize Supabase with default data
          const signUpName = user.user_metadata?.display_name || user.email?.split('@')[0] || 'Student';
          setUserName(signUpName);
          const defaultData = {
            userName: signUpName,
            studentMeta,
            streak,
            semesterDay,
            week,
            habits,
            schedule,
            actions,
            attendance,
            journal,
            journalPrompts,
            notes,
            expenses,
            monthlyBudget,
            studyProgress,
            theme,
            customQuote,
          };
          await saveUserData(user.id, defaultData);
        }
      } catch (error) {
        console.error("Error loading user data from Supabase:", error);
      } finally {
        setDataLoaded(true);
        setTimeout(() => {
          isInitialLoad.current = false;
        }, 150);
      }
    };

    loadData();
  }, [user]);

  // 2. Debounced save to Supabase on local state change
  useEffect(() => {
    if (!user || !dataLoaded || isInitialLoad.current) return;

    const dataToSave = {
      userName,
      studentMeta,
      streak,
      semesterDay,
      week,
      habits,
      schedule,
      actions,
      attendance,
      journal,
      journalPrompts,
      notes,
      expenses,
      monthlyBudget,
      studyProgress,
      theme,
      customQuote,
    };

    const handler = setTimeout(() => {
      saveUserData(user.id, dataToSave);
      // Backup to localStorage
      saveStorage('studentos_userName', userName);
      saveStorage('studentos_studentMeta', studentMeta);
      saveStorage('studentos_streak', streak);
      saveStorage('studentos_semesterDay', semesterDay);
      saveStorage('studentos_week', week);
      saveStorage('studentos_habits', habits);
      saveStorage('studentos_schedule', schedule);
      saveStorage('studentos_actions', actions);
      saveStorage('studentos_attendance', attendance);
      saveStorage('studentos_journal', journal);
      saveStorage('studentos_journal_prompts', journalPrompts);
      saveStorage('studentos_notes', notes);
      saveStorage('studentos_expenses', expenses);
      saveStorage('studentos_monthlyBudget', monthlyBudget);
      saveStorage('studentos_studyProgress', studyProgress);
      saveStorage('studentos_theme', theme);
      saveStorage('studentos_custom_quote', customQuote);
    }, 1500);

    return () => clearTimeout(handler);
  }, [
    user,
    dataLoaded,
    userName,
    studentMeta,
    streak,
    semesterDay,
    week,
    habits,
    schedule,
    actions,
    attendance,
    journal,
    journalPrompts,
    notes,
    expenses,
    monthlyBudget,
    studyProgress,
    theme,
    customQuote,
  ]);

  // CRUD Functions

  // 1. Profile customization
  const updateProfile = (name, branch, year, section, semDay, currentWeek, targetMins, quote) => {
    if (name) setUserName(name.trim());
    setStudentMeta({
      branch: branch || studentMeta.branch,
      year: year || studentMeta.year,
      section: section || studentMeta.section
    });
    if (semDay) setSemesterDay(parseInt(semDay));
    if (currentWeek) setWeek(parseInt(currentWeek));
    if (targetMins) setStudyProgress(prev => ({ ...prev, targetMinutes: parseInt(targetMins) }));
    if (quote !== undefined) setCustomQuote(quote.trim());
  };

  // 2. Course / Attendance management
  const addCourse = (subjectName, attended = 0, total = 0) => {
    if (!subjectName.trim()) return;
    setAttendance(prev => ({
      ...prev,
      [subjectName.trim()]: { attended: parseInt(attended) || 0, total: parseInt(total) || 0 }
    }));
  };

  const updateCourse = (subjectName, attended, total) => {
    setAttendance(prev => ({
      ...prev,
      [subjectName]: { attended: Math.max(0, parseInt(attended) || 0), total: Math.max(0, parseInt(total) || 0) }
    }));
  };

  const deleteCourse = (subjectName) => {
    setAttendance(prev => {
      const copy = { ...prev };
      delete copy[subjectName];
      return copy;
    });
  };

  // 3. Schedule / Timeline management
  const addScheduleClass = (title, time, instructor, room) => {
    if (!title.trim()) return;
    const newItem = {
      id: 'sch-' + Date.now(),
      time: time || '2:00 PM',
      title: title.trim(),
      status: 'upcoming',
      instructor: instructor || 'Prof. Faculty',
      room: room || 'LHC-101'
    };
    setSchedule(prev => [...prev, newItem]);
  };

  const deleteScheduleClass = (id) => {
    setSchedule(prev => prev.filter(item => item.id !== id));
  };

  // 4. Action Queue / Task management
  const addAction = (title, estimatedTime, deadline) => {
    if (!title.trim()) return;
    const newAction = {
      id: 'act-' + Date.now(),
      title: title.trim(),
      estimatedTime: estimatedTime || '30 mins',
      deadline: deadline || 'Today',
      type: 'assignment',
      completed: false
    };
    setActions(prev => [newAction, ...prev]);
  };

  const deleteAction = (id) => {
    setActions(prev => prev.filter(item => item.id !== id));
  };

  // 5. Habits management
  const addHabit = (name, icon = 'BookOpen') => {
    if (!name.trim()) return;
    const newHabit = {
      id: 'h-' + Date.now(),
      name: name.trim(),
      completed: false,
      icon: icon || 'BookOpen'
    };
    setHabits(prev => [...prev, newHabit]);
  };

  const deleteHabit = (id) => {
    setHabits(prev => prev.filter(h => h.id !== id));
  };

  const updateHabit = (id, newName, newIcon) => {
    setHabits(prev => prev.map(h => {
      if (h.id === id) {
        return {
          ...h,
          name: newName !== undefined ? newName.trim() : h.name,
          icon: newIcon || h.icon
        };
      }
      return h;
    }));
  };

  // Standard action handlers
  const completeAction = (id) => {
    setActions(prev => prev.map(a => a.id === id ? { ...a, completed: true } : a));
    setStreak(s => s + 1);
  };

  const toggleHabit = (id) => {
    setHabits(prev => prev.map(h => {
      if (h.id === id) {
        const nextCompleted = !h.completed;
        if (nextCompleted) setStreak(s => s + 1);
        return { ...h, completed: nextCompleted };
      }
      return h;
    }));
  };

  const saveJournal = (type, text) => {
    const now = new Date();
    const newEntry = {
      id: Date.now(),
      type,
      text,
      date: now.toISOString(),
      dateLabel: now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }),
      timeLabel: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setJournal(prev => ({
      ...prev,
      [type]: text,
      completedToday: {
        ...prev.completedToday,
        [type]: true
      },
      entries: [newEntry, ...(prev.entries || [])]
    }));
    setStreak(s => s + 1);
  };

  const addNote = (content) => {
    if (!content.trim()) return;
    const newNote = {
      id: Date.now(),
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setNotes(prev => [newNote, ...prev]);
  };

  const addExpense = (title, amount, category = 'Academics', paymentMethod = 'Card') => {
    if (!title.trim() || isNaN(amount)) return;
    const newExpense = {
      id: Date.now(),
      title: title.trim(),
      amount: parseFloat(amount),
      category,
      paymentMethod,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today'
    };
    setExpenses(prev => [newExpense, ...prev]);
  };

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(exp => exp.id !== id));
  };

  const updateMonthlyBudget = (newLimit) => {
    const parsed = parseFloat(newLimit);
    if (!isNaN(parsed) && parsed > 0) {
      setMonthlyBudget(parsed);
    }
  };

  const logAttendance = (subject, attended) => {
    setAttendance(prev => {
      const current = prev[subject] || { attended: 0, total: 0 };
      return {
        ...prev,
        [subject]: {
          attended: current.attended + (attended ? 1 : 0),
          total: current.total + 1
        }
      };
    });
  };

  const markAllAttendanceAttended = () => {
    setAttendance(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(subj => {
        updated[subj] = {
          attended: updated[subj].attended + 1,
          total: updated[subj].total + 1
        };
      });
      return updated;
    });
  };

  const startFocus = (minutes = 25) => {
    clearInterval(timerRef.current);
    const secs = minutes * 60;
    setFocusTimeLeft(secs);
    setFocusDuration(secs);
    setFocusActive(true);
  };

  const resumeFocus = () => setFocusActive(true);
  const pauseFocus = () => setFocusActive(false);
  const resetFocus = () => {
    setFocusActive(false);
    setFocusTimeLeft(25 * 60);
  };

  // Reset to prototype default data
  const resetAllData = () => {
    localStorage.clear();
    const defaultData = {
      userName: 'Shubham',
      studentMeta: { branch: 'Computer Engineering', year: '1st Year', section: 'Section A' },
      streak: 18,
      semesterDay: 28,
      week: 5,
      habits: initialHabits,
      schedule: initialSchedule,
      actions: initialActions,
      attendance: initialAttendance,
      notes: [],
      expenses: [],
      journal: { morning: '', evening: '', completedToday: { morning: false, evening: false }, entries: [] },
      studyProgress: { targetMinutes: 90, completedMinutes: 35 },
      theme: 'dark',
      customQuote: 'Relentless execution beats passive intent.',
    };

    setUserName(defaultData.userName);
    setStudentMeta(defaultData.studentMeta);
    setStreak(defaultData.streak);
    setSemesterDay(defaultData.semesterDay);
    setWeek(defaultData.week);
    setHabits(defaultData.habits);
    setSchedule(defaultData.schedule);
    setActions(defaultData.actions);
    setAttendance(defaultData.attendance);
    setNotes(defaultData.notes);
    setExpenses(defaultData.expenses);
    setJournal(defaultData.journal);
    setStudyProgress(defaultData.studyProgress);
    setTheme(defaultData.theme);
    setCustomQuote(defaultData.customQuote);

    if (user) {
      saveUserData(user.id, defaultData);
    }
  };

  useEffect(() => {
    if (focusActive) {
      timerRef.current = setInterval(() => {
        setFocusTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setFocusActive(false);
            setStudyProgress(sp => ({
              ...sp,
              completedMinutes: sp.completedMinutes + 25
            }));
            setStreak(s => s + 1);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [focusActive]);

  const currentAction = actions.find(a => !a.completed) || null;

  return (
    <AppContext.Provider value={{
      activeTab,
      setActiveTab,
      userName,
      studentMeta,
      streak,
      semesterDay,
      week,
      timeOfDay,
      setTimeOfDayOverride,
      timeOfDayOverride,
      habits,
      toggleHabit,
      addHabit,
      updateHabit,
      deleteHabit,
      actions,
      addAction,
      deleteAction,
      schedule,
      addScheduleClass,
      deleteScheduleClass,
      currentAction,
      completeAction,
      warnings,
      journal,
      saveJournal,
      setJournal,
      journalPrompts,
      saveJournalPrompts,
      notes,
      addNote,
      expenses,
      addExpense,
      deleteExpense,
      monthlyBudget,
      updateMonthlyBudget,
      attendance,
      logAttendance,
      markAllAttendanceAttended,
      addCourse,
      updateCourse,
      deleteCourse,
      updateProfile,
      customQuote,
      setCustomQuote,
      resetAllData,
      focusActive,
      focusTimeLeft,
      focusDuration,
      studyProgress,
      startFocus,
      resumeFocus,
      pauseFocus,
      resetFocus,
      theme,
      setTheme,
      toggleTheme,
      dataLoaded,
    }}>
      {children}
    </AppContext.Provider>
  );
};
