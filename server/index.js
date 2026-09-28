import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import incidentRoutes from './routes/incidentRoutes.js'; 
import officialRoutes from './routes/officialRoutes.js';
import dns from 'node:dns';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads'));

dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/incidents', incidentRoutes); 
app.use('/api/officials', officialRoutes);

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
mongoose.connect('mongodb+srv://emnmsqda0502_db_user:chL2WzEsqzDPNPW8@cluster0.tzosxj1.mongodb.net/?appName=Cluster0')
  .then(() => {
    console.log(`Server running on port ${PORT}`);
    app.listen(PORT);
  })
  .catch((err) => console.error('MongoDB connection error:', err));