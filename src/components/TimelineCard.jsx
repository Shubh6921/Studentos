import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { CheckCircle2, Circle, Radio, MapPin, User } from 'lucide-react';

const TimelineCard = () => {
  const { schedule } = useContext(AppContext);
  
  return (
    <div className="premium-card timeline-card">
      <div className="card-header-row">
        <h3 className="card-title-caps">TODAY'S TIMELINE</h3>
        <span className="schedule-count-pill">{schedule.length} SESSIONS</span>
      </div>

      <div className="timeline-list">
        {schedule.length === 0 ? (
          <div className="empty-planner-state">
            <span>No classes scheduled for today.</span>
          </div>
        ) : (
          schedule.map((item, idx) => {
            const isCompleted = item.status === 'completed';
            const isLive = item.status === 'live';
            
            return (
              <div 
                key={item.id} 
                className={`timeline-item ${isCompleted ? 'completed' : ''} ${isLive ? 'live' : ''}`}
              >
                {/* Connector line */}
                {idx < schedule.length - 1 && <div className="connector-line"></div>}

                {/* Node indicator */}
                <div className="timeline-node">
                  {isCompleted ? (
                    <CheckCircle2 size={15} className="node-icon-completed" />
                  ) : isLive ? (
                    <div className="node-icon-live">
                      <span className="live-ping"></span>
                      <span className="live-core"></span>
                    </div>
                  ) : (
                    <Circle size={10} className="node-icon-upcoming" />
                  )}
                </div>

                {/* Event Content */}
                <div className="timeline-content">
                  <div className="timeline-time-row">
                    <span className="event-time">{item.time}</span>
                    {isLive && (
                      <span className="live-pill">
                        <Radio size={10} className="live-radio-icon" />
                        LIVE
                      </span>
                    )}
                  </div>
                  
                  <h4 className="event-title">{item.title}</h4>
                  
                  <div className="event-details">
                    {item.instructor && (
                      <div className="detail-pill">
                        <User size={10} />
                        <span>{item.instructor}</span>
                      </div>
                    )}
                    {item.room && (
                      <div className="detail-pill">
                        <MapPin size={10} />
                        <span>{item.room}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <style>{`
        .timeline-card {
          border: 1px solid rgba(255, 255, 255, 0.06);
          background: #08080A;
          gap: 16px;
          padding: 20px;
        }

        .card-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .card-title-caps {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: var(--text-secondary);
        }

        .schedule-count-pill {
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 2px 8px;
          border-radius: 10px;
        }

        .timeline-list {
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .timeline-item {
          display: flex;
          gap: 14px;
          position: relative;
          padding-bottom: 20px;
        }

        .timeline-item:last-child {
          padding-bottom: 0;
        }

        .connector-line {
          position: absolute;
          left: 7px;
          top: 16px;
          bottom: -4px;
          width: 1px;
          background: rgba(255, 255, 255, 0.08);
        }

        .timeline-item.completed .connector-line {
          background: rgba(72, 154, 126, 0.25);
        }

        .timeline-node {
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          background: #08080A;
          margin-top: 2px;
        }

        .node-icon-completed {
          color: #489A7E;
        }

        .node-icon-upcoming {
          color: var(--text-muted);
        }

        .node-icon-live {
          position: relative;
          width: 10px;
          height: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .live-core {
          width: 7px;
          height: 7px;
          background: #C5A880;
          border-radius: 50%;
        }

        .live-ping {
          position: absolute;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: rgba(197, 168, 128, 0.3);
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        @keyframes ping {
          75%, 100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }

        .timeline-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
        }

        .timeline-time-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .event-time {
          font-size: 11px;
          font-weight: 500;
          color: var(--text-secondary);
          letter-spacing: 0.02em;
        }

        .live-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: #C5A880;
          background: rgba(197, 168, 128, 0.1);
          border: 1px solid rgba(197, 168, 128, 0.25);
          padding: 1px 6px;
          border-radius: 6px;
        }

        .event-title {
          font-size: 14px;
          font-weight: 600;
          color: #FFFFFF;
          letter-spacing: -0.01em;
        }

        .timeline-item.completed .event-title {
          color: var(--text-secondary);
          text-decoration: line-through;
          opacity: 0.7;
        }

        .event-details {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 2px;
        }

        .detail-pill {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 10px;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          padding: 2px 7px;
          border-radius: 6px;
        }

        .empty-planner-state {
          padding: 16px 0;
          font-size: 12px;
          color: var(--text-muted);
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default TimelineCard;
