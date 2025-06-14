import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: ["es2015", "edge88", "firefox78", "chrome87", "safari12"], // Universal compatibility
    minify: "terser",
    cssTarget: "chrome61", // CSS compatibility
    rollupOptions: {
      output: {
        manualChunks: undefined,
        entryFileNames: "assets/[name].[hash].js",
        chunkFileNames: "assets/[name].[hash].js",
        assetFileNames: "assets/[name].[hash].[ext]",
      },
    },
    sourcemap: false, // Smaller files for mobile
    chunkSizeWarningLimit: 1000,
  },
  base: "./", // GitHub Pages compatibility
  server: {
    host: true,
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  esbuild: {
    target: "es2015", // Maximum compatibility
    supported: {
      "top-level-await": false, // Safari compatibility
    },
  },
});
