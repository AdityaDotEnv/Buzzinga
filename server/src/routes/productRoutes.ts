import { Router, Request, Response } from 'express';

const router = Router();

const placeholderHandler = (section: string) => (req: Request, res: Response) => {
  res.json({
    section,
    status: 'placeholder',
    message: `Future home of the ${section} product feature`
  });
};

router.get('/create-quiz', placeholderHandler('create-quiz'));
router.get('/join-game', placeholderHandler('join-game'));
router.get('/leaderboards', placeholderHandler('leaderboards'));
router.get('/analytics', placeholderHandler('analytics'));
router.get('/solutions', placeholderHandler('solutions'));
router.get('/classroom-mode', placeholderHandler('classroom-mode'));
router.get('/team-battles', placeholderHandler('team-battles'));
router.get('/events', placeholderHandler('events'));
router.get('/community-play', placeholderHandler('community-play'));

export default router;
