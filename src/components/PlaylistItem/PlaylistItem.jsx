import PlayButton from "../../assets/images/MusicPlayIcon.png";
import { Link } from "react-router-dom";
import "./PlaylistItem.scss";

const PlaylistItem = ({ spotifyAccessToken, item, setPlayingTrack }) => {
    return (
        <div className="playlistItem">
            {spotifyAccessToken ? (
                <button onClick={() => setPlayingTrack(item.track)}>
                    <img src={PlayButton} alt="play button" />
                </button>
            ) : (
                <Link to={`/spotify/login`}>
                    <img src={PlayButton} alt="play button" />
                </Link>
            )}

            <h3 className="heading3">{item.track.name}</h3>
            <p className="textSmall">{`${Math.floor(
                item.track.duration_ms / 60000
            )}:${
                ((item.track.duration_ms % 60000) / 1000).toFixed(0) < 10
                    ? "0"
                    : ""
            }${((item.track.duration_ms % 60000) / 1000).toFixed(0)}`}</p>
        </div>
    );
};

export default PlaylistItem;
