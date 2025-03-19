import Navbar from "../components/Navbar";

function HomePage() {
  return (
    <>
    <Navbar />
    {/* Descripción */}
    <div style={{background: "#fff", color:"#000"}}>
      <section className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">¿Qué es TLX-Ruta?</h2>
        <p>
          TLX-Ruta es un sistema de gestión diseñado para concesionarios de transporte público.
          Permite administrar corporativos, operadores, rutas, unidades, horarios y turnos de manera eficiente.
        </p>
      </section>
        
      {/* /* Características */}
      <section className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">Características principales</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Gestión de personal y operadores</li>
          <li>Administración de rutas, horarios y turnos</li>
          <li>Creación de corporativos y registro de unidades</li>
          <li>Asignación de operadores a rutas y unidades</li>
        </ul>
      </section>
        
      {/* Tecnologías */}
      <section className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">Tecnologías utilizadas</h2>
        <div className="flex space-x-4"  style={{color: "#000"}}>
          <span className="bg-blue-200 px-4 py-2 rounded-lg">React</span>
          <span className="bg-green-200 px-4 py-2 rounded-lg">Node.js</span>
          <span className="bg-gray-200 px-4 py-2 rounded-lg">Express.js</span>
          <span className="bg-yellow-200 px-4 py-2 rounded-lg">MongoDB</span>
        </div>
      </section>
        
      {/* Empresa */}
      <footer className="text-center py-6 bg-gray-800 text-white mt-6">
        <p>Desarrollado por <strong>Sof-TI</strong></p>
      </footer>
    </div>
    </>
  );
}

export default HomePage;
