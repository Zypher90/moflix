import searchIcon from "../assets/search.svg"

const Search = ({searchTerm, setSearchTerm}) => {
    return (
        <div className="search">
            <img src={searchIcon} alt="Search" />
            <input className="search-input" type="text" placeholder="Search for your favourite movies" value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
    )
}

export default Search