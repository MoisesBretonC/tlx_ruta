// App.js
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';
import { RoleProtectedRoute } from "./components/RoleProtectedRoute";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/AdminDashboard";
import ConcessionaireDashboard from "./pages/ConcessionaireDashboard";
import OperatorDashboard from "./pages/OperatorDashboard";
import Unauthorized from "./pages/Unauthorized";
import HomePage from "./pages/HomePage";



function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/home" element={<HomePage />}/>

        {/* Rutas protegidas por rol */}
        <Route element={<RoleProtectedRoute allowedRoles={['monitor']} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        <Route element={<RoleProtectedRoute allowedRoles={['concessionaire']} />}>
          <Route path="/concessionaire" element={<ConcessionaireDashboard />} />
        </Route>

        <Route element={<RoleProtectedRoute allowedRoles={['operator']} />}>
          <Route path="/operator" element={<OperatorDashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;