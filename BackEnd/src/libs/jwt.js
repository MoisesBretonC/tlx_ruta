import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from '../config/config.js';

export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    // Validación de entrada
    if (!payload || typeof payload !== 'object') {
      reject(new Error('Payload debe ser un objeto no vacío'));
      return;
    }

    if (!TOKEN_SECRET || TOKEN_SECRET.length < 32) {
      reject(new Error('TOKEN_SECRET debe tener al menos 32 caracteres'));
      return;
    }

    jwt.sign(
      payload,
      TOKEN_SECRET,
      {
        expiresIn: "1d",
        algorithm: "HS256", // Fuerza el algoritmo HS256
        header: {
          typ: "JWT",       // Tipo explícito
          alg: "HS256"      // Algoritmo explícito
        }
      },
      (err, token) => {
        if (err) {
          console.error('Error al generar token:', err);
          reject(new Error('Error al generar token JWT'));
          return;
        }

        // Verificación adicional del token generado
        const parts = token.split('.');
        if (parts.length !== 3) {
          reject(new Error('Token generado con formato inválido'));
          return;
        }

        console.log('Token generado exitosamente');
        resolve(token);
      }
    );
  });
}
