import React, { useEffect, useState } from "react";
import { FaImdb } from "react-icons/fa";

export default function LandingPage() {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [celebrities, setCelebrities] = useState([]);
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = "https://movie-data-backend.onrender.com";

  useEffect(() => {
    const fetchData = async (endpoint, setter) => {
      try {
        const res = await fetch(`${API}/${endpoint}`);
        const data = await res.json();
        setter(data);
      } catch (err) {
        console.error(`Error fetching ${endpoint}:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchData("all-Movies", setMovies);
    fetchData("all-Tvshow", setTvShows);
    fetchData("all-Celebrity", setCelebrities);
    fetchData("all-events", setAwards);
  }, []);
  if (loading) {
    return (
      <div className="bg-[#101010] text-white min-h-screen pb-16 w-11/12">
        <div className="flex justify-center mb-8 pt-6"></div>

        {/* Skeleton Sections */}
        {Array.from({ length: 4 }).map((_, sectionIndex) => (
          <section
            key={sectionIndex}
            className={`py-16 ${sectionIndex % 2 !== 0 ? "bg-[#181818]" : ""}`}
          >
            {/* Title Skeleton */}
            <div className="h-8 bg-gray-700 rounded w-48 mx-auto mb-8 animate-pulse"></div>

            {/* Cards Skeleton */}
            <div className="flex gap-6 px-4 overflow-x-auto scrollbar-hide">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="w-60 flex-shrink-0 animate-pulse">
                  <div className="w-60 h-80 bg-gray-700 rounded-lg shadow-lg mb-3"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto"></div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-[#101010] text-white min-h-screen pb-16">
      <div className="flex justify-center mb-8 pt-6"></div>

      {/* Movies Section */}
      <Section
        title="Trending Movies"
        data={movies}
        imgKey="img"
        nameKey="name"
      />

      {/* TV Shows Section */}
      <Section
        title="Popular TV Shows"
        data={tvShows}
        imgKey="image"
        nameKey="title"
        bg="bg-[#181818]"
      />

      {/* Celebrities Section */}
      <Section
        title="Celebrities"
        data={celebrities}
        imgKey="image"
        nameKey="name"
      />

      {/* Awards Section */}
      <Section
        title="Awards & Events"
        data={awards}
        imgKey="image"
        nameKey="title"
        bg="bg-[#181818]"
      />
    </div>
  );
}

const Section = ({ title, data, imgKey, nameKey, bg }) => (
  <section className={`py-16 ${bg || ""}`}>
    <h2 className="text-center text-3xl mb-8">{title}</h2>
    <div className="flex gap-6 px-4 overflow-x-auto scrollbar-hide">
      {data.map((item) => (
        <div key={item._id} className="w-60 flex-shrink-0">
          <img
            src={item[imgKey]}
            alt={item[nameKey]}
            className="w-60 h-80 object-cover rounded-lg shadow-lg"
          />
          <h3 className="text-center text-lg mt-3">{item[nameKey]}</h3>
        </div>
      ))}
    </div>
  </section>
);
