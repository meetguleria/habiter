import styled from '@emotion/styled';

// DateBlock Styling
export const DateBlockContainer = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin: 0 8px;
  border: 3px solid;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  background-color: ${({ isToday, isSuccess, isFailure }) => {
    if (isToday) return '#FFD700';
    if (isSuccess) return '#1DB95433';
    if (isFailure) return '#FF8C0033';
    return '#80808033';
  }};

  border-color: ${({ isToday, isSuccess, isFailure }) => {
    if (isSuccess) return '#1DB954';
    if (isFailure) return '#FF8C00';
    return isToday ? '#FFD700' : '#E0E0E0';
  }};

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
  }
`;

export const DateLabel = styled.div`
  font-size: 12px;
  color: ${({ isToday }) => (isToday ? '#121212' : '#E0E0E0')};
  font-weight: bold;
  margin-top: 4px;
`;

// Progress Bar Styling
export const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: var(--secondary-color);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

export const StreakBar = styled.div`
  width: ${({ progress }) => progress}%;
  height: 100%;
  background-color: var(--primary-color);
  transition: width 0.3s ease-in-out;
`;

// Streak Line Styling
export const StreakLine = styled.div`
  flex: 1;
  height: 4px;
  background: ${({ color }) => color};
  transition: background-color 0.3s ease-in-out;
`;

// StreaksTracker Container Styling
export const StreaksContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

