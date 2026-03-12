import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { UserContext } from "./UserContext";
import LandingPage from "./pages/LandingPage.jsx";
import Profile from "./pages/Profile.jsx";
import ParticleBackground from "./components/ParticleBackground.jsx";
import Navbar from "./components/Navbar.jsx";
import "./App.css";

function App() {
  const [currentView, setCurrentView] = useState("home");
  const [user, loading, error] = useAuthState(auth);

  return (
    <UserContext.Provider value={user}>
      <div className="app-container" style={{ position: "relative", width: "100%", minHeight: "100vh" }}>
        <ParticleBackground />
        
        {/* Fixed Navbar with Z-index so it sits above scrollable content */}
        <Navbar currentView={currentView} setCurrentView={setCurrentView} />
        
        {/* Main Scrollable View Area */}
        <main className="view-transition-wrapper">
          {currentView === "home" && <LandingPage />}
          {currentView === "profile" && <Profile />}
        </main>
      </div>
    </UserContext.Provider>
  );
}

export default App;