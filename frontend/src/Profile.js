import React from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css"; // Importing the styles

function Profile() {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="profile-container">
      {/* Navbar */}
      <nav className="navbar">
        <h2>TIGERTRAITS</h2>
        <div className="nav-links">
          <a href="#">YOUR PROFILE</a>
          <a href="#">LOG OUT</a>
        </div>
      </nav>

      {/* Image Container */}
      <div className="image-container">
        <img
          src="/Profile.png"
          alt="Profile"
          className="profile-image"
        />
      </div>
    </div>
  );
}

export default Profile;