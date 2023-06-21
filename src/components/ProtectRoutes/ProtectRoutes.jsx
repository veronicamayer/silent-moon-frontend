import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { userState } from "../../state/userState";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const ProtectRoutes = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const setUser = userState((state) => state.setUser);
    const navigate = useNavigate();
    const user = userState((state) => state.user);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND}${
                        import.meta.env.VITE_API_VERSION
                    }/user/verify`,
                    {
                        credentials: "include",
                    }
                );
                const data = await response.json();
                if (response.ok) {
                    setUser(data);
                } else {
                    setUser(data);
                    navigate("/login");
                    throw new Error("Authentication failed");
                }
            } catch (error) {
                console.error("Error:", error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [navigate, setUser]);

    /* useEffect(() => {
        if (!user?.isLoggedIn) navigate("/login");
    }); */

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isError) {
        return <>An error occurred.</>;
    }

    return <>{user?.isLoggedIn && <Outlet />}</>;
};

export default ProtectRoutes;
