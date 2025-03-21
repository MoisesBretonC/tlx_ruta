const API_URL = "http://localhost:4000/api/vehicles"; // Ajusta la URL según tu backend

export const registerVehicle = async (vehicleData) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vehicleData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al registrar la unidad");
    }

    return data; // Retornamos los datos de respuesta del backend
  } catch (error) {
    throw new Error(error.message);
  }
};
