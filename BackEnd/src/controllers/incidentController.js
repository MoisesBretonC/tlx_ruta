import Incident from '../models/incidentModel.js';
import User from '../models/userModel.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Crear una nueva incidencia
export const createIncident = async (req, res) => {
  try {
    const { incidentType, location, description } = req.body;
    const operatorId = req.user.id;

    // Verificar si el usuario es operador
    const operator = await User.findById(operatorId);
    if (!operator || operator.userType !== 'operator') {
      return res.status(403).json({ message: 'Solo los operadores pueden reportar incidencias' });
    }

    // Manejo de la imagen de evidencia
    let evidencePath = '';
    if (req.file) {
      evidencePath = `/uploads/${req.file.filename}`;
    }

    const newIncident = new Incident({
      operator: operatorId,
      concessionaire: operator.concessionaire || null,
      incidentType,
      location,
      description,
      evidence: evidencePath
    });

    await newIncident.save();
    
    // Poblar datos del operador para la respuesta
    const incidentWithOperator = await Incident.findById(newIncident._id)
      .populate('operator', 'firstName lastName phone');

    res.status(201).json(incidentWithOperator);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener incidencias para un concesionario
export const getIncidentsForConcessionaire = async (req, res) => {
  try {
    const concessionaireId = req.user.id;
    
    // Verificar si el usuario es concesionario
    const user = await User.findById(concessionaireId);
    if (!user || user.userType !== 'concessionaire') {
      return res.status(403).json({ message: 'Acceso no autorizado' });
    }

    const incidents = await Incident.find({ concessionaire: concessionaireId })
      .populate('operator', 'firstName lastName phone')
      .sort({ createdAt: -1 });

    res.json(incidents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener detalles de una incidencia
export const getIncidentDetails = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id)
      .populate('operator', 'firstName lastName phone')
      .populate('concessionaire', 'firstName lastName')
      .populate('comments.user', 'firstName lastName');

    if (!incident) {
      return res.status(404).json({ message: 'Incidencia no encontrada' });
    }

    // Verificar permisos
    const user = req.user;
    if (user.userType !== 'monitor' && 
        user.id !== incident.operator._id.toString() && 
        user.id !== incident.concessionaire._id.toString()) {
      return res.status(403).json({ message: 'No autorizado para ver esta incidencia' });
    }

    res.json(incident);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Añadir comentario a una incidencia
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const incident = await Incident.findById(req.params.id);

    if (!incident) {
      return res.status(404).json({ message: 'Incidencia no encontrada' });
    }

    incident.comments.push({
      user: req.user.id,
      text
    });

    await incident.save();
    
    // Devolver la incidencia actualizada con los datos poblados
    const updatedIncident = await Incident.findById(incident._id)
      .populate('operator', 'firstName lastName phone')
      .populate('concessionaire', 'firstName lastName')
      .populate('comments.user', 'firstName lastName');

    res.json(updatedIncident);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar estado de una incidencia
export const updateIncidentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const incident = await Incident.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
    .populate('operator', 'firstName lastName phone')
    .populate('concessionaire', 'firstName lastName')
    .populate('comments.user', 'firstName lastName');

    if (!incident) {
      return res.status(404).json({ message: 'Incidencia no encontrada' });
    }

    res.json(incident);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};