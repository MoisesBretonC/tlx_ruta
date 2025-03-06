import express from 'express'
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import tasksRoutes from './routes/tasksRoutes.js';
import cookieParser from 'cookie-parser'

const app = express();

// Middlewares
app.use(morgan('dev'));
// ProcesarLosDatos para que se conviertan en json
app.use(express.json());
//libreria para las cookies
app.use(cookieParser());

app.use('/api',authRoutes);

app.use('/api', tasksRoutes);

export default app;