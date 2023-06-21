import PlayButton from "../../assets/images/PlayButton.png";
import PauseButton from "../../assets/images/PauseButton.png";
import { useRef } from "react";
import "./PlayPauseButton.scss";

const PlayPauseButton = ({
    isVideoPlaying,
    setIsVideoPlaying,
    videoRef,
    setIsButtonVisible,
}) => {
    const buttonRef = useRef(null);

    const handlePlayClick = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsButtonVisible(false);
                setIsVideoPlaying(true);
            } else {
                videoRef.current.pause();
                setIsVideoPlaying(false);
            }
        }
    };

    return (
        <button ref={buttonRef} onClick={handlePlayClick} id="playPauseButton">
            {isVideoPlaying ? (
                <img src={PauseButton} alt="pause" />
            ) : (
                <img src={PlayButton} alt="play" />
            )}
        </button>
    );
};

export default PlayPauseButton;
