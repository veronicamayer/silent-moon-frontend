import "./ItemDescription.scss";

const ItemDescription = ({ type, selectedItem }) => {
    return (
        <article className="itemDetails">
            <h1 className="heading1">
                {type === "yoga" ? selectedItem.title : selectedItem.name}
            </h1>
            <p className="textSmall uppercase">
                {type === "yoga" ? selectedItem.level : "Playlist"}
            </p>
            <p className="textSmall">{selectedItem.description}</p>
            {type === "yoga" ? (
                <div className="stats">
                    <p className="textSmall bothStats favorites">
                        {(selectedItem.favorites / 1000).toFixed(3)} Favorites
                    </p>
                    <p className="textSmall bothStats views">
                        {(selectedItem.views / 1000).toFixed(3)} Views
                    </p>
                </div>
            ) : (
                <div className="stats">
                    <p className="textSmall bothStats favorites">
                        {selectedItem.followers.total
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                        Favorites
                    </p>
                    <p className="textSmall bothStats songs">
                        {selectedItem.tracks.total
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                        Songs
                    </p>
                </div>
            )}
        </article>
    );
};

export default ItemDescription;
