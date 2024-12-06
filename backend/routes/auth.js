import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, phoneNumber } = req.body;

  if (!email.endsWith('@clark.edu.in')) {
    return res.status(400).send('Email must end with @clark.edu.in');
  }

  if (password !== confirmPassword) {
    return res.status(400).send('Passwords do not match');
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).send('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ firstName, lastName, email, password: hashedPassword, phoneNumber });
  await user.save();
  res.status(201).send('User Registered');
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, userId: user._id });
  } else {
    res.status(401).send('Invalid Credentials');
  }
});


export default router;