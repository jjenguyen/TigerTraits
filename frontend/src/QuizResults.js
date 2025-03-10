import React from "react";
import { Link } from "react-router-dom";
import "./QuizResults.css"; // Separate CSS file

function QuizResults() {
  return (
    <div className="results-container">
      {/* Static Image */}
      <img src="/QuizResults.png" alt="Quiz Results" className="results-image" />

      {/* Button Section */}
      <div className="results-buttons">
        <Link to="/">
          <button className="button">RETURN</button>
        </Link>
        <Link to="/profile">
          <button className="button">UR PROFILE</button>
        </Link>
        <button className="button">FEEDBACK</button> {/* No link yet */}
      </div>
    </div>
  );
}

export default QuizResults;