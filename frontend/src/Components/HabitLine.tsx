import DateBox from './DateBox';

interface DateInfo {
    date: number;
    month: string;
    status: 'default' | 'done' | 'notDone';
}

interface HabitLineProps {
    dates: DateInfo[];
}

const HabitLine = ({ dates }: HabitLineProps)  => {

    return (
    <div className="flex">
        {dates.map((dateInfo, index) => (
            <DateBox 
                key={index}
                date={dateInfo.date}
                month={dateInfo.month}
                status={dateInfo.status}
            />
        ))}
    </div>
    );
};

export default HabitLine;