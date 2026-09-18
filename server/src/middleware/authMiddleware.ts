import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/tokenUtils';
import User from '../models/User';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    username: string;
    email?: string;
    avatar?: string;
    createdAt: Date;
  };
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = verifyToken(token);
      
      const user = await User.findById(decoded.id).select('username email avatar createdAt');
      
      if (!user) {
        res.status(401).json({ message: 'Not authorized, user not found' });
        return;
      }
      req.user = {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        createdAt: user.createdAt,
      };
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
      return;
    }
  }

    if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
    return;
  }
};

export const optionalProtect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = verifyToken(token);
      const user = await User.findById(decoded.id).select('username email avatar createdAt');
      if (user) {
        req.user = {
          id: user._id.toString(),
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          createdAt: user.createdAt,
        };
      }
    } catch (error) {
      // Ignore token failure for optional protection
    }
  }
  next();
};
