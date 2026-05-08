import { Router, Request, Response } from 'express';

const router = Router();

const placeholderHandler = (section: string) => (req: Request, res: Response) => {
  res.json({
    section,
    status: 'placeholder',
    message: `Future home of the ${section} company page`
  });
};

router.get('/about', placeholderHandler('about'));
router.get('/careers', placeholderHandler('careers'));
router.get('/contact', placeholderHandler('contact'));
router.get('/privacy', placeholderHandler('privacy'));

export default router;
