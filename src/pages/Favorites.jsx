import MovieCard from "../components/MovieCard";

function Favorites({ favorites, addToFavorites, removeFromFavorites }) {

    if (favorites.length === 0) {
        return (
            <div className="empty-state">
                <h2>No favorite movies yet.</h2>
                <p>Start adding movies to your favorites list.</p>
            </div>
        );
    }
    return (
        <div>
            <h1>Favorites Movies</h1>
            <div className="movies-grid">
                {favorites.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} favorites={favorites} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} />
                ))}
            </div>
        </div>
    );
}

export default Favorites;