import mongoose from 'mongoose';

const incidentSchema = new mongoose.Schema({
  operator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  concessionaire: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  incidentType: {
    type: String,
    enum: ['mechanical', 'accident', 'passenger', 'route', 'other'],
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  evidence: {
    type: String // Guardaremos la ruta del archivo
  },
  status: {
    type: String,
    enum: ['reported', 'in_review', 'resolved'],
    default: 'reported'
  },
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    text: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, { timestamps: true });

export default mongoose.model('Incident', incidentSchema);