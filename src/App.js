import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import { useState } from "react";
import { useEffect } from "react";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log("isAuthenticated", isAuthenticated);

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("loginDetails"));
    setIsAuthenticated(!!auth); // Update the isAuthenticated state based on the authentication data
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <>
          <AppRoutes />
        </>
      ) : (
        <>
          <AuthRoutes />
        </>
      )}
    </>
  );
};

export default App;
