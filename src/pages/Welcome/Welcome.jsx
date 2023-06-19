// --------------------------------------------- IMPORT PACKAGES
import { Link } from "react-router-dom";
// --------------------------------------------- IMPORT ZUSTAND
import { userState } from "../../state/userState";
// --------------------------------------------- IMPORT ASSETS
import WelcomeImage from "../../assets/images/Welcome.png";
// --------------------------------------------- IMPORT CSS
import "./Welcome.scss";

const Welcome = () => {
    // --------------------------------------------- CONST VARIABLES
    const user = userState((state) => state.user);

    // --------------------------------------------- RETURN
    return (
        <section className="welcome">
            <p className="logo light">SILENT MOON</p>
            <img src={WelcomeImage} alt="" />
            <h1>Hi {user.firstName}, welcome to Silent Moon</h1>
            <Link to="/reminder" className="bigRedButton">
                Get Started
            </Link>
        </section>
    );
};

export default Welcome;
