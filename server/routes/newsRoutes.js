import express from 'express';
import multer from 'multer';
import path from 'path';
import News from '../models/News.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// GET all news, most recent first — public, used by the News page
router.get('/', async (req, res) => {
  try {
    const news = await News.find().sort({ date: -1 });
    res.status(200).json(news);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch news' });
  }
});

// GET one article by id — public, used by the article detail page
router.get('/:id', async (req, res) => {
  try {
    const article = await News.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.status(200).json(article);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch article' });
  }
});

// POST create — admin only
router.post('/', protect, adminOnly, upload.single('image'), async (req, res) => {
  try {
    const { title, description, tag, location, date, section } = req.body;

    const newArticle = new News({
      title, description, tag, location, section,
      date: date ? new Date(date) : new Date(),
      image: req.file ? `/uploads/${req.file.filename}` : '',
    });

    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create news article', error: err.message });
  }
});

// PUT update — admin only
router.put('/:id', protect, adminOnly, upload.single('image'), async (req, res) => {
  try {
    const { title, description, tag, location, date, section, existingImage } = req.body;

    const updateData = {
      title, description, tag, location, section,
      date: date ? new Date(date) : new Date(),
    };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    } else if (existingImage) {
      updateData.image = existingImage;
    }

    const updated = await News.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) return res.status(404).json({ message: 'News article not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update news article', error: err.message });
  }
});

// DELETE — admin only
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const deleted = await News.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'News article not found' });
    res.status(200).json({ message: 'News article deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete news article' });
  }
});

export default router;