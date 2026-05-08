import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { generateToken } from '../utils/tokenUtils';
import { AuthRequest } from '../middleware/authMiddleware';

export const signupUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({
      $or: [
        { username },
        ...(email ? [{ email }] : [])
      ]
    });
    if (userExists) {
      if (userExists.username === username) {
        res.status(400).json({ message: 'Username already taken' });
      } else {
        res.status(400).json({ message: 'Email already registered' });
      }
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      passwordHash,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id as any),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      res.json({
        _id: user.id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id as any),
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    
    res.json({
      _id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      avatar: req.user.avatar,
      createdAt: req.user.createdAt,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
