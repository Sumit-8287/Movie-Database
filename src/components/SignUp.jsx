import React, { useState } from "react";
import { FaImdb, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [showPass, setShowPass] = useState(false);
  const API = "https://movie-data-backend.onrender.com";
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Regex for validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be 8+ chars long, with uppercase, lowercase, number, and special char."
      );
      return;
    }

    try {
      const res = await fetch(`${API}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("User registration successful!");
        navigate("/login");
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#101010] px-4">
      <div className="w-full max-w-md p-8 bg-[#181818] rounded-xl shadow-lg">
        <div className="flex justify-center mb-6">
          <span className="text-yellow-400 text-5xl">
            <FaImdb />
          </span>
        </div>
        <h1 className="text-white text-2xl font-bold text-center mb-2">
          Create account
        </h1>

        {error && (
          <div className="bg-red-600 text-white px-3 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form className="flex flex-col gap-5 mt-6" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-gray-300 text-sm">Your name</span>
            <input
              type="text"
              required
              className="w-full py-2 px-3 mt-1 rounded bg-[#222] text-white border border-gray-700 focus:outline-none focus:border-yellow-400"
              placeholder="Full name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-gray-300 text-sm">Email</span>
            <input
              type="email"
              required
              className="w-full py-2 px-3 mt-1 rounded bg-[#222] text-white border border-gray-700 focus:outline-none focus:border-yellow-400"
              placeholder="Your email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-gray-300 text-sm">Password</span>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                required
                className="w-full py-2 px-3 mt-1 pr-10 rounded bg-[#222] text-white border border-gray-700 focus:outline-none focus:border-yellow-400"
                placeholder="Password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-2 top-3 text-gray-400"
                onClick={() => setShowPass((v) => !v)}
                tabIndex={-1}
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </label>

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 rounded mt-2"
          >
            Create your IMDb account
          </button>
        </form>

        <div className="flex justify-between mt-5 text-sm">
          <span className="text-gray-400">Already have an account?</span>
          <button
            className="text-yellow-400 hover:underline"
            onClick={() => navigate("/login")}
          >
            Sign in
          </button>
        </div>

        <div className="flex mt-6 text-sm text-gray-400 justify-center">
          By creating an account, you agree to IMDb's&nbsp;
          <a href="#" className="text-yellow-400 hover:underline">
            Conditions of Use
          </a>
          &nbsp;and&nbsp;
          <a href="#" className="text-yellow-400 hover:underline">
            Privacy Policy
          </a>
          .
        </div>
      </div>
    </div>
  );
}
