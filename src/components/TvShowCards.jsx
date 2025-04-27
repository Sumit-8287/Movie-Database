import React, { useEffect, useState } from "react";

const TvShowCards = () => {
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTvShows = async () => {
      try {
        const response = await fetch(
          "https://movie-data-backend.onrender.com/all-tvshow"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTvShows(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTvShows();
  }, []);

  if (loading) {
    return (
      <div className="w-full bg-black py-10 px-4 text-white text-center">
        <div className="w-full bg-black py-10 px-4">
          <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-xl p-4 text-white shadow-lg animate-pulse"
              >
                {/* Image Skeleton */}
                <div className="w-full h-64 bg-gray-700 rounded-xl mb-4"></div>

                {/* Title Skeleton */}
                <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>

                {/* Rating Skeleton */}
                <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>

                {/* Seasons Skeleton */}
                <div className="h-4 bg-gray-700 rounded w-1/3 mb-2"></div>

                {/* Release Date Skeleton */}
                <div className="h-4 bg-gray-700 rounded w-1/3 mb-2"></div>

                {/* Genre Skeleton */}
                <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>

                {/* Description Skeleton */}
                <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-5/6 mb-4"></div>

                {/* Trailer Button Skeleton */}
                <div className="h-10 bg-gray-700 rounded-md w-1/2"></div>
              </div>
            ))}
          </div>
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
    <div className="w-full bg-black py-10 px-4">
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tvShows.map((show, index) => (
          <div
            key={index}
            className="bg-gray-900 rounded-xl p-4 text-white shadow-lg"
          >
            <img
              src={show.image}
              alt={show.title}
              className="w-full h-64 object-cover rounded-xl mb-4"
            />
            <h2 className="text-xl font-bold">{show.title}</h2>
            <p className="text-yellow-400 text-sm">⭐ {show.rating}</p>
            <p className="text-sm">Seasons: {show.seasons}</p>
            <p className="text-sm">Released: {show.releaseDate}</p>
            <p className="text-sm italic text-gray-400">{show.genre}</p>
            <p className="text-sm mt-2 mb-4">{show.description}</p>
            <a
              href={show.trailer}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-400 text-white px-4 py-2 rounded text-sm inline-block"
            >
              Watch Trailer
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TvShowCards;
