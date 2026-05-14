import { useEffect, useState } from "react";
import { getPopularMovies } from "../services/movieApi";

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
            {movies.map((movie) => (
                <p key={movie.id}>{movie.title}</p>
            ))}
        </div>
    );
}

export default Home;