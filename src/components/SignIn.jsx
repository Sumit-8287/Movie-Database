import React, { useState } from "react";
import { FaImdb, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const API = "https://movie-data-backend.onrender.com";

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      alert("Server error. Please try again.");
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
          Sign in
        </h1>
        <form className="flex flex-col gap-5 mt-6" onSubmit={handleLogin}>
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
                placeholder="Your password"
                autoComplete="current-password"
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
            Sign In
          </button>
        </form>
        <div className="flex justify-between mt-5 text-sm">
          <Link
            to="/Forgot-password"
            className="text-yellow-400 hover:underline"
          >
            Forgot password?
          </Link>
          <Link to="/signup" className="text-yellow-400 hover:underline">
            Create account
          </Link>
        </div>
        <div className="flex mt-6 text-sm text-gray-400 justify-center">
          By signing in, you agree to IMDb's&nbsp;
          <Link
            to="/Conditions-of-Use"
            className="text-yellow-400 hover:underline"
          >
            Conditions of Use
          </Link>
          &nbsp;and&nbsp;
          <Link
            to="/Privacy-Policy"
            className="text-yellow-400 hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </div>
      </div>
    </div>
  );
}
