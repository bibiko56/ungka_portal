import User from '../models/User.js'; // Adjust the model path to match your folder structure
import Admin from '../models/Admin.js';
import { sendSms } from '../utils/sendSms.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register User
export const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, gender, identity, password, zone, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullName, email, phoneNumber, gender, identity,
      password: hashedPassword,
      zone,
      role: role || 'user',
      isApproved: false,
    });

    res.status(201).json({
      message: 'Registration submitted. You will be notified by SMS once your account is approved.',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        isApproved: user.isApproved,
      },
    });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ message: error.message || 'Server error during registration' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (user.isApproved === false) {
      return res.status(403).json({
        message: 'Your account is pending approval. You will receive an SMS once approved.',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: error.message || 'Server error during login' });
  }
};
    export const adminRegister = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password } = req.body;

    // Check if admin already exists in Admin collection
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: 'Admin account already exists with this email' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = await Admin.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role: 'admin',
      isApproved: false,
    });

    res.status(201).json({
      message: 'Admin account submitted for review',
      user: {
        id: admin._id,
        fullName: admin.fullName,
        email: admin.email,
        role: admin.role,
        isApproved: admin.isApproved,
      },
    });
  } catch (error) {
    console.error('Admin Register Error:', error);
    res.status(500).json({ message: error.message || 'Server error during admin registration' });
  }
};

// Login Admin
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Query Admin collection
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (admin.isApproved === false) {
      return res.status(403).json({
        message: 'Your account is pending review by an existing administrator.',
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Admin login successful',
      token,
      user: {
        id: admin._id,
        fullName: admin.fullName,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error('Admin Login Error:', error);
    res.status(500).json({ message: error.message || 'Server error during admin login' });
  }
};

// GET pending users, for the Approvals page
// GET both pending users and pending admins
export const getPendingAccounts = async (req, res) => {
  try {
    const pendingUsers = await User.find({ isApproved: false }).select('-password');
    const pendingAdmins = await Admin.find({ isApproved: false }).select('-password');

    const combined = [
      ...pendingUsers.map((u) => ({ ...u.toObject(), accountType: 'user' })),
      ...pendingAdmins.map((a) => ({ ...a.toObject(), accountType: 'admin' })),
    ];

    res.status(200).json(combined);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching pending accounts' });
  }
};

// Approve either a user or an admin
export const approveAccount = async (req, res) => {
  try {
    const { type, id } = req.params;
    const Model = type === 'admin' ? Admin : User;

    const account = await Model.findById(id);
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    account.isApproved = true;
    await account.save();

    await sendSms(
      account.phoneNumber,
      `Hi ${account.fullName}, your Ungka Portal ${type} account has been approved. You can now log in.`
    );

    res.status(200).json({ message: `${type} approved and notified by SMS`, account });
  } catch (error) {
    console.error('Approve Account Error:', error);
    res.status(500).json({ message: 'Server error approving account' });
  }
};

// Decline either a user or an admin
export const declineAccount = async (req, res) => {
  try {
    const { type, id } = req.params;
    const Model = type === 'admin' ? Admin : User;

    const account = await Model.findById(id);
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    await sendSms(
      account.phoneNumber,
      `Hi ${account.fullName}, your Ungka Portal ${type} registration was not approved. Please visit the barangay office for details.`
    );

    await account.deleteOne();

    res.status(200).json({ message: `${type} declined and notified by SMS` });
  } catch (error) {
    console.error('Decline Account Error:', error);
    res.status(500).json({ message: 'Server error declining account' });
  }
};