import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    numeroUnidad: { type: String, required: true, unique: true },
    numeroPlaca: { type: String, required: true, unique: true },
    modelo: { type: String, required: true },
    marca: { type: String, required: true },
    idEstado: { type: String, required: true },
    idConcesionario: { type: String, required: true }, // Relación con el usuario/concesionario
    capacidad: { type: String, required: true },
  },
  { timestamps: true }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;
