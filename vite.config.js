import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import viteOfflineIcons from './vite-plugin-offline-icons'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteOfflineIcons()],
  base: '/',
  server: {
    host: true,
    port: 5173
  }
})
