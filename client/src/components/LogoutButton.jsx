// src/components/LogoutButton.js

import { useAuth } from "../context/AuthContext"; // Importa el contexto de autenticación
import { useNavigate } from "react-router-dom"; // Importa useNavigate para redirigir después de logout

function LogoutButton() {
  const { signout } = useAuth(); // Llama a la función de cierre de sesión desde el contexto
  const navigate = useNavigate(); // Redirige al usuario a otra página

  const handleLogout = () => {
    signout(); // Ejecuta la lógica de cierre de sesión
    navigate("/login"); // Redirige a la página de login después de cerrar sesión
  };

  return (
    <button
      onClick={handleLogout} // Llama a handleLogout cuando el botón es clickeado
      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
    >
      Cerrar sesión
    </button>
  );
}

export default LogoutButton; // Exporta el componente
