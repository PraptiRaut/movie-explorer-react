import { useState } from "react";

function SearchBar({ searchTerm, setSearchTerm, onSearch, movies, recentlyViewed }) {

    const [suggestions, setSuggestions] = useState([]);

    function handleChange(event) {
        const value = event.target.value;
        setSearchTerm(value);

        if (value.trim() === "") {
            setSuggestions([]);
            return;
        }
        const allMovies = [...movies, ...recentlyViewed];
        const filteredMovies = allMovies.filter((movie) =>
            movie.title.toLowerCase().includes(value.toLowerCase()));
        setSuggestions(filteredMovies.slice(0, 5));

        // const filteredMovies = movies.filter((movie) => movie.title.toLowerCase().includes(value.toLowerCase()));
        // setSuggestions(filteredMovies.slice(0, 5));
    }

    function handleSubmit(event) {
        event.preventDefault();
        onSearch();
        setSuggestions([]);
        setSearchTerm("");
    }

    return (
        <div className="search-container">
            <form
                className="search-form"
                onSubmit={handleSubmit}>
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search movies..."
                    value={searchTerm}
                    onChange={handleChange} />

                <button
                    className="search-btn"
                    type="submit">Search</button>

                {suggestions.length > 0 && (
                    <ul className="suggestions-list">
                        {suggestions.map((movie) => (
                            <li
                                key={movie.id}
                                className="suggestion-item"
                                onClick={() => {
                                    setSearchTerm(movie.title);
                                    setSuggestions([]);
                                }}
                            >
                                {movie.title}
                            </li>
                        ))}
                    </ul>
                )}

            </form>
        </div>
    );
}

export default SearchBar;