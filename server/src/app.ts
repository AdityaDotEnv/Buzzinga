import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import healthRoutes from './routes/healthRoutes';
import roomRoutes from './routes/roomRoutes';
import quizRoutes from './routes/quizRoutes';
import { notFound, errorHandler } from './middleware/errorMiddleware';

const app: Application = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/v1/health', healthRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/v1/rooms', roomRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/v1/quizzes', quizRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;
