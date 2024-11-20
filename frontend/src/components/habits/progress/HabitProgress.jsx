import { ProgressContainer } from './progressStyles';

function HabitProgress({ currentStreak, maxStreak }) {
  // Calculate the percentage of the progress based on the current streak and maximum streak
  const progress = maxStreak > 0 ? (currentStreak / maxStreak) * 100 : 0;

  return (
    <ProgressContainer>
      {/* For now, just display the current streak */}
      <span style={{ marginLeft: '8px', color: 'var(--text-color)' }}>
        {currentStreak} days
      </span>
    </ProgressContainer>
  );
}

export default HabitProgress;
