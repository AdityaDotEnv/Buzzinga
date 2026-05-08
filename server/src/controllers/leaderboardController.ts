import { Request, Response } from 'express';
import { getGlobalLeaderboardData } from '../services/leaderboardService';

export const getGlobalLeaderboard = (req: Request, res: Response): void => {
  try {
    // Placeholder pagination support
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    // Sort logic placeholder (already mock sorted, but leaving room for future DB sort)
    const data = getGlobalLeaderboardData();
    
    res.json({
      data,
      page,
      limit,
      total: data.length
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
