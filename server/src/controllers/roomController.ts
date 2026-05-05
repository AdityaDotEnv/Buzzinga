import { Request, Response } from 'express';
import Room from '../models/roomModel';
import Quiz from '../models/quizModel';

const generateRoomCode = () => Math.floor(100000 + Math.random() * 900000).toString();

export const createRoom = async (req: Request, res: Response) => {
  try {
    let roomCode = generateRoomCode();
    let exists = await Room.findOne({ roomCode });
    while (exists) {
      roomCode = generateRoomCode();
      exists = await Room.findOne({ roomCode });
    }

    const { quizId, hostSecret } = req.body;

    if (!quizId || !hostSecret) {
      return res.status(400).json({ message: 'quizId and hostSecret are required' });
    }

    // Verify quiz ownership/secret
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    if (quiz.hostSecret !== hostSecret) {
      return res.status(403).json({ message: 'Invalid host secret' });
    }

    const room = await Room.create({
      roomCode,
      quizId,
      hostSecret,
    });

    res.status(201).json({ roomCode: room.roomCode, status: room.status, quizId: room.quizId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating room' });
  }
};

export const joinRoom = async (req: Request, res: Response) => {
  try {
    const { roomCode, nickname } = req.body;

    const room = await Room.findOne({ roomCode });
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    if (room.status !== 'waiting') {
      return res.status(400).json({ message: 'Room is no longer accepting players' });
    }

    if (room.players.some(p => p.nickname === nickname)) {
      return res.status(400).json({ message: 'Nickname already taken in this room' });
    }

    room.players.push({ nickname, score: 0 });
    await room.save();

    res.status(200).json({ message: 'Joined successfully', roomCode: room.roomCode });
  } catch (error) {
    res.status(500).json({ message: 'Error joining room' });
  }
};

export const getRoom = async (req: Request, res: Response) => {
  try {
    const { roomCode } = req.params;
    const room = await Room.findOne({ roomCode });
    
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.status(200).json({
      roomCode: room.roomCode,
      players: room.players,
      status: room.status
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching room' });
  }
};
