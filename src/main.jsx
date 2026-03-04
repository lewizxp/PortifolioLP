// ─────────────────────────────────────────────────────────────────────────────
// main.jsx
// Ponto de entrada da aplicação React.
// Renderiza o componente App dentro do elemento #root do index.html.
// ─────────────────────────────────────────────────────────────────────────────
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
