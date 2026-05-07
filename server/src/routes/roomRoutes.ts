import { Router } from 'express';
import { createRoom, joinRoom, getRoom } from '../controllers/roomController';
import { validate } from '../middleware/validate';
import { z } from 'zod';

const router = Router();

const joinRoomSchema = z.object({
  body: z.object({
    roomCode: z.string().length(6, 'Room code must be exactly 6 characters'),
    nickname: z.string().min(1, 'Nickname is required').max(20, 'Nickname cannot exceed 20 characters'),
  }),
});

// @route   POST /api/rooms/create
router.post('/create', createRoom);

// @route   POST /api/rooms/join
router.post('/join', validate(joinRoomSchema), joinRoom);

// @route   GET /api/rooms/:roomCode
router.get('/:roomCode', getRoom);

export default router;
