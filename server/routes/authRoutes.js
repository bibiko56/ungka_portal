import express from 'express';
import {
  register, login, adminRegister, adminLogin,
  getPendingAccounts, approveAccount, declineAccount,forgotPassword, resetPassword,verifyResetCode,
} from '../controllers/authController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

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

export default router;