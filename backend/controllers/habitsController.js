// controllers/habitsController.js
const { Habit, HabitRecord, User } = require('../models');
const habitService = require('../services/habitService');

const habitsController = {
    // Create a new habit
    createHabit: async (req, res) => {
        const { name } = req.body;
        const userId = req.user.id;

        try {
            const newHabit = await Habit.create({
                name,
                user_id: userId,
                start_date: new Date(),
            });

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
            const habits = await Habit.findAll({
                where: { user_id: userId },
                include: [{ model: HabitRecord, as: 'records' }],
            });

            res.status(200).json(habits);
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
            const habit = await Habit.findOne({
                where: { id: habitId, user_id: userId },
                include: [{ model: HabitRecord, as: 'records' }],
            });

            if (!habit) {
                return res.status(404).json({ error: 'Habit not found.' });
            }

            res.status(200).json(habit);
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
            const habit = await Habit.findOne({ where: { id: habitId, user_id: userId } });

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
            const habit = await Habit.findOne({ where: { id: habitId, user_id: userId } });

            if (!habit) {
                return res.status(404).json({ error: 'Habit not found.' });
            }

            await habit.destroy();

            res.status(200).json({ message: 'Habit deleted successfully.' });
        } catch (err) {
            console.error('Error deleting habit:', err);
            res.status(500).json({ error: 'Server error while deleting habit.' });
        }
    },

    // Add progress to a habit
    addHabitProgress: async (req, res) => {
        const habitId = req.params.habit_id;
        const { date, status } = req.body;

        try {
            const progress = await HabitRecord.create({
                habit_id: habitId,
                date: new Date(date),
                status,
            });

            res.status(201).json(progress);
        } catch (err) {
            console.error('Error adding habit progress:', err);
            res.status(500).json({ error: 'Server error while adding habit progress.' });
        }
    },

    // Update habit progress for a specific date
    updateHabitRecord: async (req, res) => {
        const habitId = req.params.habit_id;
        const date = new Date(req.params.date);
        const status = req.body.status;

        try {
            const [habitRecord] = await HabitRecord.upsert(
                {
                    habit_id: habitId,
                    date,
                    status,
                },
                { returning: true }
            );

            res.status(200).json(habitRecord);
        } catch (err) {
            console.error('Error updating habit progress:', err);
            res.status(500).json({ error: 'Server error while updating habit progress.' });
        }
    },

    // Get all records for a habit
    getHabitRecords: async (req, res) => {
        const habitId = req.params.habit_id;

        try {
            const habitRecords = await HabitRecord.findAll({
                where: { habit_id: habitId },
            });

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
            const deleted = await HabitRecord.destroy({
                where: { habit_id: habitId, date: new Date(date) },
            });

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
