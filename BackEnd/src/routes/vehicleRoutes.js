import express from 'express';
import { registerVehicle } from '../controllers/vehicleController.js';

const router = express.Router();

// Ruta para registrar un vehículo
router.post('/vehicles', registerVehicle);

export default router;
