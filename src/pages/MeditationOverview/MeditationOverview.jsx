import Navigation from "../../components/Navigation/Navigation";
import "./MeditationOverview.scss";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DailyCalmPlay from "../../assets/images/DailyCalmPlay.png";
import { userState } from "../../state/userState";
import { useFetchData } from "../../hooks/fetchData";
import SearchBar from "../../components/SearchBar/SearchBar";
import FilterButtons from "../../components/FilterButtons/FilterButtons";
import DailyCalm from "../../components/DailyCalm/DailyCalm";
import LargeTiles from "../../components/LargeTiles/LargeTiles";

const MeditationOverview = ({ playlists, favoritePlaylists }) => {
    const [filteredPlaylists, setFilteredPlaylists] = useState([]);
    const [randomPlaylist, setRandomPlaylist] = useState({});

    useEffect(() => {
        setFilteredPlaylists(playlists);
    }, [playlists]);

    return (
        <section id="meditationOverview">
            <p className="logo">SILENT MOON</p>
            <h1 className="heading1">Meditate</h1>
            <p className="textSmall">
                Audio-only meditation techniques to help you minimize your
                screen time and practice on the go.
            </p>
            <FilterButtons
                type="meditation"
                items={playlists}
                favoriteItems={favoritePlaylists}
                setFilteredItems={setFilteredPlaylists}
            />
            <SearchBar
                content="name"
                items={playlists}
                setFilteredItems={setFilteredPlaylists}
            />
            <DailyCalm
                items={playlists}
                routePath="/meditatedetails"
                routeParam="id"
            />
            <div className="results">
                {filteredPlaylists.map((playlist) => (
                    <LargeTiles
                        type="meditate"
                        item={playlist}
                        allItems={filteredPlaylists}
                        key={playlist.id}
                    />
                ))}
            </div>
            <Navigation />
        </section>
    );
};

export default MeditationOverview;
