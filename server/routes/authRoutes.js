import express from 'express';
import { 
  register, 
  login, 
  adminRegister, 
  adminLogin 
} from '../controllers/authController.js';

const router = express.Router();

// Standard User Routes
router.post('/register', register);
router.post('/login', login);

// Admin User Routes
router.post('/admin/register', adminRegister);
router.post('/admin/login', adminLogin);

export default router;