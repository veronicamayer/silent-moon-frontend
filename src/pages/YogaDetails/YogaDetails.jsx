// --------------------------------------------- IMPORT PACKAGES
import { useNavigate, useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
// --------------------------------------------- IMPORT ZUSTAND
import { userState } from "../../state/userState";
// --------------------------------------------- IMPORT COMPONENTS
import Navigation from "../../components/Navigation/Navigation";
import BackButton from "../../components/BackButton/BackButton";
import LikeButton from "../../components/LikeButton/LikeButton";
import PlayPauseButton from "../../components/PlayPauseButton/PlayPauseButton";
import ItemDescription from "../../components/ItemDescription/ItemDescription";
// --------------------------------------------- IMPORT CSS
import "./YogaDetails.scss";
// --------------------------------------------- IMPORT ASSETS

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
            <article>
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
                    <PlayPauseButton
                        isVideoPlaying={isVideoPlaying}
                        setIsVideoPlaying={setIsVideoPlaying}
                        videoRef={videoRef}
                        setIsButtonVisible={setIsButtonVisible}
                    />
                )}
            </article>
            <ItemDescription type="yoga" selectedItem={selectedVideo} />
            <Navigation />
        </section>
    );
};

export default YogaDetails;
