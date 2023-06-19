// --------------------------------------------- IMPORT PACKAGES
import { useState, useEffect } from "react";
// --------------------------------------------- IMPORT ZUSTAND
import { userState } from "../../state/userState";
// --------------------------------------------- IMPORT HOOKS
import { useFetchData } from "../../hooks/fetchData";
// --------------------------------------------- IMPORT COMPONENTS
import Navigation from "../../components/Navigation/Navigation";
// --------------------------------------------- IMPORT CSS
import "./UserProfile.scss";
import SmallTiles from "../../components/SmallTiles/SmallTiles";

const UserProfile = () => {
    // --------------------------------------------- STATES
    const [searchQuery, setSearchQuery] = useState("");
    // --------------------------------------------- CONST VARIABLES
    const user = userState((state) => state.user);
    const { showOverlay, favoriteVideos, favoritePlaylists } = useFetchData();
    // --------------------------------------------- RETURN
    if (showOverlay) {
        <>
            <div className="lds-ripple">
                <div></div>
                <div></div>
            </div>
            <Navigation />
        </>;
    }

    return (
        <section id="userProfile">
            <h4 className="logo">SILENT MOON</h4>
            <h1 className="heading1">Hi {user.firstName}!</h1>
            <p className="textSmall">Find your favorite content here. </p>
            <form className="searchBar">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </form>
            <h2 className="heading2">Your Favorite Yoga Sessions</h2>
            <SmallTiles
                type="videos"
                searchQuery={searchQuery}
                items={favoriteVideos}
            />
            <h2 className="heading2">Your Favorite Meditations</h2>
            <SmallTiles
                type="playlists"
                searchQuery={searchQuery}
                items={favoritePlaylists}
            />
            <Navigation />
        </section>
    );
};

export default UserProfile;
