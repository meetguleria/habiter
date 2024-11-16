import styled from '@emotion/styled';
import HabitCard from './HabitCard';

const HabitListContainer = styled.div`
  margin-top: 16px;
`;

const HabitListTitle = styled.h2`
  color: var(--primary-color);
  text-align: center;
`;

const HabitCardWrapper = styled.div`
  margin-bottom: 16px;
`;

function HabitList({ habits }) {
  // Ensure habits is always an array
  const habitsArray = Array.isArray(habits) ? habits : [];

  return (
    <HabitListContainer>
      <HabitListTitle>Your Habits</HabitListTitle>
      {habitsArray.length === 0 ? (
        <p>No habits added yet.</p>
      ) : (
        habitsArray.map((habit, index) => (
          <HabitCardWrapper key={habit.id || index}>
            <HabitCard habit={habit} />
          </HabitCardWrapper>
        ))
      )}
    </HabitListContainer>
  );
}

export default HabitList;
