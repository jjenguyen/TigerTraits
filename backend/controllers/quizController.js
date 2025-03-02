const QuizResult = require("../models/QuizResult");

const submitQuiz = async (req, res) => {
    console.log("📌 Incoming Data:", req.body); // ✅ Log request data

    const { name, answers } = req.body;

    if (!name || !Array.isArray(answers) || answers.length !== 4) {
        console.log("❌ Invalid request format:", req.body);
        return res.status(400).json({ error: "Incorrect data format. 'answers' must be an array of 4 items." }); // ✅ Added `return`
    }

    console.log("📌 Answers received:", answers); // ✅ Debugging log

    try {
        const resultString = answers.join(""); // ✅ Convert ["I", "N", "T", "J"] → "INTJ"
        console.log("📌 Processed Result:", resultString); // ✅ Log processed MBTI type

        const quizEntry = new QuizResult({
            name,
            answers,
            result: resultString // ✅ Store as a string
        });

        await quizEntry.save();
        console.log("✅ Quiz saved successfully:", quizEntry); // ✅ Log success

        return res.json({ message: `Quiz saved for ${name}!`, result: resultString }); // ✅ Added `return`

    } catch (error) {
        console.error("🔥 Database Error:", error); // 🔴 Log full error details
        return res.status(500).json({ error: "Internal Server Error", details: error.message }); // ✅ Added `return`
    }
};

const getQuizResult = async (req, res) => {
    try {
        const userResult = await QuizResult.findOne({ name: req.params.name }).sort({ timestamp: -1 });
        if (!userResult) return res.status(404).json({ error: "No quiz results found." }); // ✅ Added `return`
        return res.json({ name: userResult.name, result: userResult.result }); // ✅ Added `return`
    } catch (error) {
        console.error("Database Error:", error);
        return res.status(500).json({ error: "Internal Server Error" }); // ✅ Added `return`
    }
};

const getAllQuizResults = async (req, res) => {
    try {
        const results = await QuizResult.find().sort({ timestamp: -1 });
        return res.json(results); // ✅ Added `return`
    } catch (error) {
        console.error("Database Error:", error);
        return res.status(500).json({ error: "Internal Server Error" }); // ✅ Added `return`
    }
};

module.exports = { submitQuiz, getQuizResult, getAllQuizResults };