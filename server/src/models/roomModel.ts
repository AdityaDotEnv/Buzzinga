import mongoose, { Schema, Document } from 'mongoose';

export interface IPlayerScore {
  nickname: string;
  score: number;
}

export interface IRoom extends Document {
  roomCode: string;
  hostId: string;
  players: IPlayerScore[];
  status: 'waiting' | 'active' | 'ended';
  createdAt: Date;
}

const PlayerScoreSchema = new Schema({
  nickname: { type: String, required: true },
  score: { type: Number, default: 0 }
}, { _id: false });

const RoomSchema: Schema = new Schema({
  roomCode: { type: String, required: true, unique: true },
  hostId: { type: String, required: true },
  players: { type: [PlayerScoreSchema], default: [] },
  status: { type: String, enum: ['waiting', 'active', 'ended'], default: 'waiting' },
  createdAt: { type: Date, default: Date.now, expires: 86400 } // 24h expiration
});

export default mongoose.model<IRoom>('Room', RoomSchema);
