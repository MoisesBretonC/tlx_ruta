import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from "../config/config.js";

export const register = async (req, res) => {
  const { email, password, username, firstName, lastName, phone, userType } = req.body;
  
  try {

    const errors = [];

    const userFound = await User.findOne({email});
    if (userFound) errors.push("El correo ya está registrado");
    if (password.length < 6) errors.push("La contraseña debe tener al menos 6 caracteres.");
    if (errors.length > 0) {
      return res.status(400).json({ message: errors });
    }
    const passwordHash = await bcrypt.hash(password, 10); //yyvyvvyv
    // GUardar el usuario pero solo en el back, sin irse a la base de datos
    const newUser = new User({
      username,
      email,
      password: passwordHash,
      firstName,
      lastName,
      phone,
      userType: userType ||"concessionaire"
    });

    
    // se guarda el usuario
    const userSaved= await newUser.save();
    // token atravez de otra funcion
    const token = await createAccessToken({id: userSaved._id, userType:userSaved.userType});
    res.cookie("token", token)
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      userType: userSaved.userType,
      firstName: userSaved.firstName,
      lastName: userSaved.lastName,
      phone: userSaved.phone,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    }); 
  } catch (error) {
    res.status(500).json({ message: "error del servidor" + error.message });
  } 
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

    // 🔹 Generar el token
    const token = await createAccessToken({
      id: userFound._id,
      userType: userFound.userType
  });

  // Verifica el token antes de enviarlo
  const tokenParts = token.split('.');
  if (tokenParts.length !== 3) {
      throw new Error('Token generado con formato incorrecto');
  }

  // Configuración segura de cookies
  res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 1 día
      encode: String // Asegura codificación correcta
  });

  res.json({
      success: true,
      token, // También envía el token en el body para debug
      user: {
          id: userFound._id,
          userType: userFound.userType
      }
  });
} catch (error) {
  console.error('Error en login:', error);
  res.status(500).json({ 
      success: false,
      message: "Error en el servidor",
      error: error.message
  });
}
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0)
  })
  return res.sendStatus(200);
}

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id)

  if(!userFound) return res.status(400).json({message: "User not found"});
  
  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
}

export const verifyToken = async (req, res) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    const userFound = await User.findById(decoded.id);
    if (!userFound) return res.status(401).json({ message: "Unauthorized" });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      userType: userFound.userType,
    });
  });
};