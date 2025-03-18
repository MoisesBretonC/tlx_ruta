import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest } from "../api/auth";
import Cookie from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para registrar usuario
  const signup = async (userData) => {
    try {
      const res = await registerRequest(userData);
      console.log("Register Response:", res.data);

      setUser({
        id: res.data.id,
        NombreUsuario: res.data.NombreUsuario,
        correo: res.data.correo,
        nombre: res.data.nombre,
        apellidoP: res.data.apellidoP,
        apellidoM: res.data.apellidoM,
        celular: res.data.celular,
      });

      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error en signup:", error);
      setErrors(error.response?.data?.message ? [error.response.data.message] : ["Error desconocido"]);
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  // Función para hacer login
  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log("Login Response:", res.data);

      if (res.data.token) {
        setIsAuthenticated(true);
        setUser({
          id: res.data.user.id,
          NombreUsuario: res.data.user.NombreUsuario,
          correo: res.data.user.correo,
          nombre: res.data.user.nombre,
          apellidoP: res.data.user.apellidoP,
          apellidoM: res.data.user.apellidoM,
          celular: res.data.user.celular,
        });
        localStorage.setItem("token", res.data.token);
        console.log("Token guardado en localStorage");
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Error en signin:", error);
      setErrors(error.response?.data?.message ? [error.response.data.message] : ["Error desconocido"]);
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  // Función para cerrar sesión
  const signout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
    console.log("Sesión cerrada correctamente.");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        signout,
        loading,
        user,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
