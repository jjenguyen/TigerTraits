import React from "react";
import { useNavigate } from "react-router-dom";
import "./QuizCompleted.css"; // Importing the styles

function QuizCompleted() {
  const navigate = useNavigate();

  const handleQuizCompletion = () => {
    navigate("/quiz-results");
  };

  return (
    <div className="quiz-completed-container">
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
          src="/QuizCompleted.png"
          alt="Completion"
          className="completion-image"
        />
        <button className="centered-button" onClick={handleQuizCompletion}>
          SHOW ME!
        </button>
      </div>
    </div>
  );
}

export default QuizCompleted;