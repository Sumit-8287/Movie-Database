import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        // Fetch data from all APIs
        for (const api of APIs) {
          const res = await fetch(api);
          if (res.ok) {
            const data = await res.json();
            allData.push(...data);
          } else {
            console.error(`Failed to fetch from ${api}`);
          }
        }

        // Find the data by ID
        const selectedData = allData.find((item) => item._id === id);
        setData(selectedData || null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center text-white py-4 mt-20">
        Loading details...
      </div>
    );
  }

  if (error || !data) {
    return <div className="text-center text-white py-4">Data not found</div>;
  }

  const isMovie = data.hasOwnProperty("rating"); // Check if it's a movie
  const isTVShow = data.hasOwnProperty("seasons"); // Check if it's a TV Show
  const isEvent = data.hasOwnProperty("hostedBy"); // Check if it's an Event
  const isCelebrity = data.hasOwnProperty("bio"); // Check if it's a Celebrity

  return (
    <div className="p-4 text-white mt-20">
      <h2 className="text-2xl">{data.name || data.title}</h2>

      <div className="text-center flex justify-center">
        <img
          src={data.img || data.image}
          alt={data.name || data.title}
          className="w-50 h-auto mt-4"
        />
      </div>

      {/* Conditional rendering based on the type of data */}
      {isMovie && data.video && (
        <div className="mt-4">
          <a
            href={data.video}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded"
          >
            Watch Trailer
          </a>
        </div>
      )}

      {isTVShow && data.trailer && (
        <div className="mt-4">
          <a
            href={data.trailer}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded"
          >
            Watch Trailer
          </a>
        </div>
      )}

      {isEvent && data.trailer && (
        <div className="mt-4">
          <a
            href={data.trailer}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded"
          >
            Watch Event Video
          </a>
        </div>
      )}

      {isCelebrity && data.trailer && (
        <div className="mt-4">
          <a
            href={data.trailer}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded"
          >
            Watch Celebrity Video
          </a>
        </div>
      )}

      {/* Display specific details based on type */}
      {isMovie && (
        <>
          <div className="mt-4">
            <strong>Rating: </strong> {data.rating}
          </div>
          <div className="mt-2">
            {data.year ? (
              <>
                <strong>Year: </strong> {data.year || "Not available"}
              </>
            ) : (
              ""
            )}
          </div>
        </>
      )}

      {isTVShow && (
        <>
          <div className="mt-4">
            <strong>Seasons: </strong> {data.seasons}
          </div>
          <div className="mt-2">
            <strong>Year: </strong> {data.releaseYear || "Not available"}
          </div>
        </>
      )}

      {isEvent && (
        <>
          <div className="mt-4">
            <strong>Hosted By: </strong> {data.hostedBy}
          </div>
          <div className="mt-2">
            <strong>Year: </strong> {data.year || "Not available"}
          </div>
        </>
      )}

      {isCelebrity && (
        <>
          <div className="mt-4">
            <strong>Bio: </strong> {data.bio}
          </div>
          <div className="mt-2">
            <strong>Known For: </strong>
            <ul className="list-disc list-inside">
              {data.knownFor.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetail;
