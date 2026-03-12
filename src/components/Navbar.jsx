import './Navbar.css';
import logo from '../assets/logo.svg';
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { Helmet } from "react-helmet-async";

function Navbar({ currentView, setCurrentView }) {
  const user = useContext(UserContext);
  const [activeSection, setActiveSection] = useState("encryptor");

  const isLoggedIn = user?.uid || user?.isLoggedIn;
  const displayName = isLoggedIn && user.displayName ? user.displayName : "User";
  const photoURL = isLoggedIn && user.photoURL
    ? user.photoURL
    : "https://ui-avatars.com/api/?name=U&background=0A192F&color=A5B4FC&size=48";

  useEffect(() => {
    if (currentView !== "home") return;
    
    const sections = document.querySelectorAll('.smooth-section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.5 }); // Trigger when 50% of the section is visible

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [currentView]);

  const handleNavClick = (sectionId) => {
    if (currentView !== "home") {
      setCurrentView("home");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setActiveSection(sectionId);
  };

  let pageTitle = "Cipher Suite";
  if (currentView === "profile") {
    pageTitle = "Cipher Suite | Profile";
  } else if (currentView === "home") {
    if (activeSection === "encryptor") pageTitle = "Cipher Suite | Encryptor";
    if (activeSection === "how-it-works") pageTitle = "Cipher Suite | How It Works";
    if (activeSection === "history") pageTitle = "Cipher Suite | History";
  }

  return (
    <nav className="main-navbar editorial-nav" aria-label="Main Navigation">
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <div 
        className="logo interactive" 
        onClick={() => setCurrentView("home")}
        role="button"
        tabIndex="0"
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setCurrentView("home"); }}
        aria-label="Navigate to Home"
      >
        <img src={logo} alt="Cipher Suite Logo" className="logo-img" />
        <h1 className='logo-text'>
          Cipher Suite
        </h1>
      </div>

      <div className="nav-btns">
        <button 
          className={`nav-link ${activeSection === 'encryptor' ? 'active' : ''}`} 
          onClick={() => handleNavClick('encryptor')}
        >Encryptor</button>
        <button 
          className={`nav-link ${activeSection === 'how-it-works' ? 'active' : ''}`} 
          onClick={() => handleNavClick('how-it-works')}
        >How It Works</button>
        <button 
          className={`nav-link ${activeSection === 'history' ? 'active' : ''}`} 
          onClick={() => handleNavClick('history')}
        >History</button>
      </div>

      <div 
        className="profile-link interactive" 
        onClick={() => setCurrentView("profile")}
        role="button"
        tabIndex="0"
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setCurrentView("profile"); }}
        aria-label="View Profile"
      >
        <span className='profile-text'>
          {displayName}
        </span>
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