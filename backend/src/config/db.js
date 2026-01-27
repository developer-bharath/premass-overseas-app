const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Support both MONGO_URI and MONGODB_URI (Railway uses MONGODB_URI)
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    
    if (!mongoUri) {
      throw new Error("MongoDB URI not found. Please set MONGODB_URI or MONGO_URI environment variable.");
    }

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    console.log("✅ MongoDB Connected successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    console.error("Full error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
