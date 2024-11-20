const habitService = require('../services/habitService');

const habitsController = {
    // Create a new habit
    createHabit: async (req, res) => {
        const { name } = req.body;
        const userId = req.user.id;

        try {
            const newHabit = await habitService.createHabit(userId, { name, start_date: new Date() });
            res.status(201).json(newHabit);
        } catch (err) {
            console.error('Error creating habit:', err);
            res.status(500).json({ error: 'Server error while creating habit.' });
        }
    },

    // Get all habits for the logged-in user
    getHabits: async (req, res) => {
        const userId = req.user.id;

        try {
            const habitsWithStreakData = await habitService.getUserHabits(userId);
            res.status(200).json(habitsWithStreakData);
        } catch (err) {
            console.error('Error fetching habits:', err);
            res.status(500).json({ error: 'Server error while fetching habits.' });
        }
    },

    // Get a single habit by ID
    getHabit: async (req, res) => {
        const habitId = req.params.id;
        const userId = req.user.id;

        try {
            const habitWithStreakData = await habitService.getUserHabitById(habitId, userId);
            res.status(200).json(habitWithStreakData);
        } catch (err) {
            console.error('Error fetching habit:', err);
            res.status(500).json({ error: 'Server error while fetching habit.' });
        }
    },

    // Update an existing habit
    updateHabit: async (req, res) => {
        const habitId = req.params.id;
        const userId = req.user.id;
        const { name } = req.body;

        try {
            const habit = await habitService.getUserHabitById(habitId, userId);

            if (!habit) {
                return res.status(404).json({ error: 'Habit not found.' });
            }

            habit.name = name || habit.name;
            await habit.save();

            res.status(200).json(habit);
        } catch (err) {
            console.error('Error updating habit:', err);
            res.status(500).json({ error: 'Server error while updating habit.' });
        }
    },

    // Delete a habit
    deleteHabit: async (req, res) => {
        const habitId = req.params.id;
        const userId = req.user.id;

        try {
            await habitService.deleteHabit(habitId, userId);
            res.status(200).json({ message: 'Habit deleted successfully.' });
        } catch (err) {
            if (err.name === 'NotFoundError') {
                return res.status(404).json({ error: err.message });
            }
            console.error('Error deleting habit:', err);
            res.status(500).json({ error: 'Server error while deleting habit.' });
        }
    },

    // Add progress to a habit
    addHabitProgress: async (req, res) => {
        const habitId = req.params.habit_id;
        const { date, status } = req.body;

        try {
            const progress = await habitService.addHabitProgress(habitId, date, status);
            res.status(201).json(progress);
        } catch (err) {
            console.error('Error adding habit progress:', err);
            res.status(500).json({ error: 'Server error while adding habit progress.' });
        }
    },

    // Update habit progress for a specific date
    updateHabitRecord: async (req, res) => {
        const habitId = req.params.habit_id;
        const date = req.params.date;
        const { status } = req.body;

        try {
            const updatedRecord = await habitService.updateHabitProgress(habitId, date, status);
            res.status(200).json(updatedRecord);
        } catch (err) {
            console.error('Error updating habit progress:', err);
            res.status(500).json({ error: 'Server error while updating habit progress.' });
        }
    },

    // Get all records for a habit
    getHabitRecords: async (req, res) => {
        const habitId = req.params.habit_id;

        try {
            const habitRecords = await habitService.getHabitRecords(habitId);
            res.status(200).json(habitRecords);
        } catch (err) {
            console.error('Error fetching habit records:', err);
            res.status(500).json({ error: 'Server error while fetching habit records.' });
        }
    },

    // Delete a habit record
    deleteHabitRecord: async (req, res) => {
        const habitId = req.params.habit_id;
        const date = req.params.date;

        try {
            const deleted = await habitService.deleteHabitRecord(habitId, date);
            if (deleted) {
                res.status(200).json({ message: 'Habit record deleted successfully.' });
            } else {
                res.status(404).json({ error: 'Habit record not found.' });
            }
        } catch (err) {
            console.error('Error deleting habit record:', err);
            res.status(500).json({ error: 'Server error while deleting habit record.' });
        }
    },
};

module.exports = habitsController;
