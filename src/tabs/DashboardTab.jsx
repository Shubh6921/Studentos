import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import HeroCard from '../components/HeroCard';
import ActionCard from '../components/ActionCard';
import TimelineCard from '../components/TimelineCard';
import AttendanceWarning from '../components/AttendanceWarning';
import HabitCircle from '../components/HabitCircle';
import FocusTimer from '../components/FocusTimer';
import InsightCard from '../components/InsightCard';

const DashboardTab = () => {
  const { timeOfDay } = useContext(AppContext);

  // Dynamic composition based on Time of Day
  const renderDashboardWidgets = () => {
    switch (timeOfDay) {
      case 'Morning':
      case 'Afternoon':
        return (
          <>
            <HeroCard />
            <ActionCard />
            <TimelineCard />
            <AttendanceWarning />
            <HabitCircle />
            <InsightCard />
          </>
        );
      case 'Evening':
        return (
          <>
            <HeroCard />
            <ActionCard />
            <FocusTimer compact={true} />
            <HabitCircle />
            <InsightCard />
          </>
        );
      case 'Night':
      default:
        return (
          <>
            <HeroCard />
            <ActionCard />
            <HabitCircle />
            <InsightCard />
          </>
        );
    }
  };

  return (
    <div className="content-area dashboard-tab-container">
      {renderDashboardWidgets()}

      <style>{`
        .dashboard-tab-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding-bottom: 24px;
          animation: fadeIn 0.4s var(--ease-premium);
        }
      `}</style>
    </div>
  );
};

export default DashboardTab;
