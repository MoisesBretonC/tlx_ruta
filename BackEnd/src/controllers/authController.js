import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Verificar si el usuario ya existe
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        // Hashear la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear nuevo usuario
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "Usuario registrado correctamente" });

    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body; // Asegúrate de que el login usa email en lugar de username

        // Buscar el usuario por email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Usuario no encontrado" });
        }

        // Comparar la contraseña proporcionada con la almacenada
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        // Aquí puedes generar un token JWT si es necesario (opcional)
        // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: "Inicio de sesión exitoso", user: { username: user.username, email: user.email } }); // Devuelve solo datos del usuario, excluyendo la contraseña

    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
};
