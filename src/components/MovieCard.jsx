function MovieCard({ movie }) {

    const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    return (
        <div className="movie-card">
            <img src={imageUrl} alt={movie.title} />
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>⭐ {movie.vote_average}</p>
            </div>
        </div>
    );
}

export default MovieCard;