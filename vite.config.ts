import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Deployed at the root of nihal467.github.io
export default defineConfig({
  base: "/",
  plugins: [react()],
});
