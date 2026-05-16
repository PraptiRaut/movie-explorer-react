import { useEffect, useState } from "react";
import { getPopularMovies, searchMovies } from "../services/movieApi";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";


function Home({ favorites, addToFavorites }) {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadMovies() {
            try {
                setLoading(true);
                setError("");

                const popularMovies = await getPopularMovies();

                setMovies(popularMovies);
            } catch (error) {
                setError("Failed to load movies");
            } finally {
                setLoading(false);
            }
        }
        loadMovies();
    }, []);

    async function handleSearch() {
        try {
            setLoading(true);
            setError("");
            if (!searchTerm.trim()) {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
                return;
            }
            const results = await searchMovies(searchTerm);
            setMovies(results);

        } catch (error) {
            setError("Failed to search movies.");
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <Loader />;
    }
    if (error) {
        return <ErrorMessage message={error} />
    }
    return (
        <div>
            <h1>Popular Movies</h1>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handleSearch} />
            <div className="movies-grid">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} favorites={favorites} addToFavorites={addToFavorites} />
                ))}
            </div>

        </div>
    );
}

export default Home;