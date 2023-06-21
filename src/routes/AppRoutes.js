import React from "react";
import SidebarWithHeader from "../pages/components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Student from "../pages/Student";
import Dashboard from "../pages/Dashboard";
import CreateAdmin from "../pages/CreateAdmin";

const AppRoutes = () => {
  return (
    <SidebarWithHeader>
      <Routes>
        <Route path="/student" element={<Student />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-admin" element={<CreateAdmin />} />
      </Routes>
    </SidebarWithHeader>
  );
};

export default AppRoutes;
