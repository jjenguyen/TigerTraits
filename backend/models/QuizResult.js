const mongoose = require("mongoose");

const QuizResultSchema = new mongoose.Schema({
    name: { type: String, required: true },
    answers: { type: [String], required: true }, // ✅ This can be an array
    result: { type: String, required: true }, // ❌ MongoDB expects a string, but we're passing an array
    timestamp: { type: Date, default: Date.now }
});

// ✅ Fix: Prevent duplicate model registration
module.exports = mongoose.models.QuizResult || mongoose.model("QuizResult", QuizResultSchema);