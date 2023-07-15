import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },

  server: {
    hmr: {
      overlay: true, // Enable overlay for displaying HMR errors in the browser
    },
  },
});
