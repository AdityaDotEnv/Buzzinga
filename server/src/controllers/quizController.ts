import { Request, Response } from 'express';
import Quiz from '../models/quizModel';
import User from '../models/User';
import { AuthRequest } from '../middleware/authMiddleware';
import crypto from 'crypto';

export const createQuiz = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, questions } = req.body;
    const hostSecret = crypto.randomBytes(16).toString('hex');
    
    // Use authenticated user if available
    const creatorId = req.user ? req.user.id : (req.body.creatorId || 'admin');

    const quiz = await Quiz.create({
      title,
      description,
      questions,
      hostSecret,
      creatorId,
    });

    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Error creating quiz' });
  }
};

export const getQuiz = async (req: AuthRequest, res: Response) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    
    const isOwner = req.user && quiz.creatorId === req.user.id;

    // Attach creator metadata
    const user = await User.findById(quiz.creatorId).catch(() => null);
    const quizResponse = {
      ...quiz.toObject(),
      creator: {
        username: user ? user.username : 'admin'
      },
      isOwner
    };

    res.status(200).json(quizResponse);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quiz' });
  }
};

export const getAllQuizzes = async (req: Request, res: Response) => {
  try {
    const quizzes = await Quiz.find().select('title description questions timeLimit createdAt creatorId');
    
    // Fetch unique creator IDs to resolve usernames
    const creatorIds = [...new Set(quizzes.map(q => q.creatorId).filter(id => id && id !== 'admin'))];
    let users = [];
    try {
      users = await User.find({ _id: { $in: creatorIds } }).select('username');
    } catch (e) {
      // Ignore valid ObjectId errors for bad creatorIds
    }
    const userMap = new Map(users.map(u => [u._id.toString(), u.username]));

    // Map quizzes to include creator metadata and ownership
    const quizzesWithCreator = quizzes.map((quiz) => ({
      ...quiz.toObject(),
      creator: {
        username: userMap.get(quiz.creatorId) || 'admin'
      },
      isOwner: req.user && quiz.creatorId === req.user.id
    }));

    res.status(200).json(quizzesWithCreator);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quizzes' });
  }
};

export const updateQuiz = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, questions, tags, difficulty, timeLimit } = req.body;
    const quizId = req.params.id;

    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Check ownership
    if (quiz.creatorId !== req.user?.id && req.user?.id !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this quiz' });
    }

    quiz.title = title || quiz.title;
    quiz.description = description || quiz.description;
    quiz.questions = questions || quiz.questions;
    quiz.tags = tags || quiz.tags;
    quiz.difficulty = difficulty || quiz.difficulty;
    quiz.timeLimit = timeLimit || quiz.timeLimit;

    await quiz.save();

    res.status(200).json(quiz);
  } catch (error) {
    console.error('Update Quiz Error:', error);
    res.status(500).json({ message: 'Error updating quiz' });
  }
};
