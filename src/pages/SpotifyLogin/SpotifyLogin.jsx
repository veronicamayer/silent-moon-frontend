// --------------------------------------------- IMPORT PACKAGES
import { useNavigate } from "react-router-dom";
// --------------------------------------------- IMPORT COMPONENTS
import Navigation from "../../components/Navigation/Navigation";
// --------------------------------------------- IMPORT ASSETS
import SpotifyLoginImg from "../../assets/images/SpotifyLogin.png";
// --------------------------------------------- IMPORT CSS
import "./SpotifyLogin.scss";

const SpotifyLogin = () => {
    /* Redirect URL to open the spotify login page */
    const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=ab15df07233441198e07735bdb853e7b&response_type=code&redirect_uri=${
        import.meta.env.VITE_FRONTEND
    }spotify/login&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

    const nav = useNavigate();
    const goBack = () => {
        navigate(-1);
    };

    return (
        <section id="spotifyLogin">
            <p className="logo light">SILENT MOON</p>
            <article id="spotifyLoginHeader">
                <div>
                    <img src={SpotifyLoginImg} alt="" />
                </div>
                <div>
                    <h1 className="heading1">Login required</h1>
                    <p className="textSmall">
                        If you want to play music you first have to log in with
                        a Spotify premium account.
                    </p>
                    <a href={AUTH_URL} className="bigRedButton">
                        Login With Spotify
                    </a>
                    <button onClick={goBack} className="textSmall">
                        Go back without loging in
                    </button>
                </div>
            </article>
            <Navigation />
        </section>
    );
};

export default SpotifyLogin;
