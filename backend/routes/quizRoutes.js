const express = require("express");
const { submitQuiz, getQuizResult, getAllQuizResults } = require("../controllers/quizController");

const router = express.Router();

// ✅ Health Check Route (Fixes the 404 issue)
router.get("/health", (req, res) => {
    return res.json({ message: "API is working!" });
});

// ✅ API Routes
router.post("/submit-quiz", submitQuiz);
router.get("/quiz-result/:name", getQuizResult);
router.get("/quiz-results", getAllQuizResults);

module.exports = router; // ✅ Export router