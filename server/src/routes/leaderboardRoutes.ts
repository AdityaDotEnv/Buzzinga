import { Router } from 'express';
import { getGlobalLeaderboard } from '../controllers/leaderboardController';

const router = Router();

router.get('/global', getGlobalLeaderboard);

export default router;
