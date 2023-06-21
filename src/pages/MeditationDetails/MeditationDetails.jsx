// --------------------------------------------- IMPORT PACKAGES
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import Cookies from "universal-cookie";
// --------------------------------------------- IMPORT CSS
import "./MeditationDetails.scss";
// --------------------------------------------- IMPORT COMPONENTS
import Navigation from "../../components/Navigation/Navigation";
import LikeButton from "../../components/LikeButton/LikeButton";
import SpotifyPlayerLarge from "../../components/PlayerLarge/PlayerLarge";
import ItemDescription from "../../components/ItemDescription/ItemDescription";
import PlaylistItem from "../../components/PlaylistItem/PlaylistItem";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

/* Initializing the Spotify API to use the web player */
const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
});

const cookies = new Cookies();

const MeditationDetails = ({ accessToken, id }) => {
    const [selectedPlaylist, setSelectedPlaylist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [playingTrack, setPlayingTrack] = useState();
    const [spotifyAccessToken, setSpotifyAccessToken] = useState("");

    /* if the user wants to login to spotify and gets redirected back to this page, the playlist id is in the props, otherwise in the params */
    let { playlistId } = useParams();
    let storedPlaylistId = id?.split("/")[1];
    playlistId = playlistId || storedPlaylistId;

    /* store the referrer in local storage because the way the spotify Login API works and redirects the user, this is the only way to know if the user was coming from the meditation page or the music page before trying to login to spotify... */
    useEffect(() => {
        localStorage.setItem("referrer", `meditationdetails/${playlistId}`);
    }, [playlistId]);

    /* fetch the access token for the web player either from the props or from the cookies */
    useEffect(() => {
        accessToken
            ? setSpotifyAccessToken(accessToken)
            : setSpotifyAccessToken(cookies.get("spotifyAccessToken"));

        spotifyApi.setAccessToken(spotifyAccessToken);
    }, [accessToken, spotifyAccessToken]);

    /* fetch playlist from backend */
    useEffect(() => {
        setLoading(true);
        fetch(
            import.meta.env.VITE_BACKEND +
                import.meta.env.VITE_API_VERSION +
                "/data/playlists/" +
                playlistId,
            { credentials: "include" }
        )
            .then((response) => response.json())
            .then((data) => {
                setSelectedPlaylist(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching playlists:", error);
            });
    }, [playlistId]);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <section id="meditationDetails">
            <Link to={"/meditate"}>
                <button className="backButton fill"></button>
            </Link>
            <LikeButton
                resourceType={"meditation"}
                selectedResource={selectedPlaylist.id}
            />
            {selectedPlaylist && (
                <div>
                    <article className="meditationPlaylist">
                        <img src={selectedPlaylist.images[0].url} alt="" />
                    </article>
                    <ItemDescription
                        type="meditation"
                        selectedItem={selectedPlaylist}
                    />
                    <article className="allSongs">
                        {selectedPlaylist &&
                            selectedPlaylist.tracks.items.map((item) => (
                                <PlaylistItem
                                    key={item.track.id}
                                    spotifyAccessToken={spotifyAccessToken}
                                    item={item}
                                />
                            ))}
                    </article>
                </div>
            )}
            <Navigation />
            {playingTrack && (
                <SpotifyPlayerLarge
                    accessToken={spotifyAccessToken}
                    trackUri={playingTrack?.uri}
                    setPlayingTrack={setPlayingTrack}
                />
            )}
        </section>
    );
};

export default MeditationDetails;
