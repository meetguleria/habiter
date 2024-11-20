const moment = require('moment');

/**
 * Function to generate a range of dates centered around today.
 * @param {number} totalDays - Total number of days in the range.
 * @returns {Array} - Array of dates with each date having day and ISO string format.
 */
function generateDateRange(totalDays = 11) {
  // Calculate half of the total days (center around today)
  const halfDays = Math.floor(totalDays / 2);
  const dates = [];

  // Generate the dates starting from halfDays before today to halfDays after today
  for (let i = -halfDays; i <= halfDays; i++) {
    const date = moment().add(i, 'days');
    dates.push({
      day: date.format('ddd'),
      dateISO: date.toISOString(),
      isToday: i === 0,
    });
  }

  return dates;
}

module.exports = {
  generateDateRange,
};
