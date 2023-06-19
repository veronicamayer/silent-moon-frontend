import DailyCalmPlay from "../../assets/images/DailyCalmPlay.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./DailyCalm.scss";

const DailyCalm = ({ items, routeParam, routePath }) => {
    const [randomItem, setRandomItem] = useState(null);

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    useEffect(() => {
        if (items.length > 0) {
            const randomIndex = Math.floor(Math.random() * items.length);
            setRandomItem(items[randomIndex]);
        }
    }, [items]);

    return (
        randomItem && (
            <Link to={`${routePath}/${randomItem[routeParam]}`}>
                <div className="dailyCalm">
                    <div>
                        <h3 className="heading2">Daily Calm</h3>
                        <p className="textSmall uppercase">
                            {monthNames[month - 1]} {day} • pause practice
                        </p>
                    </div>
                    <img src={DailyCalmPlay} alt="play button" />
                </div>
            </Link>
        )
    );
};

export default DailyCalm;
