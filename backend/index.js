import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors'

dotenv.config();

import assetRoutes from './routes/assetRoute.js'
import purchaseRoutes from './routes/purchaseRoutes.js'
import transferRoutes from './routes/transferRoutes.js'
import assignmentRoutes from './routes/assignmentRoutes.js'
import authRouts from './routes/authRouts.js'
import dashboardRoutes from './routes/dashboardRoutes.js'
import personnelRoutes from './routes/personnelRoutes.js'
import baseRoutes from './routes/baseRoutes.js'
import { logRequest, logError } from './utils/logger.js';


const app = express();

app.use(logRequest)

app.use(express.json())
app.use(cors({
    // origin:'http://localhost:5173'
    origin:'https://military-asset-management-system-opal.vercel.app'
}))

// Routes/

app.use('/api/assets', assetRoutes)
app.use('/api/purchases', purchaseRoutes)
// app.use('/api/transfers', transferRoutes)
app.use('/api/transfers', (req, res, next) => {
  console.log('🔥 Transfer route hit');
  next();
}, transferRoutes);
app.use('/api/assignments', assignmentRoutes)
app.use('/api/auth', authRouts)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/personnel', personnelRoutes)
app.use('/api/bases', baseRoutes)

app.use(logError)

const PORT = process.env.CUSTOM_PORT || 5000;

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
