import mongoose from 'mongoose';

const incidentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['Maintenance', 'Safety/Security', 'Sanitation', 'Noise', 'Other'] 
  },
  description: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String }, // Optional photo upload of the issue
  reportedBy: {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    email: { type: String }
  },
  status: { 
    type: String, 
    enum: ['Pending', 'In Progress', 'Resolved', 'Rejected'], 
    default: 'Pending' 
  },
  adminRemarks: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('IncidentReport', incidentSchema);