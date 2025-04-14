// context/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import { jwtDecode } from 'jwt-decode';

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
      setUser(res.data);
      setIsAuthenticated(true);
      setErrors([]);
      localStorage.setItem("token", res.data.token);
    } catch (error) {
      console.error("Error en signup:", error);
      setErrors(error.response?.data?.message || ["Error desconocido"]);
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  // Función para hacer login
  const signin = async (credentials) => {
    try {
      const res = await loginRequest(credentials);
      console.log("Login Response:", res.data);
      
      if (res.data.token) {
        const decoded = jwtDecode(res.data.token);
        setUser({
          ...decoded,
          ...res.data.user
        });
        setIsAuthenticated(true);
        localStorage.setItem("token", res.data.token);
      }
      return res.data.user.userType; // Retornamos el tipo de usuario
    } catch (error) {
      console.error("Error en signin:", error);
      setErrors(error.response?.data?.message || ["Error desconocido"]);
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    }
  };

  // Función para cerrar sesión
  const signout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  // Verificar autenticación al cargar
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await verifyTokenRequest();
          const decoded = jwtDecode(token);
          setUser({
            ...decoded,
            ...res.data
          });
          setIsAuthenticated(true);
        
        } catch (error) {
          signout();
        }
      }
      setLoading(false);
    };
    checkAuth();
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