import { Router, Request, Response } from 'express';

const router = Router();

const placeholderHandler = (section: string) => (req: Request, res: Response) => {
  res.json({
    section,
    status: 'placeholder',
    message: `Future home of the ${section} resource`
  });
};

router.get('/help-center', placeholderHandler('help-center'));
router.get('/templates', placeholderHandler('templates'));
router.get('/guides', placeholderHandler('guides'));
router.get('/status', placeholderHandler('status'));

export default router;
