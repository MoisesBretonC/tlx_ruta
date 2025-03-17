import LogoutButton from "../components/LogoutButton"; // Importa el componente LogoutButton

function TasksPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Página de Tareas</h1>
      {/* Aquí va el contenido de las tareas */}
      <LogoutButton /> {/* Coloca el componente donde quieras el botón */}
    </div>
  );
}

export default TasksPage;
