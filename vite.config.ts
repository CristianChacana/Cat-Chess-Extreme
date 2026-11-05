import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // o el plugin que uses

export default defineConfig({
  plugins: [react()],
  base: '/Cat-Chess-Extreme/', // <--- AGREGA ESTA LÍNEA EXACTAMENTE ASÍ
})

