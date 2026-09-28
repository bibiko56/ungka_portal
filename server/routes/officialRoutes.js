import express from 'express';
import multer from 'multer';
import path from 'path';
import Official from '../models/Official.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// GET all officials — public, used by the Officials page
router.get('/', async (req, res) => {
  try {
    const officials = await Official.find().sort({ category: 1, isHead: -1, order: 1 });
    res.status(200).json(officials);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch officials' });
  }
});

// POST create — admin only
router.post('/', protect, adminOnly, upload.single('image'), async (req, res) => {
  try {
    const { name, position, category, bio, gender, isHead, order } = req.body;

    const newOfficial = new Official({
      name, position, category, bio, gender,
      isHead: isHead === 'true',
      order: order ? Number(order) : 0,
      image: req.file ? `/uploads/${req.file.filename}` : '',
    });

    await newOfficial.save();
    res.status(201).json(newOfficial);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create official', error: err.message });
  }
});

// PUT update — admin only
router.put('/:id', protect, adminOnly, upload.single('image'), async (req, res) => {
  try {
    const { name, position, category, bio, gender, isHead, order, existingImage } = req.body;

    const updateData = {
      name, position, category, bio, gender,
      isHead: isHead === 'true',
      order: order ? Number(order) : 0,
    };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    } else if (existingImage) {
      updateData.image = existingImage;
    }

    const updated = await Official.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) return res.status(404).json({ message: 'Official not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update official', error: err.message });
  }
});

// DELETE — admin only
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const deleted = await Official.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Official not found' });
    res.status(200).json({ message: 'Official deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete official' });
  }
});

export default router;