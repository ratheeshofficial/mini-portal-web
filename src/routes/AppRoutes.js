import React from "react";
import SidebarWithHeader from "../pages/components/Sidebar";
import { Route, Routes } from "react-router-dom";
import ForgotPassword from "../pages/ForgotPassword";
import Student from "../pages/Student";
import ChangePassword from "../pages/ChangePassword";
import Dashboard from "../pages/Dashboard";
import CreateAdmin from "../pages/CreateAdmin";
import AdminLogin from "../pages/AdminLogin";

const AppRoutes = () => {
  return (
    <SidebarWithHeader>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/student" element={<Student />} />
        <Route path="/reset-password/:token" element={<ChangePassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-admin" element={<CreateAdmin />} />
      </Routes>
    </SidebarWithHeader>
  );
};

export default AppRoutes;
