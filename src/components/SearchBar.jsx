import { useState } from "react";

function SearchBar({ searchTerm, setSearchTerm, onSearch }) {

    function handleChange(event) {
        setSearchTerm(event.target.value);
    }

    function handleSubmit() {
        event.preventDefault();
        onSearch();
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Search movies..." value={searchTerm} onChange={handleChange} />
            <button type="submit">Search</button>
        </form>
    );
}

export default SearchBar;