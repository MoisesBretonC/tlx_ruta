import React from "react";
import LogoutButton from "../components/LogoutButton";

 
  export default function WelcomePage() {
    return (
      <div>
        <h1>Bienvenido</h1>
        <LogoutButton /> {/* No vayas a borrar esta madre Polito, pq si no mama..... es Para poder cerrar sesion y no mame el token*/}
        <p>Has iniciado sesión correctamente</p>
      </div>
    );
  }
  