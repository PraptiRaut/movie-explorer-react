import { useEffect, useState } from "react";
import { getPopularMovies, searchMovies } from "../services/movieApi";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";


function Home({ favorites, addToFavorites, recentlyViewed, removeFromFavorites }) {

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
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handleSearch} />
            {recentlyViewed.length > 0 && (
                <>
                    <h2>Recently Viewed</h2>
                    <div className="movies-grid">
                        {recentlyViewed.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} favorites={favorites} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} />
                        ))}
                    </div>
                </>
            )}
            <h2>Popular Movies</h2>
            <div className="movies-grid">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} favorites={favorites} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} />
                ))}
            </div>

        </div>
    );
}

export default Home;