import React from 'react';

function HabitCard({ habit }) {
  return (
    <div className="habit-card" style={{ border: "1px solid var(--secondary-color)", padding: "16px", marginBottom: "8px" }}>
      <h3 style={{ color: "var(--primary-color)" }}>{habit.name}</h3>
      <p style={{ color: "var(--text-color)" }}>Streak: {habit.streak} days</p>
    </div>
  );
}

export default HabitCard;
