import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage";
import HRDashboard from "./pages/HRDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import WelcomePage from "./pages/WelcomePage";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
  const { token } = useSelector((s) => s.auth);

  return (
    <div>
      {token && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <RoleRouter />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

const RoleRouter = () => {
  const { user } = useSelector((s) => s.auth);
  if (!user) return null;
  switch (user.role) {
    case "HR":
      return <HRDashboard />;
    case "Manager":
      return <ManagerDashboard />;
    default:
      return <EmployeeDashboard />;
  }
};

export default App;
