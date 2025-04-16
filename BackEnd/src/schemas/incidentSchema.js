import { z } from 'zod';

export const incidentSchema = z.object({
  incidentType: z.enum(['mechanical', 'accident', 'passenger', 'route', 'other']),
  location: z.string().min(5, 'La ubicación debe tener al menos 5 caracteres'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres')
});

export const commentSchema = z.object({
  text: z.string().min(1, 'El comentario no puede estar vacío')
});

export const statusSchema = z.object({
  status: z.enum(['reported', 'in_review', 'resolved'])
});