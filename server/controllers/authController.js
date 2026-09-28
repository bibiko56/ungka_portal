import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Admin from '../models/Admin.js';
import { sendSms } from '../utils/sendSms.js';
import { sendEmail } from '../utils/sendEmail.js';
import { validatePassword } from '../utils/validatePassword.js';

// Picks the right collection based on 'user' or 'admin'
const getModel = (type) => (type === 'admin' ? Admin : User);

/* ------------------------------------------------------------------ */
/*  REGISTER / LOGIN                                                   */
/* ------------------------------------------------------------------ */

// Register User
export const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, gender, identity, password, zone, role } = req.body;

    const passwordError = validatePassword(password);
    if (passwordError) {
      return res.status(400).json({ message: passwordError });
    }

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

// Login User
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

// Register Admin
export const adminRegister = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password } = req.body;

    const passwordError = validatePassword(password);
    if (passwordError) {
      return res.status(400).json({ message: passwordError });
    }

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

/* ------------------------------------------------------------------ */
/*  APPROVALS (admin only)                                             */
/* ------------------------------------------------------------------ */

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

    const account = await getModel(type).findById(id);
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

    const account = await getModel(type).findById(id);
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

/* ------------------------------------------------------------------ */
/*  FORGOT PASSWORD                                                    */
/* ------------------------------------------------------------------ */

const findWithResetFields = (accountType, email) =>
  getModel(accountType)
    .findOne({ email })
    .select('+resetCode +resetCodeExpires +resetAttempts');

// Returns true only if the code is valid.
// Wrong guesses are counted, and the code locks after 5.
const checkResetCode = async (account, code) => {
  if (!account || !account.resetCode || account.resetCodeExpires < new Date()) {
    return false;
  }

  const match = await bcrypt.compare(String(code), account.resetCode);
  if (!match) {
    account.resetAttempts += 1;
    if (account.resetAttempts >= 5) {
      account.resetCode = undefined;
      account.resetCodeExpires = undefined;
    }
    await account.save();
    return false;
  }
  return true;
};

// Step 1: generate + "send" a code
export const forgotPassword = async (req, res) => {
  try {
    const { email, method, accountType } = req.body;

    if (!['sms', 'email'].includes(method)) {
      return res.status(400).json({ message: 'Please choose SMS or email' });
    }

    const account = await getModel(accountType).findOne({ email });

    // Same response whether or not the account exists, so this
    // can't be used to check who has an account
    const response = { message: `If an account exists, a code was sent by ${method}.` };
    if (!account) return res.status(200).json(response);

    const code = String(crypto.randomInt(100000, 1000000)); // 6 digits
    account.resetCode = await bcrypt.hash(code, 10);
    account.resetCodeExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    account.resetAttempts = 0;
    await account.save();

    if (method === 'sms') {
      await sendSms(account.phoneNumber, `Your Ungka Portal reset code is ${code}. It expires in 10 minutes.`);
    } else {
      await sendEmail(account.email, 'Ungka Portal password reset', `Your reset code is ${code}. It expires in 10 minutes.`);
    }

    // TESTING ONLY: shows the code on screen. Remove before launch.
    if (process.env.NODE_ENV !== 'production') {
      response.devCode = code;
    }

    res.status(200).json(response);
  } catch (error) {
    console.error('Forgot Password Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Step 2: verify the code only
export const verifyResetCode = async (req, res) => {
  try {
    const { email, accountType, code } = req.body;

    const account = await findWithResetFields(accountType, email);
    const valid = await checkResetCode(account, code);

    if (!valid) {
      return res.status(400).json({ message: 'Invalid or expired code' });
    }
    res.status(200).json({ message: 'Code verified' });
  } catch (error) {
    console.error('Verify Reset Code Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Step 3: set the new password (re-checks the code)
export const resetPassword = async (req, res) => {
  try {
    const { email, accountType, code, newPassword } = req.body;

    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      return res.status(400).json({ message: passwordError });
    }

    const account = await findWithResetFields(accountType, email);
    const valid = await checkResetCode(account, code);

    if (!valid) {
      return res.status(400).json({ message: 'Invalid or expired code' });
    }

    account.password = await bcrypt.hash(newPassword, 10);
    account.resetCode = undefined;
    account.resetCodeExpires = undefined;
    account.resetAttempts = 0;
    await account.save();

    res.status(200).json({ message: 'Password reset successful. You can now log in.' });
  } catch (error) {
    console.error('Reset Password Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};