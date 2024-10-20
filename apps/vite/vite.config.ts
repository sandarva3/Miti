import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const apiURL = process.env.API_URL || 'http://localhost:8787'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8787',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
