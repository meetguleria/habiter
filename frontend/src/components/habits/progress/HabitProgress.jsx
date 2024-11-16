import { ProgressContainer, ProgressBar, StreakBar } from './progressStyles';

function HabitProgress({ currentStreak, maxStreak }) {
  // Calculate the percentage of the progress based on the current streak and maximum streak
  const progress = maxStreak > 0 ? (currentStreak / maxStreak) * 100 : 0;

  return (
    <ProgressContainer>
      <ProgressBar>
        <StreakBar progress={progress} />
      </ProgressBar>
      {/* Displaying the current streak as text next to the progress bar */}
      <span style={{ marginLeft: '8px', color: 'var(--text-color)' }}>
        {currentStreak} days
      </span>
    </ProgressContainer>
  );
}

export default HabitProgress;
