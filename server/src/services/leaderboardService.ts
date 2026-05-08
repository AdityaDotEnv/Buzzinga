export interface LeaderboardEntry {
  username: string;
  score: number;
  wins: number;
  streak?: number;
  accuracy?: number;
  quizzesPlayed?: number;
}

export const getGlobalLeaderboardData = (): LeaderboardEntry[] => {
  // Mock data for leaderboard
  return [
    {
      username: 'Alex',
      score: 1540,
      wins: 24,
      streak: 5,
      accuracy: 92,
      quizzesPlayed: 30
    },
    {
      username: 'Jordan',
      score: 1420,
      wins: 18,
      streak: 2,
      accuracy: 88,
      quizzesPlayed: 25
    },
    {
      username: 'Taylor',
      score: 1390,
      wins: 15,
      streak: 0,
      accuracy: 85,
      quizzesPlayed: 20
    }
  ];
};
