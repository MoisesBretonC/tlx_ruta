import express from 'express'
import morgan from 'morgan';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js';
import tasksRoutes from './routes/tasksRoutes.js';
import vehicleRoutes from './routes/vehicleRoutes.js';

const app = express();

//Permitir que todos los dominios se comuniquen entre si es decir, comunicar el backcon el front
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
// Middlewares
app.use(morgan('dev'));
// ProcesarLosDatos para que se conviertan en json
app.use(express.json());
//libreria para las cookies
app.use(cookieParser());

app.use('/api',authRoutes);

app.use('/api', tasksRoutes);




//Modulo de Las unidades o Vehiculos
app.use('/api', vehicleRoutes);

export default app;