import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "@material-tailwind/react";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </ThemeProvider>
  </React.StrictMode>
);
