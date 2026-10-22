import mongoose from 'mongoose';

// Uploaded photos live in MongoDB so they survive server restarts/redeploys
// (the server's own disk is wiped on most hosts).
const imageSchema = new mongoose.Schema(
  {
    data: { type: Buffer, required: true },
    contentType: { type: String, required: true },
    originalName: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Image', imageSchema);