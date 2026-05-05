import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import healthRoutes from './routes/healthRoutes';
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

// Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;
