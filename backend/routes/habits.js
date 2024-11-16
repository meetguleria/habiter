const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const authorization = require('../middlewares/authorization');
const habitsController = require('../controllers/habitsController');

// Log to verify the habitsController has all required methods
console.log('Loaded habitsController:', habitsController);

// Habit CRUD routes
router.post('/', auth, habitsController.createHabit); // POST to create a habit
router.get('/', auth, habitsController.getHabits); // GET all habits
router.get('/:id', auth, authorization, habitsController.getHabit); // GET specific habit by id
router.put('/:id', auth, authorization, habitsController.updateHabit); // PUT to update habit
router.delete('/:id', auth, authorization, habitsController.deleteHabit); // DELETE to remove habit

// Habit progress tracking routes
router.post('/:habit_id/progress', auth, authorization, habitsController.addHabitProgress); // POST to add progress to a habit
router.put('/:habit_id/progress/:date', auth, authorization, habitsController.updateHabitRecord); // PUT to update progress
router.get('/:habit_id/progress', auth, authorization, habitsController.getHabitRecords); // GET all progress records
router.delete('/:habit_id/progress/:date', auth, authorization, habitsController.deleteHabitRecord); // DELETE a progress record

module.exports = router;
