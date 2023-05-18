// vite.config.ts
import { defineConfig } from "file:///home/homam/robota-front-app/node_modules/vite/dist/node/index.js";
import react from "file:///home/homam/robota-front-app/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: "./src" },
      { find: "@styles", replacement: "./src/assets/styles" },
      { find: "@images", replacement: "./src/assets/images" },
      { find: "@components", replacement: "./src/components" },
      { find: "@shared", replacement: "./src/shared" }
    ]
  },
  css: {
    devSourcemap: true,
    postcss: null,
    modules: {
      localsConvention: "camelCaseOnly"
    },
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/assets/styles/_colors.scss";
          @import "./src/assets/styles/_breakpoints.scss";
          @import "./src/assets/styles/_variables.scss";
        `
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9ob21hbS9yb2JvdGEtZnJvbnQtYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9ob21hbS9yb2JvdGEtZnJvbnQtYXBwL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2hvbWFtL3JvYm90YS1mcm9udC1hcHAvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0KCldLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IFtcbiAgICAgIHsgZmluZDogXCJAXCIsIHJlcGxhY2VtZW50OiBcIi4vc3JjXCIgfSxcbiAgICAgIHsgZmluZDogXCJAc3R5bGVzXCIsIHJlcGxhY2VtZW50OiBcIi4vc3JjL2Fzc2V0cy9zdHlsZXNcIiB9LFxuICAgICAgeyBmaW5kOiBcIkBpbWFnZXNcIiwgcmVwbGFjZW1lbnQ6IFwiLi9zcmMvYXNzZXRzL2ltYWdlc1wiIH0sXG4gICAgICB7IGZpbmQ6IFwiQGNvbXBvbmVudHNcIiwgcmVwbGFjZW1lbnQ6IFwiLi9zcmMvY29tcG9uZW50c1wiIH0sXG4gICAgICB7IGZpbmQ6IFwiQHNoYXJlZFwiLCByZXBsYWNlbWVudDogXCIuL3NyYy9zaGFyZWRcIiB9LFxuICAgIF0sXG4gIH0sXG4gIGNzczoge1xuICAgIGRldlNvdXJjZW1hcDogdHJ1ZSxcbiAgICBwb3N0Y3NzOiBudWxsLFxuICAgIG1vZHVsZXM6IHtcbiAgICAgIGxvY2Fsc0NvbnZlbnRpb246IFwiY2FtZWxDYXNlT25seVwiLFxuICAgIH0sXG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgc2Nzczoge1xuICAgICAgICBhZGRpdGlvbmFsRGF0YTogYFxuICAgICAgICAgIEBpbXBvcnQgXCIuL3NyYy9hc3NldHMvc3R5bGVzL19jb2xvcnMuc2Nzc1wiO1xuICAgICAgICAgIEBpbXBvcnQgXCIuL3NyYy9hc3NldHMvc3R5bGVzL19icmVha3BvaW50cy5zY3NzXCI7XG4gICAgICAgICAgQGltcG9ydCBcIi4vc3JjL2Fzc2V0cy9zdHlsZXMvX3ZhcmlhYmxlcy5zY3NzXCI7XG4gICAgICAgIGAsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBc1EsU0FBUyxvQkFBb0I7QUFDblMsT0FBTyxXQUFXO0FBR2xCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxFQUFFLE1BQU0sS0FBSyxhQUFhLFFBQVE7QUFBQSxNQUNsQyxFQUFFLE1BQU0sV0FBVyxhQUFhLHNCQUFzQjtBQUFBLE1BQ3RELEVBQUUsTUFBTSxXQUFXLGFBQWEsc0JBQXNCO0FBQUEsTUFDdEQsRUFBRSxNQUFNLGVBQWUsYUFBYSxtQkFBbUI7QUFBQSxNQUN2RCxFQUFFLE1BQU0sV0FBVyxhQUFhLGVBQWU7QUFBQSxJQUNqRDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNILGNBQWM7QUFBQSxJQUNkLFNBQVM7QUFBQSxJQUNULFNBQVM7QUFBQSxNQUNQLGtCQUFrQjtBQUFBLElBQ3BCO0FBQUEsSUFDQSxxQkFBcUI7QUFBQSxNQUNuQixNQUFNO0FBQUEsUUFDSixnQkFBZ0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BS2xCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
