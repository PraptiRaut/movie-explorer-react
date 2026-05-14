import { useState } from "react";

function SearchBar() {

    const [searchTerm, setSearchTerm] = useState("");

    function handleChange(event) {
        setSearchTerm(event.target.value);
    }

    return (
        <form>
            <input type="text" placeholder="Search movies..." value={searchTerm} onChange={handleChange} />
            <button type="submit">Search</button>
        </form>
    );
}

export default SearchBar;