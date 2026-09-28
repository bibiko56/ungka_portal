import mongoose from 'mongoose';

const officialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },     // e.g. "Captain", "Kagawad", "SK Chairman"
  category: { type: String, enum: ['barangay', 'sk', 'health'], required: true },
  gender: { type: String, default: '' },
  bio: { type: String, default: '' },
  image: { type: String, default: '' },
  isHead: { type: Boolean, default: false },       // shows large, at the top of its category
  order: { type: Number, default: 0 },              // manual sort order within a category
}, { timestamps: true });

export default mongoose.model('Official', officialSchema);