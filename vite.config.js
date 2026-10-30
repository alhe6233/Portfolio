import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' → der Build funktioniert in jedem Unterordner (z. B. GitHub Pages /Portfolio/)
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    chunkSizeWarningLimit: 1500,
  },
})
