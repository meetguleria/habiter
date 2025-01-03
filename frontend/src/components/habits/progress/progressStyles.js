import styled from '@emotion/styled';

export const DateBlockContainer = styled.div`
  width: 40px !important;
  height: 40px !important;
  flex-shrink: 0;
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin: 0 4px;
  border: 2px solid;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-sizing: border-box;
  overflow: hidden;

  background-color: ${({ isToday, status }) => {
    if (isToday) return '#FFD700';
    if (status === 'success') return '#1DB95433';
    if (status === 'failure') return '#FF8C0033';
    return '#80808033';
  }};

  border-color: ${({ status }) => {
    if (status === 'success') return '#1AAE66';
    if (status === 'failure') return '#FF9E5E';
    return '#B0B0B0';
  }};
`;

export const DateLabel = styled.div`
  font-size: 9px;  /* Reduced font size to match the smaller container */
  color: ${({ isToday }) => (isToday ? '#121212' : '#E0E0E0')};
  text-align: center;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
`;

// Streak Line Styling Updated to Touch Date Blocks Seamlessly
export const StreakLine = styled.div`
  width: 28px;  /* Slightly reduced width so that combined with negative margins it fits perfectly */
  height: 2px;  /* Match the border width of the date block */
  background: ${({ status }) => {
    if (status === 'success') return '#1AAE66';
    if (status === 'failure') return '#FF9E5E';
    return '#B0B0B0';
  }};
  transition: background-color 0.3s ease-in-out;
  margin: 0 -4px;  /* Use negative horizontal margin to make streak line touch the date blocks */
  align-self: center; /* Ensure the streak line is centered between the date blocks */
  border-radius: 0; /* Set border-radius to 0 to avoid any rounded ends */
`;

// StreaksTracker Container Styling
export const StreaksContainer = styled.div`
  display: flex;
  align-items: center; /* Align items in the center for both vertical and horizontal positioning */
  justify-content: center;
  margin-top: 20px;
  flex-wrap: wrap; /* Allow date blocks to wrap if necessary */
`;

// Add ProgressContainer styling here
export const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #E0E0E0;
  padding: 10px;
  border-radius: 8px;
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

