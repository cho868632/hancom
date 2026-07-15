import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // 로컬 개발: 백엔드 Express 서버(:3001)로 /api 프록시
  server: {
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
});
