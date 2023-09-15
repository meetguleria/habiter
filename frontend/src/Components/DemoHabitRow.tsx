import HabitLine from './HabitLine';

interface DateInfo {
    date: number;
    month: string;
    status: 'default' | 'done' | 'notDone';
}

const DemoHabitRow = () => { 
    const habitName = "Running";

    //Generating few dates before today's date
    const today = new Date();
    const demoDates: DateInfo[] = Array.from({ length: 5 }, (_, i) => {
        const demoDate = new Date(today);
        demoDate.setDate(today.getDate() - i);
        return {
            date: demoDate.getDate(),
            month: demoDate.toLocaleString('default', { month: 'short' }),
            status: i % 3 === 0 ? "done" : i % 3 === 1 ? "notDone" : "default"
        } as DateInfo;
    }).reverse();

    return (
        <div className="habit-row">
            <div className="habit-name">{habitName}</div>
            <HabitLine dates={demoDates}/>
        </div>
    );
};

export default DemoHabitRow;