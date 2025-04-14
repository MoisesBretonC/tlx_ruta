import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config/config.js';

export const authRequired = (req, res, next) => {
    // Obtener el token de cookies o headers
    let token = req.cookies?.token || req.headers.authorization?.replace('Bearer ', '');
    
    // Limpiar el token si viene con caracteres extraños
    if (token) {
        token = token.toString().trim();
        // Eliminar posibles caracteres especiales
        token = token.replace(/[^a-zA-Z0-9\-_.]/g, '');
    }

    if (!token) {
        return res.status(401).json({ message: "No se proporcionó token" });
    }

    // Verificar formato básico del token
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
        console.error('Token con formato inválido recibido:', token.substring(0, 50) + '...');
        return res.status(403).json({ 
            message: "Token inválido",
            error: "Formato incorrecto - debe tener 3 partes separadas por puntos"
        });
    }

    try {
        const decoded = jwt.verify(token, TOKEN_SECRET, { algorithms: ['HS256'] });
        req.user = decoded;
        next();
    } catch (err) {
        console.error('Error al verificar token:', {
            error: err.message,
            tokenSample: token.substring(0, 20) + '...'
        });
        return res.status(403).json({ 
            message: "Token inválido",
            error: err.message
        });
    }
};
export const checkUserType = (userPermision) => (req, res, next) => {
    if (!req.user || !userPermision.includes(req.user.userType)) {
      return res.status(403).json({ message: "Acceso denegado" });
    }
    next();
  };