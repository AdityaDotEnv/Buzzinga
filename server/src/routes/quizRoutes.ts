import { Router } from 'express';
import { createQuiz, getQuiz, getAllQuizzes, updateQuiz } from '../controllers/quizController';
import { protect, optionalProtect } from '../middleware/authMiddleware';

const router = Router();

// @route   POST /api/quizzes
router.post('/', protect as any, createQuiz);

// @route   GET /api/quizzes
router.get('/', optionalProtect as any, getAllQuizzes);

// @route   GET /api/quizzes/:id
router.get('/:id', optionalProtect as any, getQuiz);

// @route   PUT /api/quizzes/:id
router.put('/:id', protect as any, updateQuiz);

export default router;
