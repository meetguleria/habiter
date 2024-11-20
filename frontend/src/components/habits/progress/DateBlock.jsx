import { DateBlockContainer, DateLabel } from './progressStyles';
import { useState, useEffect } from 'react';

/**
 * @param {Object} props
 * @param {string} props.day - Day of the week.
 * @param {string} props.date - Date string to be displayed.
 * @param {boolean} props.isToday - Whether the date block represents today.
 * @param {function} props.onStatusChange - Callback function to handle status change.
 * @param {string} props.initialStatus - Initial status for the date block.
 */
const DateBlock = ({ day, date, isToday = false, onStatusChange = () => {}, initialStatus = 'default' }) => {
  const [status, setStatus] = useState(initialStatus); // Use initialStatus prop for the initial value

  useEffect(() => {
    setStatus(initialStatus);
  }, [initialStatus]); // Update state if initialStatus changes

  const handleSingleClick = () => {
    const newStatus = status === 'success' ? 'default' : 'success';
    setStatus(newStatus);
    onStatusChange(newStatus);
  };

  const handleDoubleClick = () => {
    setStatus('failure');
    onStatusChange('failure');
  };

  return (
    <DateBlockContainer
      isToday={isToday}
      status={status}
      onClick={handleSingleClick}
      onDoubleClick={handleDoubleClick}
    >
      <DateLabel isToday={isToday}>{day}</DateLabel>
      <DateLabel isToday={isToday}>{date}</DateLabel>
    </DateBlockContainer>
  );
};

export default DateBlock;
