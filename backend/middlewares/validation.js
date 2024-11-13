const { body, validationResult } = require('express-validator');

const validateHabit = [
  body('name').isString().withMessage('Name must be a string'),
  body('start_date').isISO8601().optional().withMessage('Invalid start date format'),
  body('end_date').isISO8601().optional().withMessage('Invalid end date format'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateHabit };
