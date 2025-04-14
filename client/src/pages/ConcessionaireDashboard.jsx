// pages/ConcessionaireDashboard.jsx
import { useAuth } from "../context/AuthContext";
import LogoutButton from "../components/LogoutButton";

export default function ConcessionaireDashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Panel de Concesionario</h1>
      <p>Bienvenido, {user?.firstName} {user?.lastName}</p>
      <LogoutButton />
      {/* Contenido específico para concesionarios */}
    </div>
  );
}