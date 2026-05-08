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

export const getQuiz = async (req: Request, res: Response) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    
    // Placeholder ownership validation
    const isOwner = false; // Add real check later: req.user?.id === quiz.creatorId

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

    // Map quizzes to include creator metadata
    const quizzesWithCreator = quizzes.map((quiz) => ({
      ...quiz.toObject(),
      creator: {
        username: userMap.get(quiz.creatorId) || 'admin'
      }
    }));

    res.status(200).json(quizzesWithCreator);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quizzes' });
  }
};
