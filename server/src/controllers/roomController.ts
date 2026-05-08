import { Request, Response } from 'express';
import Room from '../models/roomModel';
import Quiz from '../models/quizModel';
import crypto from 'crypto';

const generateRoomCode = () => Math.floor(100000 + Math.random() * 900000).toString();

export const createRoom = async (req: Request, res: Response) => {
  try {
    let roomCode = generateRoomCode();
    let exists = await Room.findOne({ roomCode });
    while (exists) {
      roomCode = generateRoomCode();
      exists = await Room.findOne({ roomCode });
    }

    const { quizId } = req.body;
    console.log('Backend creating room for quizId:', quizId);

    if (!quizId) {
      return res.status(400).json({ message: 'quizId is required' });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Always generate a new unique hostSecret for THIS room
    const hostSecret = crypto.randomBytes(16).toString('hex');

    const room = await Room.create({
      roomCode,
      quizId,
      hostSecret,
    });

    console.log(`[DB] Room ${roomCode} created successfully for quiz ${quizId}`);

    res.status(201).json({ 
      roomCode: room.roomCode, 
      status: room.status, 
      quizId: room.quizId, 
      hostSecret: room.hostSecret 
    });
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

    // Atomically add player if nickname not already present
    const updatedRoom = await Room.findOneAndUpdate(
      { roomCode, 'players.nickname': { $ne: nickname } },
      { $push: { players: { nickname, score: 0 } } },
      { new: true }
    );
    
    if (!updatedRoom) {
      // Either room not found or nickname already taken
      const roomCheck = await Room.findOne({ roomCode });
      if (!roomCheck) return res.status(404).json({ message: 'Room not found' });
      return res.status(400).json({ message: 'Nickname already taken in this room' });
    }

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
