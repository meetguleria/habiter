import DateBox from "./DateBox";

interface HabitRowProps {
    habitName: string;
    dates: Array<{date: number, month: string, status: 'default' | 'done' | 'notDone' }>;
}

const HabitRow = ({ habitName, dates }: HabitRowProps) => {
    return (
        <div className="habit-row">
            <div className="habit-name">{habitName}</div>
            <div className="date-boxes">
                {dates.map((dateInfo, index) => 
                    <DateBox 
                        key={index}
                        date={dateInfo.date}
                        month={dateInfo.month}
                        status={dateInfo.status}
                    />
                )}
            </div>
        </div>
    );
};

export default HabitRow;