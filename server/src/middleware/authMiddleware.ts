import { Request, Response, NextFunction } from 'express';
import Room from '../models/roomModel';

/**
 * Middleware to protect routes that only the host should access.
 * Checks for hostSecret in headers or body.
 */
export const protectHost = async (req: Request, res: Response, next: NextFunction) => {
  const hostSecret = req.headers['x-host-secret'] || req.body.hostSecret;

  if (!hostSecret) {
    return res.status(401).json({ message: 'Access denied. No host secret provided.' });
  }

  // If roomCode is provided in URL or body, verify against the room
  const roomCode = req.params.roomCode || req.body.roomCode;
  if (roomCode) {
    const room = await Room.findOne({ roomCode });
    if (!room) return res.status(404).json({ message: 'Room not found' });
    
    if (room.hostSecret !== hostSecret) {
      return res.status(403).json({ message: 'Invalid host secret for this room.' });
    }
    // Attach room to request for convenience
    (req as any).room = room;
  }

  next();
};

/**
 * Middleware to protect routes that only admins should access.
 * Compares X-Admin-Token header against environment variable.
 */
export const protectAdmin = (req: Request, res: Response, next: NextFunction) => {
  const adminToken = req.headers['x-admin-token'];
  const SYSTEM_ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'buzzinga-admin-secret-2026';

  if (!adminToken || adminToken !== SYSTEM_ADMIN_TOKEN) {
    return res.status(403).json({ message: 'Admin access denied.' });
  }

  next();
};
