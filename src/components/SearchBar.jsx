import { useState } from "react";

function SearchBar({ searchTerm, setSearchTerm, onSearch }) {

    function handleChange(event) {
        setSearchTerm(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        onSearch();
    }

    return (
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
        </form>
    );
}

export default SearchBar;