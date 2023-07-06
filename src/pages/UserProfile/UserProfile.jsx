// --------------------------------------------- IMPORT PACKAGES
import { useState } from "react";
// --------------------------------------------- IMPORT HOOKS
import { useFetchData } from "../../hooks/fetchData";
// --------------------------------------------- IMPORT ZUSTAND
import { userState } from "../../state/userState";
// --------------------------------------------- IMPORT COMPONENTS
import Navigation from "../../components/Navigation/Navigation";
import SmallTiles from "../../components/SmallTiles/SmallTiles";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
// --------------------------------------------- IMPORT CSS
import "./UserProfile.scss";

const UserProfile = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const { showOverlay, favoriteVideos, favoritePlaylists } = useFetchData();

    const user = userState((state) => state.user);

    if (showOverlay) {
        <LoadingSpinner />;
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
