import styled from '@emotion/styled';
import HabitProgress from './progress/HabitProgress';
import StreaksTracker from './progress/StreaksTracker';

const CardContainer = styled.div`
  border: 1px solid var(--secondary-color);
  padding: 16px;
  border-radius: 8px;
  background-color: var(--primary-color);
  margin-bottom: 16px;
`;

const HabitTitle = styled.h3`
  color: var(--text-color);
`;

function HabitCard({ habit }) {
  // Extract necessary data from the habit object
  const { name, currentStreak, maxStreak, streakData } = habit;

  return (
    <CardContainer>
      <HabitTitle>{name}</HabitTitle>
      {/* Streak Progress Bar */}
      <HabitProgress currentStreak={currentStreak} maxStreak={maxStreak} />
      {/* Weekly Streak Tracker */}
      <StreaksTracker streakData={streakData} />
    </CardContainer>
  );
}

export default HabitCard;
