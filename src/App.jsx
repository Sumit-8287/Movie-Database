import { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Footer from "./components/Footer";
import TvShowCards from "./components/TvShowCards";
import Celebrity from "./components/Celebrity";
import AwardEvents from "./components/AwardEvents";
import PrivateRoute from "./components/PrivateRoute";
import LandingPage from "./components/LandingPage";
import MovieDetail from "./components/MovieDetail";

// Wrap App content inside a Router-aware component
function AppContent() {
  const location = useLocation();

  const paths = ["/login", "/signup"];

  return (
    <div className="bg-black min-h-screen w-full font-sans overflow-x-hidden">
      {!paths.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <LandingPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/movies"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/tvshows"
          element={
            <PrivateRoute>
              <TvShowCards />
            </PrivateRoute>
          }
        />
        <Route
          path="/Celebrities"
          element={
            <PrivateRoute>
              <Celebrity />
            </PrivateRoute>
          }
        />
        <Route
          path="/Awards & Events"
          element={
            <PrivateRoute>
              <AwardEvents />
            </PrivateRoute>
          }
        />
        <Route
          path="/movie/:id"
          element={
            <PrivateRoute>
              <MovieDetail />
            </PrivateRoute>
          }
        />

        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      {!paths.includes(location.pathname) && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
