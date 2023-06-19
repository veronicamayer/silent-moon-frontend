const DayPicker = ({ selectedDays, setSelectedDays }) => {
    const handleDaySelection = (day) => {
        const updatedDays = [...selectedDays];
        const index = updatedDays.indexOf(day);
        if (index > -1) {
            updatedDays.splice(index, 1); // Remove day if already selected
        } else {
            updatedDays.push(day); // Add day if not selected
        }
        setSelectedDays(updatedDays);
    };
    return (
        <div>
            {["SU", "M", "T", "W", "TH", "F", "S"].map((day) => (
                <button
                    key={day}
                    onClick={() => handleDaySelection(day)}
                    className={
                        selectedDays.includes(day) ? "day_active" : "day"
                    }
                >
                    {day}
                </button>
            ))}
        </div>
    );
};

export default DayPicker;
