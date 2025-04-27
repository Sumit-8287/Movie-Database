import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaImdb, FaSearch, FaBars } from "react-icons/fa";
import MovieSearch from "./MovieSearch";

const Navbar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // for mobile menu toggle
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim() !== "") {
      onSearch(query);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Toggle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-[#121212] text-white fixed px-4 sm:px-6 lg:px-8 flex items-center justify-between w-full top-0 z-20 shadow-lg py-4">
      <div className="flex items-center gap-3">
        {/* Logo */}
        <span className="text-yellow-400 text-4xl font-bold">
          <Link to="/">
            <FaImdb />
          </Link>
        </span>

        {/* Navbar links for larger screens */}
        <nav className="hidden lg:flex ml-2 gap-6 text-sm font-semibold">
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

        {/* Mobile Menu Icon */}
        <button onClick={toggleMenu} className="lg:hidden text-white text-2xl">
          <FaBars />
        </button>
      </div>

      {/* Movie Search */}
      <MovieSearch />

      {/* Navbar buttons for larger screens */}
      <div className="hidden md:flex items-center gap-3 md:mr-26 ">
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="text-xs font-semibold px-4 py-2 rounded border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition hover:cursor-pointer "
        >
          Sign in
        </button>
        <button
          className="text-xs font-semibold px-4 py-2 rounded border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition hover:cursor-pointer"
          onClick={handleLogout}
        >
          LogOut
        </button>
      </div>

      {/* Mobile menu for smaller screens */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#121212] text-white p-4 lg:hidden">
          <nav className="flex flex-col gap-4">
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
            <div className="flex flex-col gap-2 mt-4">
              <button
                onClick={() => navigate("/login")}
                className="text-xs font-semibold px-4 py-2 rounded border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
              >
                Sign in
              </button>
              <button
                onClick={handleLogout}
                className="text-xs font-semibold px-4 py-2 rounded border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
              >
                LogOut
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
