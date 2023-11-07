import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths()],
  optimizeDeps: {
    // https://github.com/radix-ui/primitives/discussions/1915
    include: ["react-dom"],
  },
  server: {
    proxy: {
      "/api": {
        target: "http://3.37.121.16:8080",
        changeOrigin: true,
      }
    }
  }
})
