import { useState } from 'react';
import { darkTheme } from '../../theme';

function HabitForm({ onSubmit, initialData }) {
  const [name, setName] = useState(initialData?.name || '');
  const [startDate, setStartDate] = useState(initialData?.startDate || '');
  const [endDate, setEndDate] = useState(initialData?.endDate || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && startDate) {
      onSubmit({ name, startDate, endDate });
      setName('');
      setStartDate('');
      setEndDate('');
    } else {
      alert("Please provide all required details");
    }
  };

  return (
    <form
      className="habit-form"
      onSubmit={handleSubmit}
      style={{
        padding: darkTheme.spacing(2),
        backgroundColor: darkTheme.colors.background,
        borderRadius: '8px',
        color: darkTheme.colors.text,
      }}
    >
      <h2 style={{ color: darkTheme.colors.primary }}>Add a New Habit</h2>
      <div className="form-group">
        <label htmlFor="habit-name">Habit Name:</label>
        <input
          type="text"
          id="habit-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter habit name"
          required
          style={{
            padding: darkTheme.spacing(1),
            margin: darkTheme.spacing(1),
            borderRadius: '4px',
            border: `1px solid ${darkTheme.colors.text}`,
            width: '100%',
          }}
        />
      </div>
      <div className="form-group">
        <label htmlFor="start-date">Start Date:</label>
        <input
          type="date"
          id="start-date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
          style={{
            padding: darkTheme.spacing(1),
            margin: darkTheme.spacing(1),
            borderRadius: '4px',
            border: `1px solid ${darkTheme.colors.text}`,
            width: '100%',
          }}
        />
      </div>
      <div className="form-group">
        <label htmlFor="end-date">End Date:</label>
        <input
          type="date"
          id="end-date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={{
            padding: darkTheme.spacing(1),
            margin: darkTheme.spacing(1),
            borderRadius: '4px',
            border: `1px solid ${darkTheme.colors.text}`,
            width: '100%',
          }}
        />
      </div>
      <button
        type="submit"
        style={{
          padding: darkTheme.spacing(1),
          backgroundColor: darkTheme.colors.primary,
          color: darkTheme.colors.text,
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Save Habit
      </button>
    </form>
  );
}

export default HabitForm;
