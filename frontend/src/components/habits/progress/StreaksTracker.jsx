import React, { useState } from 'react';
import { StreaksContainer } from './progressStyles';
import DateBlock from './DateBlock';
import StreakLineComponent from './StreakLine';
import { addHabitProgress } from '../../../services/habitService';

const StreaksTracker = ({ streakData = [], habitId }) => {
  const [streakStatuses, setStreakStatuses] = useState(streakData.map(item => item.status || 'default'));

  const handleStatusChange = async (index, newStatus, dateISO) => {
    const updatedStatuses = [...streakStatuses];
    updatedStatuses[index] = newStatus;
    setStreakStatuses(updatedStatuses);

    try {
      // Use habitService to send updated status to the backend
      await addHabitProgress(habitId, dateISO, newStatus);
    } catch (error) {
      console.error('Failed to update habit status', error);
    }
  };

  return (
    <StreaksContainer>
      {streakData.map((streak, index) => {
        const { day, dateISO, isToday } = streak || {};

        return (
          <React.Fragment key={index}>
            <DateBlock
              day={String(day)}
              date={String(new Date(dateISO).getDate())}
              isToday={isToday}
              initialStatus={streakStatuses[index]}
              onStatusChange={(newStatus) => handleStatusChange(index, newStatus, dateISO)}
            />
            {index < streakData.length - 1 && (
              <StreakLineComponent
                status={streakStatuses[index]}
              />
            )}
          </React.Fragment>
        );
      })}
    </StreaksContainer>
  );
};

export default StreaksTracker;
