import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLogin from "../pages/AdminLogin";
import ForgotPassword from "../pages/ForgotPassword";
import ChangePassword from "../pages/ChangePassword";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLogin />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ChangePassword />} />
    </Routes>
  );
};

export default AuthRoutes;
