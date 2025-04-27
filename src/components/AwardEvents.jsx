import React, { useEffect, useState } from "react";

const AwardEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(
          "https://movie-data-backend.onrender.com/all-events"
        );
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="w-full bg-black py-10 px-4 text-white text-center">
        <div className="p-6 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-xl shadow-md overflow-hidden animate-pulse"
            >
              {/* Image Skeleton */}
              <div className="w-full h-48 bg-gray-700"></div>

              {/* Content Skeleton */}
              <div className="p-4 space-y-2">
                <div className="h-6 bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                <div className="h-4 bg-gray-700 rounded w-2/3"></div>
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
    <div className="p-6 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {events.map((event, index) => (
        <div
          key={index}
          className="bg-gray-900 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
        >
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-lg text-gray-500 font-bold">{event.title}</h2>
            <p className="text-sm text-gray-300">{event.description}</p>
            <p className="text-sm text-gray-300 mt-2">
              <strong>Year:</strong> {event.year}
            </p>
            <p className="text-sm text-gray-300">
              <strong>Hosted By:</strong> {event.hostedBy}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AwardEvents;
