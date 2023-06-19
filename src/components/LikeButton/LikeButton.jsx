import "./LikeButton.scss";
import { useState, useEffect } from "react";

const LikeButton = ({ resourceType, selectedResource }) => {
    const [favoriteResources, setFavoriteResources] = useState([]);

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const addFavorite = async (resource) => {
        try {
            const addEndpoint =
                resourceType === "yoga"
                    ? "/user/addYogaFav"
                    : "/user/addMeditateFav";
            const response = await fetch(
                import.meta.env.VITE_BACKEND +
                    import.meta.env.VITE_API_VERSION +
                    addEndpoint,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ favorite: resource }),
                }
            );
            if (response.ok) {
                const data = await response.json();
                console.log("favorite saved");
                fetchUserDetails();
            } else {
                const result = response.json();
                throw new Error("Error saving favorite: " + result);
            }
        } catch (error) {
            console.error("Error saving favorite:", error);
        }
    };

    const deleteFavorite = async (resource) => {
        try {
            const deleteEndpoint =
                resourceType === "yoga"
                    ? "/user/deleteYogaFav"
                    : "/user/deleteMeditateFav";
            const response = await fetch(
                import.meta.env.VITE_BACKEND +
                    import.meta.env.VITE_API_VERSION +
                    deleteEndpoint,
                {
                    method: "DELETE",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ favorite: resource }),
                }
            );
            if (response.ok) {
                const data = await response.json();
                console.log("favorite deleted");
                fetchUserDetails();
            } else {
                const result = response.json();
                throw new Error("Error deleting favorite: " + result);
            }
        } catch (error) {
            console.error("Error deleting favorite:", error);
        }
    };

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
                if (resourceType === "yoga") {
                    setFavoriteResources(data.favoriteYoga);
                } else if (resourceType === "meditation") {
                    setFavoriteResources(data.favoriteMeditation);
                }
            } else {
                const result = response.json();
                throw new Error("Error getting user details");
            }
        } catch (error) {
            console.error("Error getting user details: ", error);
        }
    };

    return (
        <button
            className={`likeButton ${
                favoriteResources &&
                favoriteResources.includes(selectedResource)
                    ? "liked"
                    : ""
            }`}
            onClick={() =>
                favoriteResources &&
                favoriteResources.includes(selectedResource)
                    ? deleteFavorite(selectedResource)
                    : addFavorite(selectedResource)
            }
        ></button>
    );
};

export default LikeButton;
