import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tag: { type: String, default: '' },        // e.g. "SANGGUNIANG KABATAAN (SK)"
  location: { type: String, default: '' },   // e.g. "BGRY. UNGKA II, PAVIA, ILOILO"
  date: { type: Date, required: true },
  image: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.model('News', newsSchema);