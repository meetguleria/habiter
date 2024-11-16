import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import HabitForm from './HabitForm';
import axios from 'axios';
import styled from '@emotion/styled';
import HabitProgress from './progress/HabitProgress';
import StreaksTracker from './progress/StreaksTracker';
import { addDays, format, isToday } from 'date-fns';

// Styled components for Dashboard layout
const DashboardContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const DashboardTitle = styled.h1`
  text-align: center;
  color: var(--primary-color);
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 1.5em;
  color: var(--secondary-color);
`;

const ErrorMessage = styled.div`
  text-align: center;
  font-size: 1.2em;
  color: red;
  margin-top: 20px;
`;

const HabitContainer = styled.div`
  margin-bottom: 20px;
  border: 1px solid var(--primary-color);
  padding: 10px;
  border-radius: 8px;
`;

function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function to log the user out
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  // Function to fetch habits from the backend
  const fetchHabits = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
      return;
    }

    try {
      const response = await axios.get('http://localhost:4000/api/habits', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHabits(response.data);
    } catch (error) {
      console.error('Error fetching habits:', error);
      if (error.response && error.response.status === 401) {
        // If the token has expired or is invalid, log out the user
        logout();
      } else {
        setError('Failed to load habits. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // Fetch habits when the component mounts
  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  useEffect(() => {
    console.log('Fetched habits:', habits);
  }, [habits]);

  // Function to add a habit to the backend and update the list
  const addHabit = async (habit) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
      return;
    }

    console.log('Adding habit:', habit);
    console.log('Auth token:', token);

    try {
      const response = await axios.post('http://localhost:4000/api/habits', habit, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHabits((prevHabits) => [...prevHabits, response.data]);
    } catch (error) {
      console.error('Error adding habit:', error);
      if (error.response && error.response.status === 401) {
        // If the token has expired or is invalid, log out the user
        logout();
      } else {
        setError('Failed to add habit. Please try again.');
      }
    }
  };

  // Generate date blocks from the habit start date to today
  const generateDateBlocks = (startDate) => {
    const dateBlocks = [];
    let currentDate = new Date(startDate);

    while (currentDate <= new Date()) {
      dateBlocks.push({
        day: format(currentDate, 'EEEE'),
        dateISO: format(currentDate, 'yyyy-MM-dd'),
        active: false,
        isToday: isToday(currentDate),
      });
      currentDate = addDays(currentDate, 1);
    }

    return dateBlocks;
  };

  if (loading) {
    return <LoadingMessage>Loading...</LoadingMessage>;
  }

  return (
    <DashboardContainer>
      <DashboardTitle>Dashboard</DashboardTitle>

      {/* Add HabitForm Component to Dashboard */}
      <HabitForm onSubmit={addHabit} />

      {/* Display HabitList Component with current habits */}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      {/* Render habits along with their progress and streak information */}
      {habits.map((habit) => {
        // Generate date blocks if streakData is empty or not provided
        const streakData = habit.streakData && habit.streakData.length > 0 
          ? habit.streakData 
          : generateDateBlocks(habit.start_date);

        return (
          <HabitContainer key={habit.id}>
            <h2>{habit.name}</h2>

            {/* Render StreaksTracker for the habit */}
            <StreaksTracker streakData={streakData} />

            {/* Render HabitProgress for the habit */}
            <HabitProgress
              currentStreak={streakData.filter((record) => record.active).length}
              maxStreak={streakData.length}
            />
          </HabitContainer>
        );
      })}
    </DashboardContainer>
  );
}

export default Dashboard;
