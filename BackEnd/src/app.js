import express from 'express'
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';

const app = express();

// Middlewares
app.use(morgan('dev'));
// ProcesarLosDatos para que se conviertan en json
app.use(express.json());

app.use('/api',authRoutes);

export default app;