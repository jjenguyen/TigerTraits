import { Link } from "react-router-dom";
import "./QuizStart.css"; // Use the same styles

function QuizStart() {
  return (
    <div className="quiz-container">
      {/* Navbar */}
      <nav className="navbar">
        <h2 className="nav-title">TIGERTRAITS</h2>
        <div className="nav-links">
          <Link to="/">YOUR PROFILE</Link>
          <Link to="/">LOG OUT</Link>
        </div>
      </nav>

      {/* Image Placeholder */}
      <img src="/QuizStart.png" alt="Quiz Start" className="quiz-image" />

      {/* Quiz Start Text */}
      <h1 className="quiz-title">READY TO FIND OUT YOUR TIGER TRAITS?</h1>

      {/* Start Button */}
      <Link to="/quiz">
        <button className="button">LET'S GO!</button>
        </Link>
    </div>
  );
}

export default QuizStart;