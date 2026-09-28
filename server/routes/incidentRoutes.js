import express from 'express';
import IncidentReport from '../models/IncidentReport.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Configure multer for incident images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// POST: Create a new incident report (Resident side)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, category, description, location, userId, name, email } = req.body;
    
    const newReport = new IncidentReport({
      title,
      category,
      description,
      location,
      image: req.file ? `/uploads/${req.file.filename}` : undefined,
      reportedBy: { 
        userId: userId && userId.trim() !== '' ? userId : null, // 👈 Prevents empty string crash
        name: name || 'Anonymous', 
        email: email || '' 
      }
    });

    await newReport.save();
    res.status(201).json({ message: 'Incident reported successfully', report: newReport });
  } catch (err) {
    console.error('Error saving incident:', err);
    res.status(500).json({ error: 'Failed to submit report' });
  }
});

// GET: Fetch all incident reports (Admin side)
router.get('/', async (req, res) => {
  try {
    const reports = await IncidentReport.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch incident reports' });
  }
});

// PUT: Update report status (Admin side)
router.put('/:id/status', async (req, res) => {
  try {
    const { status, adminRemarks } = req.body;
    const updatedReport = await IncidentReport.findByIdAndUpdate(
      req.params.id,
      { status, adminRemarks },
      { new: true }
    );
    res.json(updatedReport);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update incident status' });
  }
});

export default router;