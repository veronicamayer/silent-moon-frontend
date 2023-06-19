import "./SearchBar.scss";

const SearchBar = ({ content, items, setFilteredItems }) => {
    const filterTitle = (e) => {
        if (e.target.value === "") {
            setFilteredItems(items);
        } else {
            setFilteredItems(
                items.filter((item) =>
                    item[content]
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
                )
            );
        }
    };

    return (
        <form className="searchBar">
            <input type="text" onChange={filterTitle} />
        </form>
    );
};

export default SearchBar;
