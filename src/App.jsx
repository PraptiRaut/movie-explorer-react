import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";
import MovieDetails from "./pages/MovieDetails";
import { useEffect, useState } from "react";

function App() {

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  function addToFavorites(movie) {
    const updatedFavorites = [...favorites, movie];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home favorites={favorites} addToFavorites={addToFavorites} />} />
        <Route path="/favorites" element={<Favorites favorites={favorites} addToFavorites={addToFavorites} />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;