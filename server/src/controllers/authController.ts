import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { generateToken } from '../utils/tokenUtils';
import { AuthRequest } from '../middleware/authMiddleware';
import { z } from 'zod';

const signupSchema = z.object({
  username: z.string().trim().min(3).max(32),
  email: z.string().trim().email().max(254).optional().or(z.literal('')),
  password: z.string().min(8).max(128),
});

const loginSchema = z.object({
  username: z.string().trim().min(1).max(32),
  password: z.string().min(1).max(128),
});

const publicUser = (user: { id: string; username: string; email?: string; avatar?: string; createdAt?: Date }) => ({
  id: user.id,
  username: user.username,
  email: user.email,
  avatar: user.avatar,
  createdAt: user.createdAt,
});

export const signupUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        message: parsed.error.issues[0]?.message || 'Invalid signup details',
      });
      return;
    }
    const { username, password } = parsed.data;
    const email = parsed.data.email || undefined;

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

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      passwordHash,
    });

    if (user) {
      res.status(201).json({
        user: publicUser(user),
        token: generateToken(user._id as any),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Unable to create account' });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: 'Invalid login details' });
      return;
    }
    const { username, password } = parsed.data;

    const user = await User.findOne({ username }).select('+passwordHash');

    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      res.json({
        user: publicUser(user),
        token: generateToken(user._id as any),
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Unable to log in' });
  }
};

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    
    res.json({ user: publicUser(req.user) });
  } catch (error: any) {
    res.status(500).json({ message: 'Unable to load current user' });
  }
};
