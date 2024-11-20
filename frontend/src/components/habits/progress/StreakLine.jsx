import { StreakLine } from './progressStyles';

/**
 * @param {Object} props
 * @param {string} props.status - The current status of the streak (e.g., success, failure).
 */
const StreakLineComponent = ({ status = 'default' }) => {
  // Determine the streak line color based on the status
  const color =
    status === 'success'
      ? 'rgba(26, 174, 102, 0.7)'  // Slightly lighter green for success
      : status === 'failure'
      ? 'rgba(255, 158, 94, 0.7)'   // Slightly lighter orange for failure
      : 'rgba(176, 176, 176, 0.5)'; // Default light gray for neutral state

  return <StreakLine color={color} />;
};

export default StreakLineComponent;
