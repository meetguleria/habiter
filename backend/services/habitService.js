const { Habit, HabitRecord } = require('../models');
const { Op } = require('sequelize');
const { generateDateRange } = require('../utils/dateUtils');
const calculateStreak = require('../utils/streakCalculator');

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

  // Gets all habits for a specific user with associated streak and date data
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
        },
      });

      // Transform habits to include streak data and generated date blocks
      return habits.map(habit => {
        const habitData = habit.toJSON();

        // Calculate streak data using streakCalculator utility
        const streakData = habitData.records.map(record => ({
          day: new Date(record.date).toLocaleDateString('en-US', { weekday: 'long' }),
          dateISO: record.date,
          active: record.status === 'completed',
          isToday: new Date(record.date).toDateString() === new Date().toDateString(),
        }));

        const { currentStreak, longestStreak } = calculateStreak(habitData.records);

        // Generate 11-day date range centered around today using dateUtils
        const dateRange = generateDateRange(11);

        // Map generated date range to streak data, marking active days
        const updatedDateRange = dateRange.map(dateBlock => {
          const match = streakData.find(record => new Date(record.dateISO).toDateString() === new Date(dateBlock.dateISO).toDateString());
          return {
            ...dateBlock,
            active: match ? match.active : false,
          };
        });

        return {
          ...habitData,
          currentStreak,
          longestStreak,
          streakData: updatedDateRange,
        };
      });
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
          as: 'records',
          attributes: ['date', 'status'],
        },
      });

      if (!habit) {
        throw new NotFoundError('Habit not found');
      }

      const habitData = habit.toJSON();

      // Calculate streak data using streakCalculator utility
      const streakData = habitData.records.map(record => ({
        day: new Date(record.date).toLocaleDateString('en-US', { weekday: 'long' }),
        dateISO: record.date,
        active: record.status === 'completed',
        isToday: new Date(record.date).toDateString() === new Date().toDateString(),
      }));

      const { currentStreak, longestStreak } = calculateStreak(habitData.records);

      // Generate 11-day date range centered around today using dateUtils
      const dateRange = generateDateRange(11);

      // Map generated date range to streak data, marking active days
      const updatedDateRange = dateRange.map(dateBlock => {
        const match = streakData.find(record => new Date(record.dateISO).toDateString() === new Date(dateBlock.dateISO).toDateString());
        return {
          ...dateBlock,
          active: match ? match.active : false,
        };
      });

      return {
        ...habitData,
        currentStreak,
        longestStreak,
        streakData: updatedDateRange,
      };
    } catch (err) {
      console.error('Error fetching habit by ID:', err);
      throw new Error('Failed to fetch habit');
    }
  },

  // Adds progress to a habit for a specific date
  async addHabitProgress(habitId, date, status) {
    if (!habitId || !date || typeof status === 'undefined') {
      throw new Error('Habit ID, date, and status are required');
    }

    try {
      return await HabitRecord.create({
        habit_id: habitId,
        date: new Date(date),
        status,
      });
    } catch (err) {
      console.error('Error adding habit progress:', err);
      throw new Error('Failed to add habit progress');
    }
  },

  // Updates a habit progress record for a specific date
  async updateHabitProgress(habitId, date, status) {
    if (!habitId || !date || typeof status === 'undefined') {
      throw new Error('Habit ID, date, and status are required');
    }

    try {
      const [habitRecord, created] = await HabitRecord.upsert(
        {
          habit_id: habitId,
          date: new Date(date),
          status,
        },
        { returning: true }
      );

      return habitRecord;
    } catch (err) {
      console.error('Error updating habit progress:', err);
      throw new Error('Failed to update habit progress');
    }
  },

  // Gets all records for a specific habit
  async getHabitRecords(habitId) {
    if (!habitId) {
      throw new Error('Habit ID is required');
    }

    try {
      return await HabitRecord.findAll({
        where: { habit_id: habitId },
      });
    } catch (err) {
      console.error('Error fetching habit records:', err);
      throw new Error('Failed to fetch habit records');
    }
  },

  // Deletes a habit progress record for a specific date
  async deleteHabitRecord(habitId, date) {
    if (!habitId || !date) {
      throw new Error('Habit ID and date are required');
    }

    try {
      const deleted = await HabitRecord.destroy({
        where: { habit_id: habitId, date: new Date(date) },
      });

      if (!deleted) {
        throw new NotFoundError('Habit record not found');
      }

      return { message: 'Habit record deleted successfully' };
    } catch (err) {
      console.error('Error deleting habit record:', err);
      throw new Error('Failed to delete habit record');
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
  },
};

module.exports = habitService;
