import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css"; // Import the CSS file
import QuizStart from "./QuizStart";
import QuizQuestions from "./QuizQuestions";
import QuizCompleted from "./QuizCompleted";
import QuizResults from "./QuizResults";
import Profile from "./Profile";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          {/* Home/Login Page */}
          <Route path="/" element={<Home />} />
          {/* Quiz Start Page */}
          <Route path="/quiz-start" element={<QuizStart />} />
          <Route path="/quiz" element={<QuizQuestions />} />
          <Route path="/quiz-completed" element={<QuizCompleted />} />
          <Route path="/quiz-results" element={<QuizResults />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

// Home/Login Component
function Home() {
  return (
    <div className="home-container">
      <img src="/TigerTraits_Title.png" alt="TigerTraits_Title" className="title-image" />
      <div className="auth-container">
        <Link to="/quiz-start">
          <button className="button">LOG IN</button>
        </Link>
        <p>No account? <Link to="/quiz-start" className="register">REGISTER HERE</Link></p>
      </div>
    </div>
  );
}

export default App;