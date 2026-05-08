import { Router } from 'express';
import { signupUser, loginUser, getMe } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/me', protect as any, getMe);

export default router;
