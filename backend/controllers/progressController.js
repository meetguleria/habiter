const { HabitRecord } = require('../models');

const progressController = {
    addHabitProgress: async (req, res) => {
        const habitId = req.params.habit_id;
        const { date, status } = req.body;

        try {
            // Insert a new progress record for a habit
            const progress = await HabitRecord.create({
                habit_id: habitId,
                date,
                status
            });

            res.status(201).json(progress);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Could not add habit progress' });
        }
    },

    updateHabitProgress: async (req, res) => {
        const habitId = req.params.habit_id;
        const date = req.params.date;
        const { status } = req.body;

        try {
            // Update existing habit progress record based on habit_id and date
            const [updated] = await HabitRecord.update(
                { status },
                {
                    where: {
                        habit_id: habitId,
                        date
                    }
                }
            );

            if (updated === 0) {
                return res.status(404).send('Habit progress not found or not updated');
            }

            const updatedProgress = await HabitRecord.findOne({ where: { habit_id: habitId, date } });
            res.json(updatedProgress);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Could not update habit progress' });
        }
    },

    getHabitProgress: async (req, res) => {
        const habitId = req.params.habit_id;

        try {
            // Get all progress records for a specific habit
            const habitProgress = await HabitRecord.findAll({ where: { habit_id: habitId } });
            res.json(habitProgress);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Could not retrieve habit progress' });
        }
    },

    deleteHabitProgress: async (req, res) => {
        const habitId = req.params.habit_id;
        const date = req.params.date;

        try {
            // Delete a habit progress record based on habit_id and date
            const deleted = await HabitRecord.destroy({
                where: {
                    habit_id: habitId,
                    date
                }
            });

            if (!deleted) {
                return res.status(404).send('Habit progress not found');
            }

            res.send('Habit progress deleted successfully');
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Could not delete habit progress' });
        }
    }
};

module.exports = progressController;