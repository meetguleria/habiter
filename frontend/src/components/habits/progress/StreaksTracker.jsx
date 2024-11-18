import React from'react';
import { StreaksContainer } from './progressStyles';
import DateBlock from './DateBlock';
import StreakLineComponent from './StreakLine';

const StreaksTracker = ({ streakData = [] }) => {
  if (!Array.isArray(streakData)) {
    console.error("Expected streakData to be an array, but got:", streakData);
    return null; // Render nothing if data is invalid
  }

  return (
    <StreaksContainer>
      {streakData.map((streak, index) => {
        const { day, dateISO, active, isToday } = streak || {};

        const dayString = day ? String(day) : '';
        const dateString = dateISO ? String(new Date(dateISO).getDate()) : '';

        return (
          <React.Fragment key={`streak-fragment-${index}`}>
            <DateBlock
              key={`dateblock-${index}`}
              day={dayString}
              date={dateString}
              isToday={isToday}
              isSuccess={active}
              isFailure={!active && !isToday}
              onClick={() => {
                console.log(`Date clicked: ${dateISO}`);
              }}
            />
            {index < streakData.length - 1 && (
              <StreakLineComponent
                key={`streakline-${index}`}
                color={active ? '#1DB954' : '#FF8C00'}
              />
            )}
          </React.Fragment>
        );
      })}
    </StreaksContainer>
  );
};

export default StreaksTracker;
