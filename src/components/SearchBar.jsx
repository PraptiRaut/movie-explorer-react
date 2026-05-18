import { useEffect, useMemo, useRef, useState } from "react";

function SearchBar({ searchTerm, setSearchTerm, onSearch, movies, recentlyViewed }) {

    const [suggestions, setSuggestions] = useState([]);
    const [activeIndex, setActiveIndex] = useState(-1);
    const searchRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target)
            ) {
                setSuggestions([]);
            }

        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

    const allMovies = useMemo(() => {
        return [...movies, ...recentlyViewed];
    }, [movies, recentlyViewed]);

    function handleChange(event) {
        const value = event.target.value;
        setSearchTerm(value);

        if (value.trim() === "") {
            setSuggestions([]);
            return;
        }
        // const allMovies = [...movies, ...recentlyViewed];
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

    function handleKeyDown(event) {
        if (suggestions.length === 0) return;
        if (event.key === "ArrowDown") {
            setActiveIndex((prev) => prev < suggestions.length - 1 ? prev + 1 : prev);
        }
        else if (event.key === "ArrowUp") {
            setActiveIndex((prev) => prev > 0 ? prev - 1 : prev);
        }
        else if (event.key === "Enter") {
            event.preventDefault();
            if (activeIndex >= 0) {
                setSearchTerm(suggestions[activeIndex].title);
                setSuggestions([]);
                setActiveIndex(-1);
            }
        }
        else if (event.key === "Escape") {
            setSuggestions([]);
            setActiveIndex(-1);
        }

    }

    return (
        <div className="search-container" ref={searchRef}>
            <form
                className="search-form"
                onSubmit={handleSubmit}>
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search movies..."
                    value={searchTerm}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown} />

                <button
                    className="search-btn"
                    type="submit">Search</button>

                {suggestions.length > 0 && (
                    <ul className="suggestions-list">
                        {suggestions.map((movie, index) => (
                            <li
                                key={movie.id}
                                className={`suggestion-item ${index === activeIndex
                                    ? "active-suggestion"
                                    : ""
                                    }`}
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