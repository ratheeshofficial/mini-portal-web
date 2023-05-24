import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminLogin from "./pages/AdminLogin";
import ForgotPassword from "./pages/ForgotPassword";
import Student from "./pages/Student";
import ChangePassword from "./pages/ChangePassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/student" element={<Student />} />
        <Route path="/reset-password/:token" element={<ChangePassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
