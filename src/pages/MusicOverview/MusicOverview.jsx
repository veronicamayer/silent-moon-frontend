// --------------------------------------------- IMPORT PACKAGES
import { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
// --------------------------------------------- IMPORT CSS
import "./MusicOverview.scss";
// --------------------------------------------- IMPORT COMPONENTS
import Navigation from "../../components/Navigation/Navigation";
import PlayerSmall from "../../components/PlayerSmall/PlayerSmall";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
// --------------------------------------------- IMPORT ASSETS
import PlayButton from "../../assets/images/MusicPlayIcon.png";

/* ID for the "Good Vibes" Playlist on Spotify */
const PLAYLIST_ID = "37i9dQZF1DWYBO1MoTDhZI";

/* Initializing the Spotify API to use the web player */
const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
});

const cookies = new Cookies();

const MusicOverview = ({ accessToken }) => {
    const [playlist, setPlaylist] = useState(null);
    const [playingTrack, setPlayingTrack] = useState();
    const [spotifyAccessToken, setSpotifyAccessToken] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    /* fetch the access token for the web player either from the props or from the cookies */
    useEffect(() => {
        accessToken
            ? setSpotifyAccessToken(accessToken)
            : setSpotifyAccessToken(cookies.get("spotifyAccessToken"));

        spotifyApi.setAccessToken(spotifyAccessToken);
    });

    /* fetch playlist from backend */
    useEffect(() => {
        fetch(
            import.meta.env.VITE_BACKEND +
                import.meta.env.VITE_API_VERSION +
                "/data/playlists/" +
                PLAYLIST_ID,
            { credentials: "include" }
        )
            .then((response) => response.json())
            .then((data) => {
                setPlaylist(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching playlists:", error);
            });
    }, []);

    if (isLoading) {
        <LoadingSpinner />;
    }

    return (
        <section id="musicOverview">
            <p className="logo">SILENT MOON</p>

            <h1 className="heading1">{playlist ? playlist.name : ""}</h1>
            <p className="textSmall uppercase">Playlist</p>

            <p className="textSmall">Breathe. Sense. Feel. Transcend.</p>
            {playlist && (
                <div className="likesAndSongs">
                    <p className="textSmall musicFavoritesAndViews musicFavorites">
                        {playlist.followers.total
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                        Favorites
                    </p>
                    <p className="textSmall musicFavoritesAndViews musicViews">
                        {playlist.tracks.total
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                        Songs
                    </p>
                </div>
            )}

            <article className="allSongs">
                {playlist &&
                    playlist.tracks &&
                    playlist.tracks.items.map((item) => (
                        <div key={item.track.id}>
                            {spotifyAccessToken ? (
                                <button
                                    onClick={() => setPlayingTrack(item.track)}
                                >
                                    <img src={PlayButton} alt="play button" />
                                </button>
                            ) : (
                                <Link to="/spotify/login">
                                    <img src={PlayButton} alt="play button" />
                                </Link>
                            )}
                            <h3 className="heading2">{item.track.name}</h3>
                            <p className="textSmall">{`${Math.floor(
                                item.track.duration_ms / 60000
                            )}:${
                                (
                                    (item.track.duration_ms % 60000) /
                                    1000
                                ).toFixed(0) < 10
                                    ? "0"
                                    : ""
                            }${(
                                (item.track.duration_ms % 60000) /
                                1000
                            ).toFixed(0)}`}</p>
                        </div>
                    ))}
            </article>
            <PlayerSmall
                accessToken={spotifyAccessToken}
                trackUri={playingTrack?.uri}
            />
            <Navigation />
        </section>
    );
};

export default MusicOverview;
