import { Link } from "react-router-dom";
import "./LargeTiles.scss";

const LargeTiles = ({ type, item, allItems }) => {
    return (
        <Link
            to={`/${type}details/${type === "yoga" ? item._id : item.id}`}
            className="tiles"
        >
            {type === "yoga" ? (
                <video controls={false}>
                    <source
                        src={
                            allItems.find(
                                (videoArray) => videoArray._id === item._id
                            ).url
                        }
                    />
                </video>
            ) : (
                <img src={item.images[0].url} alt="" />
            )}

            <h3 className="heading3">
                {item[type === "yoga" ? "title" : "name"]}
            </h3>
        </Link>
    );
};

export default LargeTiles;
