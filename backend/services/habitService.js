const { Habit } = require('../models');

const habitService = {
  async createHabit(userId, habitData) {
    return await Habit.create({ ...habitData, userId });
  },
  async getUserHabits(userId) {
    return await Habit.findAll({ where: { userId } });
  },
  async deleteHabit(habitId, userId) {
    const habit = await Habit.findOne({ where: { id: habitId, userId } });
    if (!habit) throw new Error('Habit not found');
    await habit.destroy();
  }
};

module.exports = habitService;
