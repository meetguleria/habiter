import { StreakLine } from './progressStyles';
import PropTypes from 'prop-types';

const StreakLineComponent = ({ color }) => {
  return <StreakLine color={color} />;
};

// PropTypes for type checking
StreakLineComponent.propTypes = {
  color: PropTypes.string,
};

// Default prop values
StreakLineComponent.defaultProps = {
  color: '#E0E0E0',
};

export default StreakLineComponent;
