import { Request, Response } from 'express';
import Quiz from '../models/quizModel';
import crypto from 'crypto';

export const createQuiz = async (req: Request, res: Response) => {
  try {
    const { title, description, questions, creatorId } = req.body;
    const hostSecret = crypto.randomBytes(16).toString('hex');

    const quiz = await Quiz.create({
      title,
      description,
      questions,
      hostSecret,
      creatorId: creatorId || 'admin',
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
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quiz' });
  }
};

export const getAllQuizzes = async (req: Request, res: Response) => {
  try {
    const quizzes = await Quiz.find().select('title description questions timeLimit createdAt');
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quizzes' });
  }
};
