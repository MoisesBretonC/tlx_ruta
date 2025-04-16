import express from 'express';
import {
  createIncident,
  getIncidentsForConcessionaire,
  getIncidentDetails,
  addComment,
  updateIncidentStatus
} from '../controllers/incidentController.js';
import { authRequired } from '../middlewares/validateToken.js';
import multer from 'multer';
import { checkUserType } from '../middlewares/validateToken.js';

const router = express.Router();

// Configuración de Multer para subir imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

// Operadores pueden crear incidencias
router.post(
  '/',
  authRequired,
  checkUserType(['operator']),
  upload.single('evidence'),
  createIncident
);

// Concesionarios pueden ver sus incidencias
router.get(
  '/concessionaire',
  authRequired,
  checkUserType(['concessionaire']),
  getIncidentsForConcessionaire
);

// Detalles de incidencia (accesible para operador, concesionario y monitor)
router.get(
  '/:id',
  authRequired,
  getIncidentDetails
);

// Añadir comentario (accesible para operador y concesionario)
router.post(
  '/:id/comments',
  authRequired,
  checkUserType(['operator', 'concessionaire']),
  addComment
);

// Actualizar estado (solo concesionario)
router.put(
  '/:id/status',
  authRequired,
  checkUserType(['concessionaire']),
  updateIncidentStatus
);

export default router;