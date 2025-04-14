import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';  // Importa el módulo path
import authRoutes from './src/routes/authRoutes.js';  // Importa las rutas
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(express.json());
app.use(express.static('public')); // Servir archivos estáticos desde la carpeta 'public'
app.use(cookieParser());

// Conectar a MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// Rutas de autenticación

app.use('/api/auth', authRoutes);  // Para las rutas y autenticacion

// Rutas para archivos HTML
//login
app.get('/login', (req, res) => {
    res.sendFile(path.join(path.resolve(), 'public', 'login', 'login.html')); 
});

//registro
app.get('/registro', (req, res) => {
    res.sendFile(path.join(path.resolve(), 'public', 'registro', 'register.html')); // Cambia aquí
});

//welcome
app.get('/bienvenido', (req, res) => {
    res.sendFile(path.join(path.resolve(), 'public', 'bienvenido', 'bienvenido.html')); // Cambia aquí
});
//welcome
app.get('/', (req, res) => {
    res.sendFile(path.join(path.resolve(), 'public', 'home', 'home.html')); // Cambia aquí
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
