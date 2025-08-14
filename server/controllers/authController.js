import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiredIn: '10d' }
  );
};

export const register = async (req, res) => {
  try {const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });
    const token = generateToken(newUser);
    await newUser.save();

    res.status(201).json({ newUser: { name: newUser.name, email: newUser.email, role: newUser.role }, message: 'User registered successfully', token });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', err });
  }
};

export const getEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const registeredEmail = await User.findOne({ email });
    if (registeredEmail) {
      return res.status(200).json({ message: 'Email is registered' });
    } else {
      return res.status(400).json({ message: 'Email is not registered' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user);
    res.status(200).json({ user: { name: user.name, email: user.email, role: user.role }, token });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', err });
  }
};

export const getUserDetails = async (req, res) => {
  const { email } = req.user;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ user: { name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', err });
  }
};