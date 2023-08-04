const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const habitsController = require('../controllers/habitsController');

router.post('/', auth, habitsController.createHabit);
router.get('/', auth, habitsController.getHabits);
router.get('/:id', auth, habitsController.getHabit);
router.put('/:id', auth, habitsController.updateHabit);
router.delete('/:id', auth, habitsController.deleteHabit);
router.post('/:habit_id/records/:date', auth, habitsController.updateHabitRecord);
router.get('/:habit_id/records', auth, habitsController.getHabitRecords);
router.delete('/:habit_id/records/:date', auth, habitsController.deleteHabitRecord);

module.exports = router;