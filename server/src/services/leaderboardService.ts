import User from '../models/User';

export interface LeaderboardEntry {
  username: string;
  score: number;
  wins?: number;
  streak?: number;
  accuracy?: number;
  quizzesPlayed: number;
}

export const getGlobalLeaderboardData = async (limit: number = 10, skip: number = 0): Promise<LeaderboardEntry[]> => {
  const users = await User.find()
    .sort({ score: -1 })
    .skip(skip)
    .limit(limit)
    .select('username score quizzesPlayed -_id');

  return users.map(user => ({
    username: user.username,
    score: user.score || 0,
    quizzesPlayed: user.quizzesPlayed || 0
  }));
};
