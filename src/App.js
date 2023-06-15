import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminLogin from "./pages/AdminLogin";
import ForgotPassword from "./pages/ForgotPassword";
import Student from "./pages/Student";
import ChangePassword from "./pages/ChangePassword";
import Dashboard from "./pages/Dashboard";
import SidebarWithHeader from "./pages/components/Sidebar";
import CreateAdmin from "./pages/CreateAdmin";
import AppRoutes from "./routes/AppRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import { useState } from "react";
import { Button, Text } from "@chakra-ui/react";

function App() {
  const auth = JSON.parse(localStorage.getItem("loginDetails"));
  console.log("auth", auth);
  if (auth) {
    console.log("success");
    return <AppRoutes />;
  } else {
    console.log("error");
    return <AuthRoutes />;
  }
}

const MainRouter = () => {
  return <App />;
};

export default MainRouter;
