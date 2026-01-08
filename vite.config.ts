import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";

export default defineConfig({
  // Garante que os assets sejam buscados na raiz do domínio
  base: "/", 
  
  // O root indica onde está o index.html
  root: path.resolve(__dirname, "client"),
  
  plugins: [
    react(), 
    tailwindcss(), 
    jsxLocPlugin(), 
    vitePluginManusRuntime()
  ],
  
  resolve: {
    alias: {
      // Como o root já é a pasta 'client', o '@' deve apontar para 'src' diretamente
      "@": path.resolve(__dirname, "client/src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  
  build: {
    // O dist deve ficar na raiz do projeto, fora da pasta client
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
  
  server: {
    port: 3000,
    host: true,
    allowedHosts: ["all"], // Simplificado para evitar bloqueios de host
  },
});