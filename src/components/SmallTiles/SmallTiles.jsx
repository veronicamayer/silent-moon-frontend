import { Link } from "react-router-dom";
import "./SmallTiles.scss";
import DefaultResult from "../../assets/images/DefaultResult.png";

const SmallTiles = ({ type, searchQuery, items }) => {
    const filteredItems = items.filter((item) => {
        const itemTitle = type === "videos" ? item.title : item.name;
        const query = searchQuery ? searchQuery.toLowerCase() : "";
        const lowercaseItemTitle = itemTitle ? itemTitle.toLowerCase() : "";
        return lowercaseItemTitle.includes(query);
    });

    return (
        <article className="smallTiles">
            {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                    <Link
                        to={`/${
                            type === "videos"
                                ? "yogadetails"
                                : "meditatedetails"
                        }/${item._id || item.id}`}
                        key={item._id || item.id}
                    >
                        {type === "videos" ? (
                            <video controls={false}>
                                <source src={item.url} />
                            </video>
                        ) : (
                            item.images &&
                            item.images.length > 0 && (
                                <img src={item.images[0].url} alt="" />
                            )
                        )}

                        <h3 className="heading3">
                            {type === "videos" ? item.title : item.name}
                        </h3>
                        <div>
                            <p className="textSmall uppercase">
                                {type === "videos" ? item.level : "playlists"}
                            </p>
                            {type === "videos" && (
                                <p className="textSmall uppercase">
                                    {item.duration} min
                                </p>
                            )}
                            {type === "playlists" && (
                                <p className="textSmall uppercase">
                                    {item.tracks.total} items
                                </p>
                            )}
                        </div>
                    </Link>
                ))
            ) : (
                <Link>
                    <img src={DefaultResult} alt="" />
                    <h3 className="heading3">Nothing found</h3>
                </Link>
            )}
        </article>
    );
};

export default SmallTiles;
