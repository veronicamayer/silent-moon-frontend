// --------------------------------------------- IMPORT PACKAGES
import { useEffect, useState } from "react";
// --------------------------------------------- IMPORT COMPONENTS
import Navigation from "../../components/Navigation/Navigation";
import SearchBar from "../../components/SearchBar/SearchBar";
import DailyCalm from "../../components/DailyCalm/DailyCalm";
// --------------------------------------------- IMPORT CSS
import "./YogaOverview.scss";
// --------------------------------------------- IMPORT ASSETS
import FilterButtons from "../../components/FilterButtons/FilterButtons";
import LargeTiles from "../../components/LargeTiles/LargeTiles";

const YogaOverview = ({ videos, favoriteVideos }) => {
    // --------------------------------------------- STATES
    const [filteredVideos, setfilteredVideos] = useState([]);
    // --------------------------------------------- USE EFFECTS
    /* Default shows all videos if no filter and no search applied */
    useEffect(() => {
        if (videos.length > 0) {
            setfilteredVideos(videos);
        }
    }, [videos]);

    return (
        <section id="yogaOverview">
            <p className="logo">SILENT MOON</p>
            <h1 className="heading1">Yoga</h1>
            <p className="textSmall">Find your inner zen from anywhere.</p>
            <FilterButtons
                type="yoga"
                items={videos}
                favoriteItems={favoriteVideos}
                setFilteredItems={setfilteredVideos}
            />
            <SearchBar
                content="title"
                items={videos}
                setFilteredItems={setfilteredVideos}
            />
            <DailyCalm
                items={videos}
                routePath="/yogadetails"
                routeParam="_id"
            />
            <article className="results">
                {filteredVideos.map((video) => (
                    <LargeTiles
                        type="yoga"
                        item={video}
                        allItems={filteredVideos}
                        key={video._id}
                    />
                ))}
            </article>
            <Navigation />
        </section>
    );
};

export default YogaOverview;
