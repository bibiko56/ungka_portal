import 'dotenv/config';   // ← add this as the very first import
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import incidentRoutes from './routes/incidentRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import dns from 'node:dns';

const app = express();
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-app.vercel.app'],
}));
app.use(express.json());

app.use('/uploads', express.static('uploads'));

dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/incidents', incidentRoutes);
app.use('/api/news', newsRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)   // ← was the hardcoded string
  .then(() => {
    console.log(`Server running on port ${PORT}`);
    app.listen(PORT);
  })
  .catch((err) => console.error('MongoDB connection error:', err));