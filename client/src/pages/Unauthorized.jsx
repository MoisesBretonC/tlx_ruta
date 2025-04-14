import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">403 - No autorizado</h1>
      <p className="mb-6">No tienes permiso para acceder a esta página</p>
      <Link 
        to="/login" 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Volver al inicio
      </Link>
    </div>
  );
}