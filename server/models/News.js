import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tag: { type: String, default: '' },
  location: { type: String, default: '' },
  date: { type: Date, required: true },
  image: { type: String, default: '' },
  section: {
    type: String,
    enum: ['latest', 'accomplishments', 'sk', 'assistance'],
    default: 'latest',
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('News', newsSchema);