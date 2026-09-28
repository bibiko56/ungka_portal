import Event from '../models/Event.js';

// Get all events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch events.' });
  }
};

// Create a new event with uploaded image URLs
export const createEvent = async (req, res) => {
  try {
    const { title, tagline, description, date, time, location } = req.body;
    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      imageUrls = req.files.map(
        (file) => `http://localhost:5000/public/uploads/${file.filename}`
      );
    }

    const newEvent = new Event({
      title,
      tagline,
      description,
      date,
      time,
      location,
      images: imageUrls,
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error creating event.' });
  }
};

// Delete an event by ID
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    res.status(200).json({ message: 'Event deleted successfully', id });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error deleting event.' });
  }
};