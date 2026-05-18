import { useEffect, useState } from "react";
import { getPopularMovies, searchMovies } from "../services/movieApi";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import SkeletonCard from "../components/SkeletonCard";


function Home({ favorites, addToFavorites, recentlyViewed, removeFromFavorites }) {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [suggestionMovies, setSuggestionMovies] = useState([]);

    async function loadMovies() {
        try {
            setLoading(true);
            setError("");

            const popularMovies = await getPopularMovies();

            setMovies(popularMovies);
            setSuggestionMovies(popularMovies);
        } catch (error) {
            setError("Failed to load movies");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadMovies();
    }, []);

    // useEffect(() => {
    //     if (searchTerm.trim() === "") {
    //         loadMovies();
    //     }
    // }, [searchTerm])

    async function handleSearch() {

        const query = searchTerm.trim();

        if (!query) return;

        try {
            setLoading(true);
            setError("");

            const results = await searchMovies(query);
            setMovies(results);

        } catch (error) {
            setError("Failed to search movies.");
        } finally {
            setLoading(false);
        }
    }

    // if (loading) {
    //     return <Loader />;
    // }
    // if (error) {
    //     return <ErrorMessage message={error} />
    // }
    return (
        <div>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handleSearch} movies={suggestionMovies} recentlyViewed={recentlyViewed} />
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
            {error && (<ErrorMessage message={error} />)}

            {/* {movies.length === 0 ? (
                <div className="empty-state">
                    <h2>No movies found</h2>
                    <p>Try searching for another movie.</p>
                </div>
            ) : (
                <div className="movies-grid">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} favorites={favorites} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} />
                    ))}
                </div>
            )} */}
            {loading ? (
                <div className="movies-grid">
                    {[...Array(8)].map((_, index) => (
                        <SkeletonCard key={index} />
                    ))}
                </div>
            ) : movies.length === 0 ? (
                <div className="empty-state">
                    <h2>No movies found</h2>
                    <p>Try searching for another movie.</p>
                </div>
            ) : (
                <div className="movies-grid">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} favorites={favorites} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} />
                    ))}
                </div>
            )}

        </div>
    );
}


export default Home;