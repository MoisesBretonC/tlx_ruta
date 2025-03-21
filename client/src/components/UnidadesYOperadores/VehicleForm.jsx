import React, { useState, useEffect } from "react";
import { registerVehicle } from "../../api/vehicleService"; // Importamos la función API

function VehicleForm() {
  const [formData, setFormData] = useState({
    numeroUnidad: "",
    numeroPlaca: "",
    modelo: "",
    marca: "",
    idEstado: "",
    idConcesionario: "",
    capacidad: "",
  });

  const [mensaje, setMensaje] = useState(""); // Estado para mensajes de éxito o error

  useEffect(() => {
    // Simulamos obtener el ID del usuario autenticado
    const userId = "usuario123"; 
    setFormData(prevState => ({
      ...prevState,
      idConcesionario: userId
    }));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerVehicle(formData);
      setMensaje("Unidad registrada con éxito ✅");
      console.log("Registro exitoso:", response);
      
      // Limpiar el formulario después de registrar
      setFormData({
        numeroUnidad: "",
        numeroPlaca: "",
        modelo: "",
        marca: "",
        idEstado: "",
        idConcesionario: formData.idConcesionario, // Mantener el ID del concesionario
        capacidad: "",
      });
    } catch (error) {
      setMensaje(`Error: ${error.message} ❌`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <form 
        onSubmit={handleSubmit} 
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/3"
      >
        <h1 className="text-3xl font-semibold text-center mb-6 text-white">Registrar Unidad</h1>

        {mensaje && <p className="text-center mb-4 text-red-500">{mensaje}</p>}

        <div className="mb-4">
          <label htmlFor="numeroUnidad" className="block text-gray-400">Número de Unidad</label>
          <input
            type="text"
            id="numeroUnidad"
            name="numeroUnidad"
            value={formData.numeroUnidad}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-md"
            placeholder="Número de unidad"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="numeroPlaca" className="block text-gray-400">Número de Placa</label>
          <input
            type="text"
            id="numeroPlaca"
            name="numeroPlaca"
            value={formData.numeroPlaca}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-md"
            placeholder="Número de placa"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="modelo" className="block text-gray-400">Modelo</label>
          <input
            type="text"
            id="modelo"
            name="modelo"
            value={formData.modelo}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-md"
            placeholder="Modelo"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="marca" className="block text-gray-400">Marca</label>
          <input
            type="text"
            id="marca"
            name="marca"
            value={formData.marca}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-md"
            placeholder="Marca"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="idEstado" className="block text-gray-400">Estado</label>
          <select
            id="idEstado"
            name="idEstado"
            value={formData.idEstado}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-md"
          >
            <option value="">Selecciona el estado</option>
            <option value="en_uso">En uso</option>
            <option value="disponible">Disponible</option>
            <option value="no_disponible">No disponible</option>
            <option value="guardia">Guardia</option>
          </select>
        </div>

        <input type="hidden" name="idConcesionario" value={formData.idConcesionario} />

        <div className="mb-4">
          <label htmlFor="capacidad" className="block text-gray-400">Capacidad</label>
          <input
            type="text"
            id="capacidad"
            name="capacidad"
            value={formData.capacidad}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-md"
            placeholder="Capacidad"
          />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">
          Registrar Unidad
        </button>
      </form>
    </div>
  );
}

export default VehicleForm;
