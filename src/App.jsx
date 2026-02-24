import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { UserContext } from "./UserContext";
import LandingPage from "./pages/LandingPage.jsx";
import Profile from "./pages/Profile.jsx";
import NotFound from "./pages/NotFound.jsx";
import ParticleBackground from "./components/ParticleBackground.jsx";
import Navbar from "./components/Navbar.jsx";
import EncryptorTool from "./components/EncryptorTool.jsx";
import "./App.css";

function App() {
  const [activeSlide, setActiveSlide] = useState(1);
  const [user, loading, error] = useAuthState(auth);

  return (
    <UserContext.Provider value={user}>
      <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
        <ParticleBackground />
        <Navbar setActiveSlide={setActiveSlide} />
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/encryptor/:cipher?" element={<EncryptorTool />} />
          <Route path="/:slide?" element={<LandingPage activeSlide={activeSlide} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;