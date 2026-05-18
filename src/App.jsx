import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";
import MovieDetails from "./pages/MovieDetails";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

function App() {

  const [favorites, setFavorites] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    const storedReccentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    setRecentlyViewed(storedReccentlyViewed);
  }, []);

  const addToFavorites = useCallback(
    (movie) => {
      const alreadyExists = favorites.some((fav) => fav.id === movie.id);

      if (alreadyExists) {
        return;
      }
      const updatedFavorites = [...favorites, movie];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

      toast.success("Added to favorites");
    }, [favorites]);

  const removeFromFavorites = useCallback((movieId) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    toast.info("Removed from favorites");
  }, [favorites])

  function addToRecentlyViewed(movie) {
    const filteredMovies = recentlyViewed.filter((item) => item.id !== movie.id);
    const updatedMovies = [movie, ...filteredMovies,].slice(0, 5);
    setRecentlyViewed(updatedMovies);
    localStorage.setItem("recentlyViewed", JSON.stringify(updatedMovies));

  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home favorites={favorites} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} recentlyViewed={recentlyViewed} />} />
        <Route path="/favorites" element={<Favorites favorites={favorites} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} />} />
        <Route path="/movie/:id" element={<MovieDetails addToRecentlyViewed={addToRecentlyViewed} />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;