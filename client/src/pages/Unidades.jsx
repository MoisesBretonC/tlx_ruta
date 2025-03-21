import React from 'react';
import VehicleForm from '../components/UnidadesYOperadores/VehicleForm.jsx';

function Unidades() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Registrar Nueva Unidad</h1>

        {/* Aquí colocamos el formulario de VehicleForm */}
        <VehicleForm />
      </div>
    </div>
  );
}

export default Unidades;
