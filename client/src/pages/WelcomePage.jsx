import React from "react";
import LogoutButton from "../components/LogoutButton";
import Navbar from "../components/NavbarCons";

function WelcomePage() {
    return (
      <>
        <Navbar />
        <div className="p-4">
          <h1 className="text-2xl font-bold">Hola Polito</h1>
          <LogoutButton /> {/* No vayas a borrar esta madre Polito, pq si no mama..... es Para poder cerrar sesion y no mame el token*/}
        </div>
      </>
    );
  }
  
  export default WelcomePage;
