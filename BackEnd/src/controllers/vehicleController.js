import Vehicle from '../models/vehicleModel.js';

export const registerVehicle = async (req, res) => {
  try {
    const {
      numeroUnidad,
      numeroPlaca,
      modelo,
      marca,
      idEstado,
      idConcesionario,
      capacidad
    } = req.body;

    // Validación básica
    if (!numeroUnidad || !numeroPlaca || !modelo || !marca || !idEstado || !idConcesionario || !capacidad) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    // Crear un nuevo vehículo
    const newVehicle = new Vehicle({
      numeroUnidad,
      numeroPlaca,
      modelo,
      marca,
      idEstado,
      idConcesionario,
      capacidad
    });

    // Guardar en la base de datos
    await newVehicle.save();

    res.status(201).json({ message: "Vehículo registrado correctamente", vehicle: newVehicle });

  } catch (error) {
    console.error("Error al registrar el vehículo:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};
