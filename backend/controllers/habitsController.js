const habitsController = {
    createHabit: async (req, res) => {
        const { name, start_date, end_date } = req.body;
        const startDate = start_date || new Date();
        const userId = req.user.id;

        try {
            const newHabit = await db.one(
                'INSERT INTO habits (name, start_date, end_date, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
                [name, startDate, end_date, userId]
            );
            res.json(newHabit);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error');
        }
    },
    getHabits: async (req, res) => {
        const userId = req.user.id;

        try {
            const habit = await db.any('SELECT * FROM habits WHERE user_id = $1', [userId]);
            res.json(habit);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error');
        }
    },
    getHabit: async (req, res) => {
        const userId = req.user.id;
        const habitId = req.params.id;

        try {
            const habit = await db.one('SELECT * FROM habits WHERE id = $1 AND user_id = $2', [habitId, userId]);
            res.json(habit);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error');
        }
    },
    updateHabit: async (req, res) => {
        const userId = req.user.id;
        const habitId = req.params.id;
        const { name, start_date, end_date } = req.body;

        try {
            const updatedHabit = await db.one(
                'UPDATE habits SET name = $1, start_date = $2, end_date = $3 WHERE id = $4 AND user_id = $5 RETURNING *',
                [name, start_date, end_date, habitId, userId]
            );
            res.json(updatedHabit);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error');
        }
    },
    deleteHabit: async (req, res) => {
        const userId = req.user.id;
        const habitId = req.params.id;

        try {
            await db.none('DELETE FROM habits WHERE id = $1 AND user_id = $2', [habitId, userId]);
            res.send('Habit deleted');
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error');
        }
    },
    addHabitProgress: async (req, res) => {
        const habitId = req.params.habit_id;
        const { date, status } = req.body;

        try {
            const progress = await db.one(
                'INSERT INTO habit_records (habit_id, date, status) VALUES ($1, $2, $3) RETURNING *',
                [habitId, date, status]
            );
            res.status(201).json(progress);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Could not add habit progress' });
        }
    },
    updateHabitRecord: async (req, res, next) => {
        const habitId = req.params.habit_id;
        const date = new Date(req.params.date);
        const status = req.body.status;

        try {
            const habitRecord = await db.one(`
                INSERT INTO habit_records (habit_id, date, status)
                VALUES ($1, $2, $3)
                ON CONFLICT (habit_id, date)
                DO UPDATE SET status = EXCLUDED.status
                RETURNING *
            `, [habitId, date, status]);

            res.json(habitRecord);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error');
        }
    },
    getHabitRecords: async (req, res, next) => {
        const habitId = req.params.habit_id;

        try {
            const habitRecords = await db.any('SELECT * FROM habit_records WHERE habit_id = $1', [habitId]);
            res.json(habitRecords);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error');
        }
    },
    deleteHabitRecord: async (req, res, next) => {
        const habitId = req.params.habit_id;
        const date = req.params.date;

        try {
            await db.none('DELETE FROM habit_records WHERE habit_id = $1 AND date = $2', [habitId, date]);
            res.send('Habit record deleted successfully');
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error');
        }
    }
};

module.exports = habitsController;
