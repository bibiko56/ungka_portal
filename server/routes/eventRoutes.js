import express from 'express';
import multer from 'multer';
import path from 'path';
import Event from '../models/Event.js';
import EventRegistration from '../models/EventRegistration.js';

const router = express.Router();

// 1. Set up storage engine for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// GET all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch events' });
  }
});

// POST a new event
router.post('/', upload.array('images', 5), async (req, res) => {
  try {
    const imagePaths = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    const newEvent = new Event({
  title: req.body.title,
  tagline: req.body.tagline,
  description: req.body.description,
  date: req.body.date,
  time: req.body.time,
  location: req.body.location,
  category: req.body.category,
  images: imagePaths,
});

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create event', error: err.message });
  }
});

// 🟢 PUT (Update) an existing event
router.put('/:id', upload.array('images', 5), async (req, res) => {
  try {
    let existingImgs = req.body.existingImages || [];
    if (!Array.isArray(existingImgs)) {
      existingImgs = [existingImgs];
    }

    const newImagePaths = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];
    const finalImages = [...existingImgs, ...newImagePaths];

    const updateData = {
    title: req.body.title,
    tagline: req.body.tagline,
    description: req.body.description,
    date: req.body.date,
    time: req.body.time,
    location: req.body.location,
    category: req.body.category,
    images: finalImages,
    };

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, updateData, { new: true });
    
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update event', error: err.message });
  }
});

// 🟢 DELETE (Remove) an event
router.delete('/:id', async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete event', error: err.message });
  }
});

// 🟢 1. POST route for a user to join/volunteer for an event (with debugging)
router.post('/:id/join', async (req, res) => {
  try {
    const eventId = req.params.id;
    const { userId, name, email } = req.body; 

    console.log("--- Incoming Join Request ---");
    console.log("Event ID:", eventId);
    console.log("User Data:", { userId, name, email });

    if (!userId) {
      return res.status(400).json({ error: 'User ID is missing from request. Make sure you are logged in.' });
    }

    const registration = new EventRegistration({
      eventId,
      userId,
      name,
      email
    });

    await registration.save();
    res.status(201).json({ message: 'Successfully joined event!' });
  } catch (err) {
    console.error("Error saving registration:", err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'You have already joined this event.' });
    }
    res.status(500).json({ error: 'Server error while joining event.', details: err.message });
  }
});

// 🟢 2. GET route for the Admin Dashboard to fetch volunteers for a specific event
router.get('/:id/volunteers', async (req, res) => {
  try {
    const eventId = req.params.id;
    const registrations = await EventRegistration.find({ eventId }).sort({ joinedAt: -1 });
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch volunteers.' });
  }
});

export default router;