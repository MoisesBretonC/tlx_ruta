import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuración de paths absolutos
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Carga de variables de entorno
const envPath = path.resolve(__dirname, '../.env'); // Cambiado a ../.env
dotenv.config({ path: envPath });

console.log('✅ Configuración cargada desde:', envPath);

const app = express();

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Importación explícita con rutas absolutas
const authRoutes = (await import('./routes/authRoutes.js')).default;
const tasksRoutes = (await import('./routes/tasksRoutes.js')).default;

// Rutas
app.use('/api', authRoutes);
app.use('/api', tasksRoutes);

export default app;