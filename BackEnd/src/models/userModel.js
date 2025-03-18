import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    NombreUsuario: {
        type: String,
        required: true,
        trim: true,
    },
    correo: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    contraseña: {
        type: String,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    apellidoP: {
        type: String,
        required: true,
        trim: true,
    },
    apellidoM: {
        type: String,
        required: true,
        trim: true,
    },
    celular: {
        type: String,
        required: true,
        trim: true,
    }
}, {
    timestamps: true
});

export default mongoose.model('User', userSchema);