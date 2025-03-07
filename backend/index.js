// backend/index.js - express server
const express = require ("express");
const mongoose = require ("mongoose");
const cors = require ("cors");
require ("dotenv").config();
const app = express();

// Middleware
app.use (cors ({ origin: "*" }));
app.use (express.json ());

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then (() => console.log("MongoDB Connected" ))
    .catch((err) => console.log(err));

// start the server
// Express app is listening at port 5000
const PORT = process.env.PORT | 5000;
app. listen (PORT, "0.0.0.0", () => console. log (`Server running on port ${PORT}`));

// Import the User Model Correctly
const User = require("./models/User");

// POST Route - Save User Quiz Data
app.post("/api/quiz-results", async (req, res) => {
    try {
      const { name, answers } = req.body;
      const newUser = new User({ name, answers });
      await newUser.save();
      res.json({ message: "Quiz results saved!", user: newUser });
    } catch (error) {
      res.status(500).json({ error: "Failed to save quiz results" });
    }
  });

  // Get Route - test api
  app.get("/api", (req, res) => {
    res.json({ message: "API is working!" });
  });
  
  // GET Route - Fetch All Quiz Results
  app.get("/api/quiz-results", async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quiz results" });
    }
  });