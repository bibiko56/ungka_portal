import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tagline: { type: String },
  description: { type: String, required: true },
  date: { type: String, required: true }, 
  time: { type: String },                 
  location: { type: String },
  images: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Event', EventSchema);