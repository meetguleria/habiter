import { useState } from "react";

interface DateBoxProps {
    date: number;
    month: string;
    status: "default" | "done" | "notDone";
}

const DateBox: React.FC<DateBoxProps> = ({ date, month, status}) => {
    const [boxStatus, setBoxStatus] = useState(status);

    const handleSingleClick = () => {
        setBoxStatus("done");
    };

    const handleDoubleClick = () => {
        setBoxStatus("notDone");
    };

    let bgColor = "bg-gray-400";
    if (boxStatus === "done") bgColor = "bg-green-400";
    if (boxStatus === "notDone") bgColor = "bg-red-400";

    return (
        <div 
            className={`box ${bgColor}`}
            onClick={handleSingleClick}
            onDoubleClick={handleDoubleClick}
        >
            {date === 1 && <div className="month-marker">{month}</div>}
        </div>
    )


}