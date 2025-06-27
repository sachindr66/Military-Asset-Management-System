import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("✅ MongoDB connected successfully");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err.message);
        process.exit(1); 
    }
};

connectDB();

app.get('/', (req, res) => {
    res.send('✅ index is running and MongoDB is connected!');
});

app.listen(PORT, () => {
    console.log(`🚀 index running on http://localhost:${PORT}`);
});
