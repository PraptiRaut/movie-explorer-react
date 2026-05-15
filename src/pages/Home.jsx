import { useEffect, useState } from "react";
import { getPopularMovies, searchMovies } from "../services/movieApi";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";


function Home() {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        async function loadMovies() {
            const popularMovies = await getPopularMovies();

            setMovies(popularMovies);

        }
        loadMovies();
    }, []);

    async function handleSearch() {
        if (!searchTerm.trim()) {
            const popularMovies = await getPopularMovies();
            setMovies(popularMovies);
            return;
        }

        const results = await searchMovies(searchTerm);
        setMovies(results);

    }
    return (
        <div>
            <h1>Popular Movies</h1>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handleSearch} />
            <div className="movies-grid">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>

        </div>
    );
}

export default Home;