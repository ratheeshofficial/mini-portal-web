import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./App";
import AppRoutes from "./routes/AppRoutes";
import AuthRoutes from "./routes/AuthRoutes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <MainRouter />
        {/* <AuthRoutes /> */}
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
