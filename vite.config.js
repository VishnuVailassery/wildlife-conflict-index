import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/wildlife-conflict-index/',
  optimizeDeps: {
    include: ['react-simple-maps', 'prop-types']
  }
})
