const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const authorization = require('../middlewares/authorization');
const habitsController = require('../controllers/habitsController');

// Habit CRUD routes
router.post('/', auth, habitsController.createHabit);
router.get('/', auth, habitsController.getHabits);
router.get('/:id', auth, authorization, habitsController.getHabit);
router.put('/:id', auth, authorization, habitsController.updateHabit);
router.delete('/:id', auth, authorization, habitsController.deleteHabit);

// Habit progress tracking routes
router.post('/:habit_id/progress', auth, authorization, habitsController.addHabitProgress);
router.put('/:habit_id/progress/:date', auth, authorization, habitsController.updateHabitRecord);
router.get('/:habit_id/progress', auth, authorization, habitsController.getHabitRecords);
router.delete('/:habit_id/progress/:date', auth, authorization, habitsController.deleteHabitRecord);

module.exports = router;
