import React, { useEffect, useState } from "react";

const Celebrity = () => {
  const [celebrities, setCelebrities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCelebrities = async () => {
      try {
        const res = await fetch(
          "https://movie-data-backend.onrender.com/all-Celebrity"
        );
        const data = await res.json();
        setCelebrities(data);
      } catch (error) {
        console.error("Error fetching celebrity data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCelebrities();
  }, []);

  if (loading) {
    return (
      <div className="w-full bg-black py-10 px-4 text-white text-center">
        <div className="p-6 bg-black text-white min-h-screen">
          <h2 className="text-4xl font-bold mb-6 text-center">
            Celebrity Gallery
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-2xl p-4 shadow-lg animate-pulse"
              >
                {/* Image Skeleton */}
                <div className="w-full h-60 bg-gray-700 rounded-xl mb-4"></div>

                {/* Name Skeleton */}
                <div className="h-6 bg-gray-700 rounded w-3/4 mb-3"></div>

                {/* BirthDate Skeleton */}
                <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>

                {/* Bio Skeleton */}
                <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-5/6 mb-4"></div>

                {/* Known For Title */}
                <div className="h-4 bg-gray-700 rounded w-1/3 mb-2"></div>

                {/* List Items Skeleton */}
                <div className="space-y-2">
                  <div className="h-3 bg-gray-700 rounded w-2/3"></div>
                  <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-700 rounded w-3/4"></div>
                </div>
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
    <div className="p-6 bg-black text-white min-h-screen">
      <h2 className="text-4xl font-bold mb-6 text-center">Celebrity Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {celebrities.map((celeb, index) => (
          <div
            key={index}
            className="bg-gray-900 rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <img
              src={celeb.image}
              alt={celeb.name}
              className="w-full h-60 object-cover rounded-xl mb-4"
            />
            <h3 className="text-2xl font-semibold mb-2">{celeb.name}</h3>
            <p className="text-sm text-gray-300 mb-2">
              <strong>Born:</strong> {celeb.birthDate}
            </p>
            <p className="text-gray-400 text-sm mb-3">{celeb.bio}</p>
            <div>
              <p className="font-semibold text-gray-200 mb-1">Known For:</p>
              <ul className="list-disc list-inside text-sm text-gray-400">
                {celeb.knownFor.map((work, idx) => (
                  <li key={idx}>{work}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Celebrity;
