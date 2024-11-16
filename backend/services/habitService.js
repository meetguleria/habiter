const { Habit, HabitRecord } = require('../models');
const { Op } = require('sequelize');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
}

const habitService = {
  // Creates a habit for a specific user
  async createHabit(userId, habitData) {
    if (!userId) {
      throw new Error('User ID is required');
    }
    if (!habitData.name) {
      throw new Error('Habit name is required');
    }

    try {
      return await Habit.create({ ...habitData, user_id: userId });
    } catch (err) {
      console.error('Error creating habit:', err);
      throw new Error('Failed to create habit');
    }
  },

  // Gets all habits for a specific user with associated streak data
  async getUserHabits(userId) {
    if (!userId) {
      throw new Error('User ID is required');
    }

    try {
      const habits = await Habit.findAll({
        where: { user_id: userId },
        include: {
          model: HabitRecord,
          as: 'records', // Use the correct alias as defined in the Habit model association
          attributes: ['date', 'status'],
        }
      });

      // Transform habits to include streak data
      return habits.map(habit => ({
        ...habit.toJSON(),
        streakData: habit.records.map(record => ({
          day: new Date(record.date).toLocaleDateString('en-US', { weekday: 'long' }),
          dateISO: record.date,
          active: record.status === 'completed',
          isToday: new Date(record.date).toDateString() === new Date().toDateString()
        }))
      }));
    } catch (err) {
      console.error('Error fetching user habits:', err);
      throw new Error('Failed to fetch habits');
    }
  },

  // Gets a single habit by ID for a specific user, including streak data
  async getUserHabitById(habitId, userId) {
    if (!habitId || !userId) {
      throw new Error('Habit ID and User ID are required');
    }

    try {
      const habit = await Habit.findOne({
        where: { id: habitId, user_id: userId },
        include: {
          model: HabitRecord,
          as: 'records', // Use the correct alias as defined in the Habit model association
          attributes: ['date', 'status'],
        }
      });

      if (!habit) {
        throw new NotFoundError('Habit not found');
      }

      return {
        ...habit.toJSON(),
        streakData: habit.records.map(record => ({
          day: new Date(record.date).toLocaleDateString('en-US', { weekday: 'long' }),
          dateISO: record.date,
          active: record.status === 'completed',
          isToday: new Date(record.date).toDateString() === new Date().toDateString()
        }))
      };
    } catch (err) {
      console.error('Error fetching habit by ID:', err);
      throw new Error('Failed to fetch habit');
    }
  },

  // Deletes a habit if it belongs to the user
  async deleteHabit(habitId, userId) {
    if (!habitId || !userId) {
      throw new Error('Both Habit ID and User ID are required');
    }

    try {
      const habit = await Habit.findOne({ where: { id: habitId, user_id: userId } });
      if (!habit) {
        throw new NotFoundError('Habit not found');
      }
      await habit.destroy();
      return { message: 'Habit deleted successfully' };
    } catch (err) {
      console.error('Error deleting habit:', err);
      if (err instanceof NotFoundError) {
        throw err;
      }
      throw new Error('Failed to delete habit');
    }
  }
};

module.exports = habitService;
