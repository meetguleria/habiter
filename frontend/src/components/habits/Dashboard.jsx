import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HabitForm from './HabitForm';
import HabitList from './HabitList';

function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if the user is authenticated when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
    } else {
      setLoading(false);
    }
  }, [navigate]);

  // Function to add a habit to the list
  const addHabit = (habit) => {
    setHabits([...habits, habit]);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      {/* Add HabitForm Component to Dashboard */}
      <HabitForm onSubmit={addHabit} />

      {/* Display HabitList Component with current habits */}
      <HabitList habits={habits} />
    </div>
  );
}

export default Dashboard;
