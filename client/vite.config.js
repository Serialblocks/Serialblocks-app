import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      "~": path.resolve(__dirname, "./"),
    },
  },
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3003/",
        changeOrigin: true,
        ws: true,
      },
    },
  },
  preview: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3003/",
        changeOrigin: true,
        ws: true,
      },
    },
  },
});
