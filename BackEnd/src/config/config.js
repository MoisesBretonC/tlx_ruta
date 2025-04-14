
console.log("🔑 Token secret cargado correctamente");

// Verificación redundante
if (!process.env.JWT_SECRET) {
    throw new Error(`
      🚨 ERROR CRÍTICO: JWT_SECRET no definido.
      Razones posibles:
      1. Archivo .env no encontrado
      2. Variable mal escrita en .env
      3. El servidor no se reinició después de cambios
    `);
  }
  
  export const TOKEN_SECRET = process.env.JWT_SECRET;
  console.log('🔐 Configuración JWT lista');