import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET && process.env.NODE_ENV === 'production') {
  throw new Error('JWT_SECRET must be configured in production');
}

const signingSecret = JWT_SECRET || 'buzzinga-development-only-secret';

export const generateToken = (userId: Types.ObjectId | string): string => {
  return jwt.sign({ id: userId }, signingSecret, {
    expiresIn: '30d',
  });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, signingSecret);
};
