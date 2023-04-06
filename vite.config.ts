import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: "./src" },
      { find: "@styles", replacement: "./src/assets/styles" },
      { find: "@images", replacement: "./src/assets/images" },
      { find: "@components", replacement: "./src/components" },
      { find: "@shared", replacement: "./src/shared" },
    ],
  },
  css: {
    devSourcemap: true,
    postcss: null,
    modules: {
      localsConvention: "camelCaseOnly",
    },
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/assets/styles/_colors.scss";
          @import "./src/assets/styles/_breakpoints.scss";
          @import "./src/assets/styles/_variables.scss";
        `,
      },
    },
  },
});
