import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  ase: "/ISSP5-Front-End/",
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
})
