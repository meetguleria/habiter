const BASE_URL = 'http://localhost:4000/api/habits';

/**
 * Adds progress to a habit for a specific date.
 * @param {string} habitId - The ID of the habit.
 * @param {string} date - The date for which the progress is being updated.
 * @param {string} status - The status of the habit for the date (e.g., 'success', 'failure').
 * @returns {Promise} - Resolves with the updated record or rejects with an error.
 */
export const addHabitProgress = async (habitId, date, status) => {
  try {
    const response = await fetch(`${BASE_URL}/${habitId}/progress/${date}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ status }),
    });

    if (response.ok) {
      return await response.json();
    } else {
      console.error(`Failed to add habit progress: ${response.status}`);
      throw new Error('Failed to add habit progress');
    }
  } catch (error) {
    console.error('Error updating habit progress:', error);
    throw error;
  }
};

/**
 * Fetches all habits for the logged-in user.
 * @returns {Promise} - Resolves with the list of habits or rejects with an error.
 */
export const fetchHabits = async () => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      console.error(`Failed to fetch habits: ${response.status}`);
      throw new Error('Failed to fetch habits');
    }
  } catch (error) {
    console.error('Error fetching habits:', error);
    throw error;
  }
};

/**
 * Creates a new habit for the logged-in user.
 * @param {string} name - The name of the habit.
 * @returns {Promise} - Resolves with the newly created habit or rejects with an error.
 */
export const createHabit = async (name) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ name }),
    });

    if (response.ok) {
      return await response.json();
    } else {
      console.error(`Failed to create habit: ${response.status}`);
      throw new Error('Failed to create habit');
    }
  } catch (error) {
    console.error('Error creating habit:', error);
    throw error;
  }
};

/**
 * Deletes a habit by its ID.
 * @param {string} habitId - The ID of the habit.
 * @returns {Promise} - Resolves with the deletion success message or rejects with an error.
 */
export const deleteHabit = async (habitId) => {
  try {
    const response = await fetch(`${BASE_URL}/${habitId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      console.error(`Failed to delete habit: ${response.status}`);
      throw new Error('Failed to delete habit');
    }
  } catch (error) {
    console.error('Error deleting habit:', error);
    throw error;
  }
};
