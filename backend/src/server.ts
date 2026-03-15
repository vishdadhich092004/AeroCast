import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { connectDB } from './config/db';
import healthRoutes from './routes/health';
import generationRoutes from './routes/generationRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Ensure MongoDB connection (for serverless cold starts)
app.use(async (_req, _res, next) => {
  if (mongoose.connection.readyState !== 1) {
    try {
      await connectDB();
    } catch (err) {
      console.error('Failed to connect to MongoDB:', err);
      return next(err);
    }
  }
  next();
});

// Routes
app.use(healthRoutes);
app.use('/api', generationRoutes);

// Start server only when running locally
if (process.env.NODE_ENV !== 'production') {
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`AeroCast API running on http://localhost:${PORT}`);
        console.log('Database connection verified');
      });
    })
    .catch((err) => {
      console.error('Failed to connect to MongoDB:', err);
      process.exit(1);
    });
}

export default app;
