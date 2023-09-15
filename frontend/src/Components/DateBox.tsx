import { useState } from "react";

interface DateBoxProps {
    date: number;
    month: string;
    status: "default" | "done" | "notDone";
}

function DateBox({ date, month, status }: DateBoxProps) {
    const [boxStatus, setBoxStatus] = useState(status);

    const handleStatusChange = () => {
        switch (boxStatus) {
            case "default":
                setBoxStatus("done");
                break;
            case "done":
                setBoxStatus("notDone");
                break;
            case "notDone":
                setBoxStatus("default");
                break;
        }
    }

    return (
        <div onClick={handleStatusChange} className="pl-3">
            {date === 1 && <div className="month-marker">{month}</div>}
            <label className="checkbox">
                <input 
                    type="checkbox" 
                    checked={boxStatus === "done"} 
                    onChange={() => {}} // Dummy onChange to suppress  warning
                />
                <div className={`box ${boxStatus === "done" ? "bg-green-400" : boxStatus === "notDone" ? "bg-red-400" : "bg-gray-400"}`}>
                    {date}
                </div>
            </label>
        </div>
    );
};

export default DateBox;