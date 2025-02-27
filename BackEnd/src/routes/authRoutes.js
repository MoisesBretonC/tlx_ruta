import express from 'express';
import { register, login } from '../controllers/authController.js'; // Asegúrate de importar el nuevo controlador

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', register);

// Ruta para iniciar sesión
router.post('/login', login);

export default router;
