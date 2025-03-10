import React from "react";
import { useNavigate } from "react-router-dom";
import "./QuizQuestions.css"; // Importing the styles

function QuizQuestions() {
  const navigate = useNavigate();

  const handleAnswerClick = () => {
    navigate("/quiz-completed"); // Redirect to the Quiz Completed page
  };

  return (
    <div className="quiz-container">
      {/* Navbar */}
      <nav className="navbar">
        <h2>TIGERTRAITS</h2>
        <div className="nav-links">
          <a href="#">YOUR PROFILE</a>
          <a href="#">LOG OUT</a>
        </div>
      </nav>

      {/* Question Section */}
      <h2>Question #</h2>
      <div className="quiz-gif-placeholder">
        {/* GIF Placeholder */}
        <img src="/path-to-your-gif.gif" alt="Question" />
      </div>
      <h3>QUESTION GOES HERE...?</h3>

      {/* Answer Buttons */}
      <div className="answer-buttons">
        <button className="answer-button" onClick={handleAnswerClick}>Answer A</button>
        <button className="answer-button" onClick={handleAnswerClick}>Answer B</button>
      </div>
    </div>
  );
}

export default QuizQuestions;