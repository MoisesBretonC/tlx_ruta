import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from "../config/config.js";

export const register = async (req, res) => {
  const { NombreUsuario, correo, contraseña, nombre, apellidoP, apellidoM, celular } = req.body;
  
  try {
    const userFound = await User.findOne({ correo });
    if (userFound) return res.status(400).json(["El correo ya está en uso"]);

    const passwordHash = await bcrypt.hash(contraseña, 10);
    
    const newUser = new User({
      NombreUsuario,
      correo,
      contraseña: passwordHash,
      nombre,
      apellidoP,
      apellidoM,
      celular
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token);
    res.json({
      id: userSaved._id,
      NombreUsuario: userSaved.NombreUsuario,
      correo: userSaved.correo,
      nombre: userSaved.nombre,
      apellidoP: userSaved.apellidoP,
      apellidoM: userSaved.apellidoM,
      celular: userSaved.celular,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { correo, contraseña } = req.body;
  
  try {
    const userFound = await User.findOne({ correo });
    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(contraseña, userFound.contraseña);
    if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
      httpOnly: true
    });

    res.json({
      token,
      user: {
        id: userFound._id,
        NombreUsuario: userFound.NombreUsuario,
        correo: userFound.correo,
        nombre: userFound.nombre,
        apellidoP: userFound.apellidoP,
        apellidoM: userFound.apellidoM,
        celular: userFound.celular,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0)
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });
  
  return res.json({
    id: userFound._id,
    NombreUsuario: userFound.NombreUsuario,
    correo: userFound.correo,
    nombre: userFound.nombre,
    apellidoP: userFound.apellidoP,
    apellidoM: userFound.apellidoM,
    celular: userFound.celular,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "No autorizado" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "No autorizado" });

    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: "No autorizado" });

    return res.json({
      id: userFound._id,
      NombreUsuario: userFound.NombreUsuario,
      correo: userFound.correo,
      nombre: userFound.nombre,
      apellidoP: userFound.apellidoP,
      apellidoM: userFound.apellidoM,
      celular: userFound.celular,
    });
  });
};
