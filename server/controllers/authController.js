import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Admin from '../models/Admin.js';
import { sendSms } from '../utils/sendSms.js';
import { sendEmail } from '../utils/sendEmail.js';
import { validatePassword } from '../utils/validatePassword.js';
import { toE164PH, toLocalPH, phoneLookupRegex } from '../utils/formatPhone.js';

// Picks the right collection based on 'user' or 'admin'
const getModel = (type) => (type === 'admin' ? Admin : User);

/* ------------------------------------------------------------------ */
/*  REGISTER / LOGIN                                                   */
/* ------------------------------------------------------------------ */

// Register User
export const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, gender, identity, password, zone } = req.body;

    const passwordError = validatePassword(password);
    if (passwordError) {
      return res.status(400).json({ message: passwordError });
    }

    const localPhone = toLocalPH(phoneNumber);
    if (!localPhone) {
      return res.status(400).json({ message: 'Enter a valid mobile number, e.g. 09123456789' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const phoneTaken = await User.findOne({ phoneNumber: phoneLookupRegex(localPhone) });
    if (phoneTaken) {
      return res.status(400).json({ message: 'This phone number is already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullName,
      email,
      phoneNumber: localPhone,
      gender,
      identity,
      password: hashedPassword,
      zone,
      role: 'user', // never taken from the request body
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

    const localPhone = toLocalPH(phoneNumber);
    if (!localPhone) {
      return res.status(400).json({ message: 'Enter a valid mobile number, e.g. 09123456789' });
    }

    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: 'Admin account already exists with this email' });
    }

    const phoneTaken = await Admin.findOne({ phoneNumber: phoneLookupRegex(localPhone) });
    if (phoneTaken) {
      return res.status(400).json({ message: 'This phone number is already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = await Admin.create({
      fullName,
      email,
      phoneNumber: localPhone,
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

// GET both approved users and approved admins
export const getApprovedAccounts = async (req, res) => {
  try {
    const approvedUsers = await User.find({ isApproved: true }).select('-password');
    const approvedAdmins = await Admin.find({ isApproved: true }).select('-password');

    const combined = [
      ...approvedUsers.map((u) => ({ ...u.toObject(), accountType: 'user' })),
      ...approvedAdmins.map((a) => ({ ...a.toObject(), accountType: 'admin' })),
    ];

    res.status(200).json(combined);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching approved accounts' });
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

    // A failed text shouldn't undo the approval
    let smsSent = true;
    try {
      await sendSms(
        account.phoneNumber,
        `Hi ${account.fullName}, your Ungka Portal ${type} account has been approved. You can now log in.`
      );
    } catch (smsError) {
      smsSent = false;
      console.error('Approval SMS failed:', smsError.message);
    }

    res.status(200).json({ message: `${type} approved`, smsSent });
  } catch (error) {
    console.error('Approve Account Error:', error);
    res.status(500).json({ message: 'Server error approving account' });
  }
};

// Decline either a user or an admin
export const declineAccount = async (req, res) => {
  try {
    const { type, id } = req.params;
    const { reason } = req.body || {};

    const account = await getModel(type).findById(id);
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    const reasonLine = reason?.trim() ? ` Reason: ${reason.trim()}.` : '';

    // If the text can't be sent, keep the account so the admin can retry
    try {
      await sendSms(
        account.phoneNumber,
        `Hi ${account.fullName}, your Ungka Portal ${type} registration was not approved.${reasonLine} Please visit the barangay office for details.`
      );
    } catch (smsError) {
      console.error('Decline SMS failed:', smsError.message);
      return res.status(502).json({
        message: "The SMS couldn't be sent, so this account wasn't declined. Check that the SMS phone is online, then try again.",
      });
    }

    await account.deleteOne();

    res.status(200).json({ message: `${type} declined and notified by SMS` });
  } catch (error) {
    console.error('Decline Account Error:', error);
    res.status(500).json({ message: 'Server error declining account' });
  }
};

// Revoke a previously approved account: moves it back to Pending Approvals
export const revokeAccount = async (req, res) => {
  try {
    const { type, id } = req.params;

    const account = await getModel(type).findById(id);
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    account.isApproved = false;
    await account.save();

    res.status(200).json({ message: `${type} approval revoked` });
  } catch (error) {
    console.error('Revoke Account Error:', error);
    res.status(500).json({ message: 'Server error revoking account' });
  }
};

/* ------------------------------------------------------------------ */
/*  FORGOT PASSWORD                                                    */
/* ------------------------------------------------------------------ */

// Finds an account by mobile number (SMS) or email, depending on how the code is sent
const findAccountByContact = async (accountType, method, contact, { withResetFields = false } = {}) => {
  if (typeof contact !== 'string') return null;

  const Model = getModel(accountType);
  let query;

  if (method === 'sms') {
    const regex = phoneLookupRegex(contact);
    if (!regex) return null;
    query = Model.findOne({ phoneNumber: regex });
  } else {
    query = Model.findOne({ email: contact });
  }

  if (withResetFields) {
    query = query.select('+resetCode +resetCodeExpires +resetAttempts');
  }
  return query;
};

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

// Step 1: generate + send a code
export const forgotPassword = async (req, res) => {
  try {
    const { contact, method, accountType } = req.body;

    if (!['sms', 'email'].includes(method)) {
      return res.status(400).json({ message: 'Please choose SMS or email' });
    }

    if (method === 'sms' && !toE164PH(contact)) {
      return res.status(400).json({ message: 'Enter a valid mobile number, e.g. 09123456789' });
    }

    const account = await findAccountByContact(accountType, method, contact);

    // For SMS, tell the person when the number isn't registered
    if (method === 'sms' && !account) {
      return res.status(404).json({ message: 'No account is registered with that phone number.' });
    }

    // Email keeps the generic response so it can't be used to check who has an account
    const response = { message: `If an account exists, a code was sent by ${method}.` };
    if (!account) return res.status(200).json(response);

    const code = String(crypto.randomInt(100000, 1000000)); // 6 digits
    account.resetCode = await bcrypt.hash(code, 10);
    account.resetCodeExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    account.resetAttempts = 0;
    await account.save();

    try {
      if (method === 'sms') {
        await sendSms(account.phoneNumber, `Your Ungka Portal reset code is ${code}. It expires in 10 minutes.`);
      } else {
        await sendEmail(account.email, 'Ungka Portal password reset', `Your reset code is ${code}. It expires in 10 minutes.`);
      }
    } catch (sendError) {
      console.error(`Reset ${method} failed:`, sendError.message);
      return res.status(502).json({
        message: `We couldn't send the ${method === 'sms' ? 'SMS' : 'email'} right now. Please try again later or use the other option.`,
      });
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
    const { accountType, method, contact, code } = req.body;

    const account = await findAccountByContact(accountType, method, contact, { withResetFields: true });
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
    const { accountType, method, contact, code, newPassword } = req.body;

    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      return res.status(400).json({ message: passwordError });
    }

    const account = await findAccountByContact(accountType, method, contact, { withResetFields: true });
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