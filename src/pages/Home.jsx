import { useEffect, useState } from "react";
import { getPopularMovies } from "../services/movieApi";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";

function Home() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function loadMovies() {
            const popularMovies = await getPopularMovies();

            setMovies(popularMovies);

        }
        loadMovies();
    }, []);
    return (
        <div>
            <h1>Popular Movies</h1>
            <SearchBar />
            <div className="movies-grid">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>

        </div>
    );
}

export default Home;