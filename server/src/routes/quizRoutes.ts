import { Router } from 'express';
import { createQuiz, getQuiz, getAllQuizzes } from '../controllers/quizController';

const router = Router();

// @route   POST /api/quizzes
router.post('/', createQuiz);

// @route   GET /api/quizzes
router.get('/', getAllQuizzes);

// @route   GET /api/quizzes/:id
router.get('/:id', getQuiz);

export default router;
