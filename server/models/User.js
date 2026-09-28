// server/models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  gender: { type: String, required: true },
  identity: { type: String, required: true },
  password: { type: String, required: true },
  zone: { type: String, required: true },
  role: { type: String, 
    enum: ['user', 'admin'],
    default: 'user' },
    isApproved: { type: Boolean, default: false },
    resetCode: { type: String, select: false },
resetCodeExpires: { type: Date, select: false },
resetAttempts: { type: Number, default: 0, select: false },
    }, 
        { timestamps: true });

export default mongoose.model('User', userSchema);