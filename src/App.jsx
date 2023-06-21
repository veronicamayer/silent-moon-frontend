// --------------------------------------------- IMPORT PACKAGES
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
// --------------------------------------------- IMPORT ZUSTAND
import { userState } from "./state/userState";
// --------------------------------------------- IMPORT HOOKS
import { useFetchData } from "./hooks/fetchData";
// --------------------------------------------- IMPORT PAGES
import Start from "./pages/Start/Start";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Welcome from "./pages/Welcome/Welcome";
import Home from "./pages/Home/Home";
import YogaDetails from "./pages/YogaDetails/YogaDetails";
import YogaOverview from "./pages/YogaOverview/YogaOverview";
import MeditationOverview from "./pages/MeditationOverview/MeditationOverview";
import MeditationDetails from "./pages/MeditationDetails/MeditationDetails";
import SpotifyStart from "./pages/SpotifyStart/SpotifyStart";
import MusicOverview from "./pages/MusicOverview/MusicOverview";
import Reminder from "./pages/Reminder/Reminder";
import UserProfile from "./pages/UserProfile/UserProfile";
// --------------------------------------------- IMPORT COMPONENTS
import ProtectRoutes from "./components/ProtectRoutes/ProtectRoutes";
// --------------------------------------------- IMPORT CSS
import "./App.scss";

function App() {
    // --------------------------------------------- CONST VARIABLES
    const setUser = userState((state) => state.setUser);
    const {
        videos,
        playlists,
        showOverlay,
        favoriteVideos,
        favoritePlaylists,
    } = useFetchData();

    // --------------------------------------------- USE EFFECTS
    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(
                    import.meta.env.VITE_BACKEND +
                        import.meta.env.VITE_API_VERSION +
                        "/user/verify",
                    {
                        credentials: "include",
                    }
                );
                const data = await response.json();
                if (response.ok) {
                    setUser(data);
                } else {
                    setUser(data);
                    throw new Error("Authentification faild");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        })();
    }, []);

    // --------------------------------------------- RETURN
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Start />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<ProtectRoutes />}>
                    <Route path="/welcome" element={<Welcome />} />
                    <Route path="/reminder" element={<Reminder />} />
                    <Route
                        path="/home"
                        element={
                            <Home
                                videos={videos}
                                playlists={playlists}
                                showOverlay={showOverlay}
                            />
                        }
                    />
                    <Route
                        path="/yoga"
                        element={
                            <YogaOverview
                                videos={videos}
                                favoriteVideos={favoriteVideos}
                            />
                        }
                    />
                    <Route
                        path="/yogadetails/:videoId"
                        element={<YogaDetails />}
                    />
                    <Route
                        path="/meditate"
                        element={
                            <MeditationOverview
                                playlists={playlists}
                                favoritePlaylists={favoritePlaylists}
                            />
                        }
                    />
                    <Route
                        path="/meditatedetails/:playlistId"
                        element={<MeditationDetails />}
                    />
                    <Route path="/spotify/login" element={<SpotifyStart />} />
                    <Route path="/music" element={<MusicOverview />} />
                    <Route
                        path="/profile"
                        element={
                            <UserProfile
                                showOverlay={showOverlay}
                                favoriteVideos={favoriteVideos}
                                favoritePlaylists={favoritePlaylists}
                            />
                        }
                    />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
