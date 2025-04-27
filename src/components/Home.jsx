import React, { useEffect, useState } from "react";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          "https://movie-data-backend.onrender.com/all-Movies"
        );
        const data = await res.json();
        console.log(data);
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);
  if (loading) {
    return (
      <div className="w-full bg-black py-10 px-4 text-white text-center">
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden animate-pulse"
            >
              {/* Image Skeleton */}
              <div className="w-full h-64 bg-gray-700"></div>

              {/* Details Skeleton */}
              <div className="p-4 flex flex-col gap-2 bg-gray-900">
                <div className="h-6 bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                <div className="h-4 bg-gray-700 rounded w-1/3"></div>

                {/* Button Skeleton */}
                <div className="h-8 bg-gray-700 rounded-xl w-3/4 mt-2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-black py-10 px-4 text-red-500 text-center">
        Error: {error}
      </div>
    );
  }

  return (
    <>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden"
          >
            {/* Image Container */}
            <div className="w-full h-64 bg-black flex items-center justify-center">
              <img
                src={movie.img}
                alt={movie.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Details Container */}
            <div className="p-4 flex flex-col gap-2 bg-black transition-all duration-300">
              <h2 className="text-xl font-bold">{movie.name}</h2>
              <p className="text-sm text-gray-400">Year: {movie.year}</p>
              <p className="text-sm text-yellow-400">Rating: {movie.rating}</p>

              {/* Trailer Button */}
              <a
                href={movie.video}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 bg-blue-600 hover:bg-blue-400 text-white px-4 py-2 rounded-xl text-sm transition-all duration-300 cursor-pointer"
              >
                Watch Trailer
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
