import express from 'express'
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';

const app = express();

app.use(morgan('dev'));

app.use('/api',authRoutes);

export default app;