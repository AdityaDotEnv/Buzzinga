import mongoose, { Schema, Document } from 'mongoose';

export interface IQuestion {
  text: string;
  options: string[];
  correct: number;
}

export interface IQuiz extends Document {
  title: string;
  description?: string;
  questions: IQuestion[];
  hostSecret: string;
  creatorId: string;
  createdAt: Date;
}

const QuestionSchema = new Schema({
  text: { type: String, required: true },
  options: { type: [String], required: true, validate: [(val: string[]) => val.length === 4, 'Must have 4 options'] },
  correct: { type: Number, required: true, min: 0, max: 3 }
}, { _id: false });

const QuizSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  questions: { type: [QuestionSchema], required: true },
  hostSecret: { type: String, required: true },
  creatorId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IQuiz>('Quiz', QuizSchema);
