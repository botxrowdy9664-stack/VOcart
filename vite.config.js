import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative asset paths keep the build portable across GitHub Pages
  // and direct uploads to a domain root/subfolder.
  base: './',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
