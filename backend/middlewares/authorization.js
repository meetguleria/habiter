const { Habit } = require('../models');

async function authorization(req, res, next) {
  try {
    const habit = await Habit.findByPk(req.params.id);
    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }
    if (habit.userId !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = authorization;
