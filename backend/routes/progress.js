const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');
const auth = require('../middlewares/auth');
const authorization = require('../middlewares/authorization');

router.post('/:habit_id/progress', auth, authorization, progressController.addHabitProgress);
router.get('/:habit_id/progress', auth, authorization, progressController.getHabitProgress);
router.put('/:habit_id/progress/:date', auth, authorization, progressController.updateHabitProgress);
router.delete('/:habit_id/progress/:date', auth, authorization, progressController.deleteHabitProgress);

module.exports = router;
