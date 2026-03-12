import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Routes, Route } from "react-router-dom";
import { auth } from "./firebase";
import { UserContext } from "./UserContext";
import LandingPage from "./pages/LandingPage.jsx";
import Profile from "./pages/Profile.jsx";
import NotFound from "./pages/NotFound.jsx";
import ParticleBackground from "./components/ParticleBackground.jsx";
import Navbar from "./components/Navbar.jsx";
import "./App.css";

function App() {
  const [user] = useAuthState(auth);

  return (
    <UserContext.Provider value={user}>
      <div className="app-container" style={{ position: "relative", width: "100%", minHeight: "100vh" }}>
        <ParticleBackground />

        {/* Screen-reader only H1 for accessibility & SEO */}
        <h1 className="sr-only">Cipher Suite: The Sophisticated Encryption Engine</h1>

        {/* Navbar — uses useLocation internally, no props needed */}
        <Navbar />

        {/* Routed View Area */}
        <main className="view-transition-wrapper">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="app-footer" aria-label="Site footer">
          <a href="https://github.com/syed-raiyan-ali/Cipher-Suite" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">GitHub</a>
          <span aria-hidden="true"> · </span>
          <a href="https://www.linkedin.com/in/syed-raiyan-ali/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">LinkedIn</a>
        </footer>
      </div>
    </UserContext.Provider>
  );
}

export default App;