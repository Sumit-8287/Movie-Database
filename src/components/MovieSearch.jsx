// MovieSearch.js
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MovieSearch = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const navigate = useNavigate();

  const APIs = [
    "https://movie-data-backend.onrender.com/all-Movies",
    "https://movie-data-backend.onrender.com/all-tvshow",
    "https://movie-data-backend.onrender.com/all-events",
    "https://movie-data-backend.onrender.com/all-Celebrity",
  ];

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const allData = [];

        for (const api of APIs) {
          const res = await fetch(api);
          const data = await res.json();

          // Normalize data: har item me ek searchName field banao
          const normalizedData = data.map((item) => ({
            ...item,
            searchName:
              item.name ||
              item.title ||
              item.celebrityName ||
              item.eventName ||
              "", // default empty if kuch nahi mila
          }));

          allData.push(...normalizedData);
        }

        setMovies(allData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchAllData();
  }, []);

  // Filter logic
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredMovies([]);
    } else {
      const filtered = movies.filter((item) =>
        item.searchName?.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setFilteredMovies(filtered);
    }
  }, [searchTerm, movies]);

  // On selecting
  const handleSelectMovie = (movie) => {
    setSearchTerm("");

    if (movie._id) {
      navigate(`/movie/${movie._id}`);
    } else {
      console.error("Movie ID missing");
    }
  };

  return (
    <div className="relative w-7 mr-0 max-w-xs -ml-92">
      {/* Search input */}
      <div className="flex items-center justify-between w-100 bg-gray-800 rounded-md px-2 border border-gray-600 space-x-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="flex-1 bg-transparent text-white w-full px-2 py-1 focus:outline-none"
        />
        <button className="text-yellow-400 p-2">
          <FaSearch />
        </button>
      </div>

      {/* Suggestion dropdown */}
      {filteredMovies.length > 0 && (
        <ul className="absolute top-12 left-0 w-100 bg-[#1f1f1f] rounded shadow-md z-50 max-h-60 overflow-y-auto">
          {filteredMovies.map((movie, index) => (
            <li
              key={movie._id || index}
              onClick={() => handleSelectMovie(movie)}
              className="p-2 hover:bg-gray-700 cursor-pointer"
            >
              {movie.searchName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieSearch;
