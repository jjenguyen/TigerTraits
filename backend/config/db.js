const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        //const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/tigerTraitsDB";
        const mongoURI = process.env.MONGO_URI || "mongodb://mongo:27017/tigerTraitsDB";  // Default to local MongoDB if no MONGO_URI is set
        await mongoose.connect(mongoURI);
        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1);
    }
};

module.exports = connectDB;