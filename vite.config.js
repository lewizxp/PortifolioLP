import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Configuração do Vite — bundler que compila e serve o projeto React
export default defineConfig({
  plugins: [react()],
});
