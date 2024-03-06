import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ""),
        // secure: false,
      },
      "/auth/status": {
        target: "http://localhost:4000",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/auth/, ""),
        // secure: false,
      },
      "/auth/register": {
        target: "http://localhost:4000",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/auth/, ""),
        // secure: false,
      },
      "/auth/login": {
        target: "http://localhost:4000",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/auth/, ""),
        // secure: false,
      },
    },
  },
});
