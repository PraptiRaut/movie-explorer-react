import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMoviesDetails } from "../services/movieApi";

function MovieDetails() {

    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        async function loadMovie() {
            const movieData = await getMoviesDetails(id);
            setMovie(movieData);

        }
        loadMovie();
    }, [id]);

    if (!movie) {
        return <h2>Loading...</h2>
    }

    return (
        <div>
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
            <p>Release Date: {movie.release_date}</p>
            <p>⭐ {movie.vote_average}</p>
        </div>
    );
}

export default MovieDetails;