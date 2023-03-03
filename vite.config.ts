import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@styles", replacement: "./src/assets/styles" },
      { find: "@components", replacement: "./src/components" },
    ],
  },
  css: {
    postcss: null,
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/styles/variables.scss";`,
      },
    },
  },
});
