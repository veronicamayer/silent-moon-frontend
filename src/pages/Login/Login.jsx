import "./Login.scss";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import BackButton from "../../components/BackButton/BackButton";
import { userState } from "../../state/userState";

const Login = () => {
    const [hintText, setHintText] = useState("");

    const navigate = useNavigate();

    const userLoginRef = useRef();
    const passwordLoginRef = useRef();

    const setUser = userState((state) => state.setUser);

    const login = async (event) => {
        event.preventDefault();

        const userLogin = userLoginRef.current.value;
        const passwordLogin = passwordLoginRef.current.value;

        try {
            const result = await fetch(
                import.meta.env.VITE_BACKEND +
                    import.meta.env.VITE_API_VERSION +
                    "/user/login",
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({
                        email: userLogin,
                        password: passwordLogin,
                    }),
                }
            );

            const response = await result.json();
            if (result.ok) {
                console.log("Login korrekt");
                setUser(response);
                navigate("/home"); //auf home weiterleiten
            } else if (result.status === 401) {
                setHintText("Invalid email or password");
                console.log("Error: Userlogindaten fehlerhaft");
            } else {
                console.log("Error: Server error");
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    return (
        <section className="loginAndRegister">
            <BackButton />
            <h1 className="heading1">Welcome Back!</h1>
            <form onSubmit={login}>
                <input
                    ref={userLoginRef}
                    type="email"
                    name="userLogin"
                    id="userLogin"
                    placeholder="EMAIL"
                    required
                />
                <input
                    ref={passwordLoginRef}
                    type="password"
                    name="passwordLogin"
                    id="passwordLogin"
                    placeholder="PASSWORD"
                    required
                />
                {hintText && <p className="textSmall hinttext">{hintText}</p>}
                <input type="submit" value="LOGIN" className="bigRedButton" />
            </form>
            <p className="textSmall uppercase">
                Don't have an account yet? <Link to="/register">Sign up</Link>
            </p>
        </section>
    );
};

export default Login;
