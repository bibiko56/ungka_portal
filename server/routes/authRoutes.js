import express from 'express';
import multer from 'multer';
import dbStorage from '../middleware/dbStorage.js';
import {
  register, login, adminRegister, adminLogin,
  getPendingAccounts, approveAccount, declineAccount,forgotPassword, resetPassword,verifyResetCode,
  getApprovedAccounts, revokeAccount, getDashboardStats,
  getProfile, updateProfile, changePassword,
} from '../controllers/authController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Profile photo uploads
const upload = multer({
  storage: dbStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) =>
    file.mimetype.startsWith('image/') ? cb(null, true) : cb(new Error('Only image files are allowed')),
});

// Turns multer errors (too big, wrong type) into a JSON response the client can show
const uploadPhoto = (req, res, next) =>
  upload.single('image')(req, res, (err) =>
    err ? res.status(400).json({ message: err.message }) : next()
  );

router.post('/register', register);
router.post('/login', login);
router.post('/admin/register', adminRegister);
router.post('/admin/login', adminLogin);

router.get('/pending', protect, adminOnly, getPendingAccounts);
router.put('/approve/:type/:id', protect, adminOnly, approveAccount);
router.put('/decline/:type/:id', protect, adminOnly, declineAccount);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/verify-reset-code', verifyResetCode);

router.get('/profile', protect, getProfile);
router.put('/profile', protect, uploadPhoto, updateProfile);
router.put('/change-password', protect, changePassword);

router.get('/stats', protect, adminOnly, getDashboardStats);
router.get('/approved', protect, adminOnly, getApprovedAccounts);
router.put('/revoke/:type/:id', protect, adminOnly, revokeAccount);

export default router;