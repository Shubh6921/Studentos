import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Sparkles } from 'lucide-react';

const InsightCard = () => {
  const { habits, attendance, streak, studyProgress } = useContext(AppContext);

  // Generate dynamic, premium text coach insight
  const getCoachInsight = () => {
    const lowAtt = Object.entries(attendance).find(([_, rec]) => (rec.attended / rec.total) * 100 < 75);
    if (lowAtt) {
      return {
        text: `Attendance in ${lowAtt[0]} is at ${((lowAtt[1].attended / lowAtt[1].total)*100).toFixed(0)}%. Missing one more lecture may trigger a warning.`,
        priority: 'high'
      };
    }

    const remainingHabitsCount = habits.filter(h => !h.completed).length;
    if (remainingHabitsCount > 0 && remainingHabitsCount <= 2) {
      return {
        text: `Complete ${remainingHabitsCount === 1 ? 'your final habit' : `one of your remaining ${remainingHabitsCount} habits`} today to protect your ${streak}-day streak.`,
        priority: 'medium'
      };
    }

    if (studyProgress.completedMinutes < studyProgress.targetMinutes / 2) {
      return {
        text: `Your focus time is below your typical target. Consider launching a 25-minute session to reset.`,
        priority: 'low'
      };
    }

    return {
      text: "Calculus revision is scheduled for 7:00 PM. Environment is prime for deep work.",
      priority: 'low'
    };
  };

  const insight = getCoachInsight();

  return (
    <div className={`premium-card insight-card border-${insight.priority}`}>
      <div className="insight-header">
        <Sparkles size={13} className="insight-sparkle-icon" />
        <span className="insight-tag">EXECUTIVE INSIGHT</span>
      </div>
      <p className="insight-text">{insight.text}</p>

      <style>{`
        .insight-card {
          border: 1px solid rgba(255, 255, 255, 0.06);
          background: #08080A;
          padding: 14px 16px;
          border-radius: 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .insight-header {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .insight-sparkle-icon {
          color: #C5A880;
        }

        .insight-tag {
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: var(--text-muted);
        }

        .insight-text {
          font-size: 12px;
          line-height: 1.5;
          color: #FFFFFF;
          font-weight: 400;
          letter-spacing: -0.01em;
        }

        .insight-card.border-high {
          border-left: 2px solid #E05C5C;
        }

        .insight-card.border-medium {
          border-left: 2px solid #C5A880;
        }

        .insight-card.border-low {
          border-left: 2px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
};

export default InsightCard;
