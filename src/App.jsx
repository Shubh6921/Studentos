import React, { useContext } from 'react';
import { AppProvider, AppContext } from './context/AppContext';
import { AuthProvider, AuthContext } from './context/AuthContext';
import AuthScreen from './screens/AuthScreen';
import LoadingScreen from './screens/LoadingScreen';
import DashboardTab from './tabs/DashboardTab';
import PlannerTab from './tabs/PlannerTab';
import StudyTab from './tabs/StudyTab';
import AnalyticsTab from './tabs/AnalyticsTab';
import ProfileTab from './tabs/ProfileTab';
import JournalTab from './tabs/JournalTab';
import JournalEntriesPage from './tabs/JournalEntriesPage';
import HabitsManagerPage from './tabs/HabitsManagerPage';
import FinancialPage from './tabs/FinancialPage';
import DailyArchivePage from './tabs/DailyArchivePage';
import AttendanceMatrixPage from './tabs/AttendanceMatrixPage';
import BottomNavigation from './components/BottomNavigation';
import QuickActionFAB from './components/QuickActionFAB';
import './styles/main.css';

const AppContent = () => {
  const { user, loading } = useContext(AuthContext);
  const { activeTab, setActiveTab, dataLoaded } = useContext(AppContext);

  // 1. Show loading screen while authentication is resolving
  if (loading) {
    return <LoadingScreen />;
  }

  // 2. Show auth screen if the user is not logged in
  if (!user) {
    return <AuthScreen />;
  }

  // 3. Show loading screen if user is logged in, but Firestore user data hasn't loaded yet
  if (!dataLoaded) {
    return <LoadingScreen />;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab />;
      case 'planner':
        return <PlannerTab />;
      case 'journal':
        return <JournalTab />;
      case 'journal-entries':
        return <JournalEntriesPage />;
      case 'study':
        return <StudyTab />;
      case 'analytics':
        return <AnalyticsTab />;
      case 'financial-page':
        return <FinancialPage />;
      case 'daily-archive-page':
        return <DailyArchivePage />;
      case 'attendance-matrix-page':
        return <AttendanceMatrixPage />;
      case 'profile':
        return <ProfileTab />;
      case 'edit-habits':
        return <HabitsManagerPage />;
      default:
        return <DashboardTab />;
    }
  };

  const getActiveNavTab = () => {
    if (activeTab === 'edit-habits') return 'dashboard';
    if (['financial-page', 'daily-archive-page', 'attendance-matrix-page'].includes(activeTab)) return 'analytics';
    return activeTab;
  };

  return (
    <div className="app-container">
      {/* Active Tab View */}
      {renderTabContent()}
      
      {/* Floating Action Button */}
      <QuickActionFAB />
      
      {/* Navigation Dock */}
      <BottomNavigation activeTab={getActiveNavTab()} setActiveTab={setActiveTab} />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
};

export default App;
