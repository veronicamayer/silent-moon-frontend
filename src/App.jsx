// --------------------------------------------- IMPORT PACKAGES
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
// --------------------------------------------- IMPORT ZUSTAND
import { userState } from "./state/userState";
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
        <div className="smartphone">
            <div className="content">
                <Routes>
                    <Route path="/" element={<Start />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route element={<ProtectRoutes />}>
                        <Route path="/welcome" element={<Welcome />} />
                        <Route path="/reminder" element={<Reminder />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/yoga" element={<YogaOverview />} />
                        <Route
                            path="/yogadetails/:videoId"
                            element={<YogaDetails />}
                        />
                        <Route
                            path="/meditate"
                            element={<MeditationOverview />}
                        />
                        <Route
                            path="/meditatedetails/:playlistId"
                            element={<MeditationDetails />}
                        />
                        <Route
                            path="/spotify/login"
                            element={<SpotifyStart />}
                        />
                        <Route path="/music" element={<MusicOverview />} />
                        <Route path="/profile" element={<UserProfile />} />
                    </Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;
