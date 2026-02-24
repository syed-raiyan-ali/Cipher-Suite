import './Navbar.css';
import logo from '../assets/logo.svg';
import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";

function Navbar({ setActiveSlide}) {
  const user = useContext(UserContext);

  useEffect(() => {
      console.log("User prop in nabar:", user);
  }, [user]);

  const navigate = useNavigate();
  const isLoggedIn = user?.uid || user?.isLoggedIn;
  const displayName = isLoggedIn && user.displayName ? user.displayName : "User";
  const photoURL = isLoggedIn && user.photoURL
    ? user.photoURL
    : "https://ui-avatars.com/api/?name=U&background=222831&color=00adb5&size=48";

  return (
    <nav className="main-navbar">
      <div className="logo" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
        <img src={logo} alt="Cipher Suite Logo" style={{ height: "100%" }} />
        <h1 className='logo-text'>
          Cipher Suite
        </h1>
      </div>

      <div className="nav-btns">
        <button onClick={() => setActiveSlide(0)}>How It Works</button>
        <button className='btn2' onClick={() => setActiveSlide(1)}>Encryptor</button>
        <button onClick={() => setActiveSlide(2)}>History</button>
      </div>

      <div className="profile-link" onClick={() => navigate("/profile")}>
        <img
          src={photoURL}
          alt={displayName}
          style={{
            width: "24px", height: "24px", borderRadius: "50%",
            objectFit: "cover", background: "#222831",
          }}
        />
        <span className='profile-text'>
          {displayName}
        </span>
      </div>
    </nav>
  );
}

export default Navbar;