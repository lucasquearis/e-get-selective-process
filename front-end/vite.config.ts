/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // root: "src",
  define: {
    "process.env": {
      BD_URL_LOCAL: "http://localhost:8080/",
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 3000,
  },
  // @ts-ignore
  test: {
    globals: true,
    environment: "jsdom",
  },
});
