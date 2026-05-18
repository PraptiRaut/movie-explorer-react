import { useNavigate } from "react-router-dom";
import React from "react";

function MovieCard({ movie, favorites, addToFavorites, removeFromFavorites }) {

    const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const navigate = useNavigate();
    const isFavorite = favorites.some((fav) => fav.id === movie.id);

    function handleMovieClick() {
        navigate(`/movie/${movie.id}`);
    }


    function handleFavorite() {
        if (isFavorite) {
            removeFromFavorites(movie.id)
        } else {
            addToFavorites(movie);

        }
    }
    return (
        <div className="movie-card">
            <img
                src={imageUrl}
                alt={movie.title}
                onClick={handleMovieClick} />
            <div className="movie-info">
                <h3 onClick={handleMovieClick}>
                    {movie.title}
                </h3>
                <p>⭐ {movie.vote_average}</p>
                <button onClick={handleFavorite}>
                    {isFavorite
                        ? "❌ Remove"
                        : "❤️ Favorite"}
                </button>
            </div>
        </div>
    );
}

export default React.memo(MovieCard);