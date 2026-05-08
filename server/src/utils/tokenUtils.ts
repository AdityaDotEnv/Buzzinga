import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

const JWT_SECRET = process.env.JWT_SECRET || 'buzzinga-dev-secret';

export const generateToken = (userId: Types.ObjectId | string): string => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: '30d',
  });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};
