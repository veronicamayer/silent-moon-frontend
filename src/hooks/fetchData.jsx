import { useEffect, useState } from "react";
import { userState } from "../state/userState";
import { useNavigate } from "react-router-dom";

export function useFetchData(options = {}) {
    const [videos, setVideos] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [showOverlay, setShowOverlay] = useState(true);
    const [favoriteVideoIds, setFavoriteVideoIds] = useState([]);
    const [favoritePlaylistIds, setFavoritePlaylistIds] = useState([]);
    const [favoriteVideos, setFavoriteVideos] = useState([]);
    const [favoritePlaylists, setFavoritePlaylists] = useState([]);

    const user = userState((state) => state.user);
    const setUser = userState((state) => state.setUser);

    const nav = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    import.meta.env.VITE_BACKEND +
                        import.meta.env.VITE_API_VERSION +
                        "/data/videos",
                    { credentials: "include" }
                );
                if (response.ok) {
                    const data = await response.json();
                    data.sort((a, b) => b.favorites - a.favorites);
                    setVideos(data);
                } else {
                    const result = await response.json();
                    setUser(result);
                    nav("/");
                    throw new Error("Error fetching videos");
                }
            } catch (error) {
                console.error("Error fetching videos:", error);
            } finally {
                setShowOverlay(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        fetch(
            import.meta.env.VITE_BACKEND +
                import.meta.env.VITE_API_VERSION +
                "/data/playlists",
            { credentials: "include" }
        )
            .then((response) => response.json())
            .then((data) => {
                setPlaylists(data);
            })
            .catch((error) => {
                console.error("Error fetching playlists:", error);
            });
    }, []);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(
                    import.meta.env.VITE_BACKEND +
                        import.meta.env.VITE_API_VERSION +
                        "/user/details",
                    { credentials: "include" }
                );
                if (response.ok) {
                    const data = await response.json();
                    setFavoriteVideoIds(data.favoriteYoga);
                    setFavoritePlaylistIds(data.favoriteMeditation);
                    setFavoriteVideos(
                        videos.filter((video) =>
                            favoriteVideoIds.includes(video._id)
                        )
                    );
                    setFavoritePlaylists(
                        playlists.filter((playlist) =>
                            favoritePlaylistIds.includes(playlist.id)
                        )
                    );
                } else {
                    const result = response.json();
                    throw new Error("Error getting user details");
                }
            } catch (error) {
                console.error("Error getting user details: ", error);
            }
        };
        fetchUserDetails();
    }, [videos, playlists]);

    return {
        videos,
        playlists,
        showOverlay,
        favoriteVideos,
        favoritePlaylists,
    };
}
