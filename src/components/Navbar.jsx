import './Navbar.css';
import logo from '../assets/logo.svg';
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../UserContext";
import { Helmet } from "react-helmet-async";

function Navbar() {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("encryptor");

  const isOnHome = location.pathname === "/";
  const isOnProfile = location.pathname === "/profile";

  const isLoggedIn = user?.uid || user?.isLoggedIn;
  const displayName = isLoggedIn && user.displayName ? user.displayName : "User";
  const photoURL = isLoggedIn && user.photoURL
    ? user.photoURL
    : "https://ui-avatars.com/api/?name=U&background=0A192F&color=A5B4FC&size=48";

  // Track active section via IntersectionObserver when on the home page
  useEffect(() => {
    if (!isOnHome) return;

    const sections = document.querySelectorAll('.smooth-section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.5 });

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, [isOnHome]);

  const handleNavClick = (sectionId) => {
    if (!isOnHome) {
      // Navigate to home first, then scroll after mount
      navigate("/");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setActiveSection(sectionId);
  };

  // Dynamic page title based on current URL + scroll position
  let pageTitle = "Cipher Suite";
  if (isOnProfile) {
    pageTitle = "Cipher Suite | Profile";
  } else if (isOnHome) {
    if (activeSection === "encryptor") pageTitle = "Cipher Suite | Encryptor";
    if (activeSection === "how-it-works") pageTitle = "Cipher Suite | How It Works";
    if (activeSection === "history") pageTitle = "Cipher Suite | History";
  }

  return (
    <nav className="main-navbar editorial-nav" aria-label="Main Navigation">
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>

      {/* Logo — navigates to / */}
      <div
        className="logo interactive"
        onClick={() => navigate("/")}
        role="button"
        tabIndex="0"
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate("/"); }}
        aria-label="Navigate to Home"
      >
        <img src={logo} alt="Cipher Suite Logo" className="logo-img" />
        <h1 className='logo-text'>Cipher Suite</h1>
      </div>

      {/* Section nav buttons */}
      <div className="nav-btns">
        <button
          className={`nav-link ${isOnHome && activeSection === 'encryptor' ? 'active' : ''}`}
          onClick={() => handleNavClick('encryptor')}
        >Encryptor</button>
        <button
          className={`nav-link ${isOnHome && activeSection === 'how-it-works' ? 'active' : ''}`}
          onClick={() => handleNavClick('how-it-works')}
        >How It Works</button>
        <button
          className={`nav-link ${isOnHome && activeSection === 'history' ? 'active' : ''}`}
          onClick={() => handleNavClick('history')}
        >History</button>
      </div>

      {/* Profile link — navigates to /profile */}
      <div
        className="profile-link interactive"
        onClick={() => navigate("/profile")}
        role="button"
        tabIndex="0"
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate("/profile"); }}
        aria-label="View Profile"
      >
        <span className='profile-text'>{displayName}</span>
        <img
          src={photoURL}
          alt={displayName}
          className="profile-avatar"
          referrerPolicy="no-referrer"
        />
      </div>
    </nav>
  );
}

export default Navbar;