import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  passwordHash: string;
  avatar?: string;
  score: number;
  quizzesPlayed: number;
  createdAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 32,
    },
    email: {
      type: String,
      unique: true,
      sparse: true,  // allows multiple null/missing values
      trim: true,
      lowercase: true,
      maxlength: 254,
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
    avatar: {
      type: String,
    },
    score: {
      type: Number,
      default: 0,
    },
    quizzesPlayed: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>('User', UserSchema);
