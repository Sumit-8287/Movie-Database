import React, { useState } from "react";
import SignIn from "./SignIn";
import { Link, useNavigate } from "react-router-dom";
import { FaImdb, FaSearch } from "react-icons/fa";
import MovieSearch from "./MovieSearch";

const Navbar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim() !== "") {
      onSearch(query);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/signin";
  };

  return (
    <header className="bg-[#121212] text-white fixed px-2 md:px-6  flex items-center justify-between w-11/12  top-0 z-20 shadow-lg py-4">
      <div className="flex items-center gap-3 ">
        <span className="text-yellow-400 text-4xl font-bold">
          <Link to="/">
            <FaImdb />
          </Link>
        </span>
        <nav className="hidden md:flex ml-2 gap-6 text-sm font-semibold">
          <Link to="/movies" className="hover:text-yellow-400">
            Movies
          </Link>
          <Link to="/tvshows" className="hover:text-yellow-400">
            TV Shows
          </Link>
          <Link to="/Celebrities" className="hover:text-yellow-400">
            Celebrities
          </Link>
          <Link to="/Awards & Events" className="hover:text-yellow-400">
            Awards & Events
          </Link>
        </nav>
      </div>

      <MovieSearch />
      <div className="flex items-center gap-3 m">
        <button
          onClick={() => {
            navigate("/login");
          }}
          className=" hidden md:flex text-xs font-semibold px-4 py-2 rounded border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition hover:cursor-pointer"
        >
          Sign in
        </button>
        <button
          className="  hidden md:flex text-xs font-semibold px-4 py-2 rounded border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition hover:cursor-pointer"
          onClick={handleLogout}
        >
          LogOut
        </button>
      </div>
    </header>
  );
};

export default Navbar;
