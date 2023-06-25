// --------------------------------------------- IMPORT PACKAGES
import { useState, useEffect } from "react";
import { userState } from "../../state/userState";
// --------------------------------------------- IMPORT COMPONENTS
import Navigation from "../../components/Navigation/Navigation";
import RandomHome from "../../components/RandomHome/RandomHome";
import SmallTiles from "../../components/SmallTiles/SmallTiles";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
// --------------------------------------------- IMPORT CSS
import "./Home.scss";

const Home = ({ videos, playlists, showOverlay }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    const user = userState((state) => state.user);

    useEffect(() => {
        // Simulate async data loading
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <section id="home">
            <h4 className="logo">SILENT MOON</h4>
            <article className="homeHeader">
                <h1 className="heading2">Good morning {user.firstName}</h1>
                <p className="textSmall">We hope you have a good day</p>
            </article>
            <RandomHome videos={videos} playlists={playlists} />
            <form className="searchBar">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </form>
            <h2 className="heading2">Recommended Yoga for you</h2>
            <SmallTiles
                type="videos"
                searchQuery={searchQuery}
                items={videos}
            />
            <h2 className="heading2">Recommended Meditations for you</h2>
            <SmallTiles
                type="playlists"
                searchQuery={searchQuery}
                items={playlists}
            />
            <Navigation />
        </section>
    );
};

export default Home;
