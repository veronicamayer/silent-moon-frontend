import React from "react";
import FilterAll from "../../assets/images/FilterAll.png";
import FilterFavorites from "../../assets/images/FilterFavorites.png";
import FilterBeginner from "../../assets/images/FilterBeginner.png";
import FilterIntermediate from "../../assets/images/FilterIntermediate.png";
import FilterExpert from "../../assets/images/FilterExpert.png";
import FilterShort from "../../assets/images/FilterShort.png";
import FilterMedium from "../../assets/images/FilterMedium.png";
import FilterExtended from "../../assets/images/FilterExtended.png";

import "./FilterButtons.scss";

const FilterButtons = ({ type, items, favoriteItems, setFilteredItems }) => {
    let filterImages, filterNames;

    if (type === "yoga") {
        filterImages = [
            FilterAll,
            FilterFavorites,
            FilterBeginner,
            FilterIntermediate,
            FilterExpert,
        ];
        filterNames = [
            "All",
            "Favorites",
            "Beginner",
            "Intermediate",
            "Expert",
        ];
    } else if (type === "meditation") {
        filterImages = [
            FilterAll,
            FilterFavorites,
            FilterShort,
            FilterMedium,
            FilterExtended,
        ];
        filterNames = ["All", "Favorites", "Short", "Medium", "Extended"];
    }

    const filterBy = (property) => {
        if (type === "yoga") {
            if (property === "all") {
                setFilteredItems(items);
            } else if (property === "favorites") {
                setFilteredItems(favoriteItems);
            } else {
                setFilteredItems(
                    items.filter((item) =>
                        item.level
                            .toLowerCase()
                            .includes(property.toLowerCase())
                    )
                );
            }
        } else if (type === "meditation") {
            if (property === "all") {
                setFilteredItems(items);
            } else if (property === "favorites") {
                setFilteredItems(favoriteItems);
            } else if (property === "short") {
                const playlistsWithLessThan100Songs = items.filter(
                    (item) => item.tracks.total < 100
                );
                setFilteredItems(playlistsWithLessThan100Songs);
            } else if (property === "medium") {
                const playlistsBetween100And200Songs = items.filter(
                    (item) =>
                        item.tracks.total >= 100 && item.tracks.total <= 200
                );
                setFilteredItems(playlistsBetween100And200Songs);
            } else if (property === "extended") {
                const playlistsWithMoreThan200Songs = items.filter(
                    (item) => item.tracks.total > 200
                );
                setFilteredItems(playlistsWithMoreThan200Songs);
            }
        }
    };

    return (
        <article className="filterButtons">
            {filterImages.map((image, index) => (
                <button
                    key={index}
                    onClick={() => {
                        filterBy(filterNames[index].toLowerCase());
                    }}
                >
                    <img src={image} alt="" />
                    <p className="textSmall">{filterNames[index]}</p>
                </button>
            ))}
        </article>
    );
};

export default FilterButtons;
