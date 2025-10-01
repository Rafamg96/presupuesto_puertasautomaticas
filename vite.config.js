import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/presupuesto_puertasautomaticas/', // Cambiar por el nombre de tu repositorio en GitHub
})
