// --------------------------------------------- IMPORT PACKAGES
import { useState } from "react";
import { Link } from "react-router-dom";
// --------------------------------------------- IMPORT COMPONENTS
import TimePicker from "../../components/TimePicker/TimePicker";
import DayPicker from "../../components/DayPicker/DayPicker";
// --------------------------------------------- IMPORT CSS
import "./Reminder.scss";

const Reminder = () => {
    /* states to save the selected day and time */
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedDays, setSelectedDays] = useState([]);

    /* backend route */
    const saveReminder = async () => {
        try {
            const response = await fetch(
                import.meta.env.VITE_BACKEND +
                    import.meta.env.VITE_API_VERSION +
                    "/user/addReminder",
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        time: selectedTime,
                        days: selectedDays,
                    }),
                }
            );
            if (response.ok) {
                const data = await response.json();
            } else {
                const result = response.json();
                throw new Error("Error saving reminder");
            }
        } catch (error) {
            console.error("Error saving reminder: ", error);
        }
    };

    return (
        <section className="reminder">
            <p className="logo">SILENT MOON</p>
            <h2 className="heading2">What time would you like to meditate?</h2>
            <p className="textSmall">
                You can choose any time you want. We recommend one session in
                the morning.
            </p>
            <TimePicker setSelectedTime={setSelectedTime} />
            <h2 className="heading2">Which day would you like to meditate?</h2>
            <p className="textSmall">
                Everyday is best, but we recommend picking at least five.
            </p>
            <DayPicker
                selectedDays={selectedDays}
                setSelectedDays={setSelectedDays}
            />
            <div className="flex">
                <Link
                    onClick={saveReminder}
                    to="/home"
                    className="bigRedButton"
                >
                    save
                </Link>
                <Link to="/home" className="textSmall uppercase">
                    no thanks
                </Link>
            </div>
        </section>
    );
};

export default Reminder;
