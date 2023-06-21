import { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import "./PlayerSmall.scss";

const PlayerSmall = ({ accessToken, trackUri }) => {
    const [play, setPlay] = useState(false);

    useEffect(() => setPlay(true), [trackUri]);

    if (!accessToken) return null;
    return (
        <div id="spotifyPlayerSmall">
            <SpotifyPlayer
                token={accessToken}
                showSaveIcon
                callback={(state) => {
                    if (!state.isPlaying) setPlay(false);
                }}
                play={play}
                uris={trackUri ? [trackUri] : []}
            />
        </div>
    );
};

export default PlayerSmall;
