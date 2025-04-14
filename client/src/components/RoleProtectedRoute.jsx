import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const RoleProtectedRoute = ({ allowedRoles, redirectTo = "/unauthorized" }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Cargando...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.userType)) return <Navigate to={redirectTo} replace />;

  return <Outlet />;
};