import MovieCard from "../components/MovieCard";

function Favorites({ favorites, addToFavorites }) {

    if (favorites.length === 0) {
        return <h2>No favorite movies yet.</h2>
    }
    return (
        <div>
            <h1>Favorites Movies</h1>
            <div className="movies-grid">
                {favorites.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} favorites={favorites} addToFavorites={addToFavorites} />
                ))}
            </div>
        </div>
    );
}

export default Favorites;