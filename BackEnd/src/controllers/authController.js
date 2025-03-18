import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from "../config/config.js";

export const register = async (req, res) => {
  const { email, password, username, firstName, lastName,phone} = req.body;
  
  try {

    const userFound = await User.findOne({email})
    if(userFound) return res.status(400).json(["The email is already in use"]);


    const passwordHash = await bcrypt.hash(password, 10); //yyvyvvyv
    // GUardar el usuario pero solo en el back, sin irse a la base de datos
    const newUser = new User({
      username,
      email,
      password: passwordHash,
      firstName,
      lastName,
      phone
    });

    
    // se guarda el usuario
    const userSaved= await newUser.save();
    // token atravez de otra funcion
    const token = await createAccessToken({id: userSaved._id});
    res.cookie("token", token)
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      firstName: userSaved.firstName,
      lastName: userSaved.lastName,
      phone: userSaved.phone,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    }); 
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    const token = await createAccessToken({ id: userFound._id });

    // 🔹 Guardar el token como cookie
    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
      httpOnly: true
    });

    // 🔹 Incluir el token en la respuesta JSON
    res.json({
      token,  // <-- Aquí lo agregamos
      user: {
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
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
  const { token } = req.cookies;
  if(!token) return res.status(401).json({message:"Unauthorized"});

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
    if(err) return res.status(401).json({ message: "Unauthorized"});

    const userFound = await User.findById(user.id);
    if(!userFound) return res.status(401).json({message:"Unauthorized"});

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};