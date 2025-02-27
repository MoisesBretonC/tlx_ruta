import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.y0avv.mongodb.net/${process.env.NAME}?retryWrites=true&w=majority;`

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI)
        console.log("Conectado a la Base de Datos");
    } catch (error) {
        console.error(error);
    }
};

