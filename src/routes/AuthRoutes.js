import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLogin from "../pages/AdminLogin";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLogin />} />
    </Routes>
  );
};

export default AuthRoutes;
