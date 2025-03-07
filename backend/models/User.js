const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  answers: [String], // Store quiz answers (I/E, S/N, T/F, J/P)
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
module.exports = User;