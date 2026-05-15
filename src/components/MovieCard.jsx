function MovieCard({ movie, favorites, addToFavorites }) {

    const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const isFavorite = favorites.some((fav) => fav.id === movie.id);


    function handleFavorite() {
        if (!isFavorite) {
            addToFavorites(movie);

        }
    }
    return (
        <div className="movie-card">
            <img src={imageUrl} alt={movie.title} />
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>⭐ {movie.vote_average}</p>
                <button onClick={handleFavorite}>{isFavorite ? "❤️ Added" : "🤍 Favorite"}</button>
            </div>
        </div>
    );
}

export default MovieCard;