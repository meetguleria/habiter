import React from 'react';

function HabitList({ habits }) {
  return (
    <div className="habit-list">
      <h2>Your Habits</h2>
      {habits.length === 0 ? (
        <p>No habits added yet.</p>
      ) : (
        <ul>
          {habits.map((habit, index) => (
            <li key={index}>
              <strong>{habit.name}</strong> - Start Date: {habit.startDate}, End Date: {habit.endDate ? habit.endDate : 'N/A'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HabitList;
