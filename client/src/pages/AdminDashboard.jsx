// pages/AdminDashboard.jsx
import { useAuth } from "../context/AuthContext";
import LogoutButton from "../components/LogoutButton";

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Panel de Administración (Monitor)</h1>
      <p>Bienvenido, {user?.firstName} {user?.lastName}</p>
      <LogoutButton />
      {/* Contenido específico para monitores */}
    </div>
  );
}