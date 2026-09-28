import mongoose from 'mongoose';

const eventRegistrationSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  joinedAt: { type: Date, default: Date.now }
});

// Prevent a user from joining the same event multiple times
eventRegistrationSchema.index({ eventId: 1, userId: 1 }, { unique: true });

const EventRegistration = mongoose.model('EventRegistration', eventRegistrationSchema);

export default EventRegistration;