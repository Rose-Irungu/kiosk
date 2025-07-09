import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  esbuild: {
    target: 'esnext', // Ensure top-level await works
  },
  build: {
    chunkSizeWarningLimit: 1000, // Prevent warning if chunks are large
    rollupOptions: {
      output: {
        manualChunks: {
          // Split major libraries into their own chunks
          react: ['react', 'react-dom'],
          shadcn: ['@/components/ui'], // You can be more specific if needed
          
          lucide: ['lucide-react'],
        },
      },
    },
  },
})
