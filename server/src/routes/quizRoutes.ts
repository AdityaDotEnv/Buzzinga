import { Router } from 'express';
import { createQuiz, getQuiz, getAllQuizzes } from '../controllers/quizController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// @route   POST /api/quizzes
router.post('/', protect as any, createQuiz);

// @route   GET /api/quizzes
router.get('/', getAllQuizzes);

// @route   GET /api/quizzes/:id
router.get('/:id', getQuiz);

export default router;
