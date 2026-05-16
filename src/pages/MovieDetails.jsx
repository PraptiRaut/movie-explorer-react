import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMoviesDetails } from "../services/movieApi";

function MovieDetails() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        async function loadMovie() {
            const movieData = await getMoviesDetails(id);
            setMovie(movieData);

        }
        loadMovie();
    }, [id]);

    function handleBack() {
        navigate(-1);
    }

    if (!movie) {
        return <h2>Loading...</h2>
    }

    const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
    const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    return (
        <div className="movie-details">
            <div className="movie-backdrop"
                style={{ backgroundImage: `url(${backdropUrl})`, }}>
                <div className="overplay">
                    <img src={posterUrl} alt={movie.title} className="details-poster" />
                    <div className="details-content">
                        <button className="back-btn" onClick={handleBack}>← Back</button>
                        <h1>{movie.title}</h1>
                        <p>{movie.overview}</p>
                        <p>Release Date: {movie.release_date}</p>
                        <p>⭐ {movie.vote_average}</p>
                    </div></div></div></div>
    );
}

export default MovieDetails;