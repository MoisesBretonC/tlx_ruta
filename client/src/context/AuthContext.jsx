import { createContext, useState, useContext, useEffect } from "react";
import { loginRequest } from "../api/auth";
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

  // Función para registrar usuario (signup)
  const signup = async (userData) => {
    try {
      const res = await registerRequest(userData);
      console.log("Register Response:", res.data);

      setUser(res.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error en signup:", error);

      if (error.response && error.response.data && error.response.data.message) {
        setErrors([error.response.data.message]);
      } else {
        setErrors(["Error desconocido"]);
      }

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
        setUser(res.data.user);
        localStorage.setItem("token", res.data.token);
        console.log("Token guardado en localStorage");
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Error en signin:", error);

      if (error.response && error.response.data && error.response.data.message) {
        setErrors([error.response.data.message]);
      } else {
        setErrors(["Error desconocido"]);
      }

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
        signup,  // 🔥 Agregado signup aquí
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
