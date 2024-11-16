import { DateBlockContainer, DateLabel } from './progressStyles';
import PropTypes from 'prop-types';

const DateBlock = ({ day, date, isToday, isSuccess, isFailure, onClick }) => {
  return (
    <DateBlockContainer
      isToday={isToday}
      isSuccess={isSuccess}
      isFailure={isFailure}
      onClick={onClick}
    >
      <DateLabel isToday={isToday}>{day}</DateLabel>
      <DateLabel isToday={isToday}>{date}</DateLabel>
    </DateBlockContainer>
  );
};

DateBlock.propTypes = {
  day: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  isToday: PropTypes.bool,
  isSuccess: PropTypes.bool,
  isFailure: PropTypes.bool,
  onClick: PropTypes.func,
};

DateBlock.defaultProps = {
  isToday: false,
  isSuccess: false,
  isFailure: false,
  onClick: () => {},
};

export default DateBlock;
