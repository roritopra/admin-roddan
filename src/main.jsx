import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "@material-tailwind/react";
import { HashRouter } from "react-router-dom";
import { AuthContext } from "./auth/AuthContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <ThemeProvider>
        <NextUIProvider>
          <AuthContext>
            <App />
          </AuthContext>
        </NextUIProvider>
      </ThemeProvider>
    </HashRouter>
  </React.StrictMode>
);
