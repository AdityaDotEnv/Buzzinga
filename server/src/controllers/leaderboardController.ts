import { Request, Response } from 'express';
import { getGlobalLeaderboardData } from '../services/leaderboardService';
import User from '../models/User';

export const getGlobalLeaderboard = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    
    const data = await getGlobalLeaderboardData(limit, skip);
    const total = await User.countDocuments();
    
    res.json({
      data,
      page,
      limit,
      total
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
