import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: '15m' }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({
      success: false,
      message: "Email already exists",
      errors: null
    })

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });
    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);
    await newUser.save();

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });

    const {password: _, ...safeUser} = newUser

    res.status(201).json({
      accessToken,
      user: safeUser
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to register",
      errors: err.message
    })
  }
};

export const getEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const registeredEmail = await User.findOne({ email: email });
    if (registeredEmail) {
      return res.status(200).json({
        success: true,
        message: "Email is registered",
      })
    } else {
      return res.status(400).json({
        success: false,
        message: "Email is registered",
        errors: null
      })
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to get email",
      errors: err.message
    })
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({
      success: false,
      message: "Email does not exist",
      errors: null
    })

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({
      success: false,
      message: "Incorrect password",
      errors: null
    })

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });

    const {password: _, ...safeUser} = user

    res.status(200).json({
      accessToken,
      user: safeUser
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to login",
      errors: err.message
    })
  }
};

export const silentLogin = (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
    if (err) return res.sendStatus(403);

    try {
      const dbUser = await User.findById(decoded.id);
      if (!dbUser) return res.sendStatus(404);

      const { password: _, ...safeUser } = dbUser;

      const newRefreshToken = generateRefreshToken(dbUser);
      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      });

      const accessToken = generateAccessToken(dbUser);

      res.status(200).json({
        accessToken,
        user: safeUser
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Failed to silent login', 
        errors: err.message
      });
    }
  });
};

export const logout = (req, res) => {
  try {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  });
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to logout', 
      errors: err.message
    });
  }
};