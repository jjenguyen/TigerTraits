const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const quizRoutes = require("./routes/quizRoutes");
const { processUserName } = require("./utils/tigerTraits");
const QuizResult = require("./models/QuizResult");
const connectDB = require("./config/db");

const app = express();

// Use process.env.PORT to make it compatible with Elastic Beanstalk
const port = process.env.PORT || 3001; // Defaults to 3001 for local development

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Add Health Check Route for AWS Load Balancer
app.get("/", (req, res) => {
  res.status(200).send("Backend is healthy!");
});

// ✅ Attach API routes after middleware
app.use("/api", quizRoutes);

// ✅ Connect to MongoDB and start the server
connectDB().then(() => {
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}!`);
  });
});

process.on("SIGTERM", async () => {
  try {
    console.log("🛑 Received SIGTERM: Closing MongoDB connection...");
    await mongoose.connection.close();  // ✅ FIXED: Use `await` (async)
    console.log("✅ MongoDB connection closed. Exiting...");
    process.exit(0);
  } catch (err) {
    console.error("🔥 Error closing MongoDB connection:", err);
    process.exit(1);
  }
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
      return next(err);  // ✅ Ensures Express does not send a second response
  }
  console.error("🔥 Uncaught Error:", err);
  return res.status(500).json({ error: "Internal Server Error" });
});