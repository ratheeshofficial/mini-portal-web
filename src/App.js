import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminLogin from "./pages/AdminLogin";
import ForgotPassword from "./pages/ForgotPassword";
import Student from "./pages/Student";
import ChangePassword from "./pages/ChangePassword";
import Dashboard from "./pages/Dashboard";
import SidebarWithHeader from "./pages/components/Sidebar";
import CreateAdmin from "./pages/CreateAdmin";

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
