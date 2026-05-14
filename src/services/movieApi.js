const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function getPopularMovies() {
    const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}`
    );

    const data = await response.json();
    return data.results;

}