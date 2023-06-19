// --------------------------------------------- IMPORT PACKAGES
import { useNavigate, useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
// --------------------------------------------- IMPORT ZUSTAND
import { userState } from "../../state/userState";
// --------------------------------------------- IMPORT COMPONENTS
import Navigation from "../../components/Navigation/Navigation";
import BackButton from "../../components/BackButton/BackButton";
import LikeButton from "../../components/LikeButton/LikeButton";
// --------------------------------------------- IMPORT CSS
import "./YogaDetails.scss";
// --------------------------------------------- IMPORT ASSETS
import PlayButton from "../../assets/images/PlayButton.png";
import PauseButton from "../../assets/images/PauseButton.png";

const YogaDetails = () => {
    // --------------------------------------------- STATES
    const [selectedVideo, setSelectedVideo] = useState([]);
    const [isButtonVisible, setIsButtonVisible] = useState(true);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    // --------------------------------------------- VARIABLES
    let { videoId } = useParams();
    const nav = useNavigate();
    const setUser = userState((state) => state.setUser);
    const videoRef = useRef(null);
    const buttonRef = useRef(null);
    // --------------------------------------------- USE EFFECTS
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    import.meta.env.VITE_BACKEND +
                        import.meta.env.VITE_API_VERSION +
                        "/data/videos/" +
                        videoId,
                    { credentials: "include" }
                );
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setSelectedVideo(data);
                } else {
                    const result = response.json();
                    setUser(result);
                    nav("/login");
                    throw new Error("Error fetching video");
                }
            } catch (error) {
                console.error("Error fetching video:", error);
            }
        };
        fetchData();
    }, []);

    // --------------------------------------------- CALL FUNCTIONS
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

    const handleVideoClick = (event) => {
        if (videoRef.current && !videoRef.current.paused) {
            setIsButtonVisible(true);
        }
    };

    // --------------------------------------------- RETURN
    return (
        <section id="yogaDetails">
            <BackButton addClass="fill" />
            <LikeButton
                resourceType={"yoga"}
                selectedResource={selectedVideo._id}
            />

            <article className="yogaVideo">
                {selectedVideo.url && (
                    <video
                        controls={false}
                        ref={videoRef}
                        onClick={handleVideoClick}
                    >
                        <source src={selectedVideo.url} />
                    </video>
                )}

                {isButtonVisible && (
                    <button ref={buttonRef} onClick={handlePlayClick}>
                        {isVideoPlaying ? (
                            <img src={PauseButton} alt="pause" />
                        ) : (
                            <img src={PlayButton} alt="play" />
                        )}
                    </button>
                )}
            </article>
            <article className="yogaDetails">
                <h1 className="heading1">{selectedVideo.title}</h1>
                <p className="textSmall uppercase">{selectedVideo.level}</p>
                <p className="textSmall">{selectedVideo.description}</p>
                <div>
                    <p className="textSmall yogaFavoritesAndViews yogaFavorites">
                        {(selectedVideo.favorites / 1000).toFixed(3)} Favorites
                    </p>
                    <p className="textSmall yogaFavoritesAndViews yogaViews">
                        {(selectedVideo.views / 1000).toFixed(3)} Views
                    </p>
                </div>
            </article>
            <Navigation />
        </section>
    );
};

export default YogaDetails;
