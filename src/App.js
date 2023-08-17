import React, { useState, useEffect } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from './MovieCard'

const API_URL = process.env.REACT_APP_API_KEY;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const searchMovies = async (title) => {
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      if (response.ok) {
        const data = await response.json();
        setMovies(data?.Search || []);
      } else {
        console.error("Error fetching data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    searchMovies("Hulk");
  }, []);

  const handleSearchClick = () => {
    searchMovies(searchInput);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      searchMovies(searchInput);
    }
  };

  return (
    <div className="app">
      <h1>MovieHub</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Search for movies"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={handleInputKeyPress}
        />
        <img src={SearchIcon} alt="Search" onClick={handleSearchClick} />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
