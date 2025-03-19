import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./app.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// "!" assertion null operator, se encarga de decirle a TypeScript que el valor no será nulo y que no se preocupe por eso.