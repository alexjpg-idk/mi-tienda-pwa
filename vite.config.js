import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Se actualiza sola cuando haces cambios
      manifest: {
        name: 'Mi Tienda Sencilla',
        short_name: 'MiTienda',
        description: 'Una tienda PWA hecha en clase',
        theme_color: '#ffffff',
       // ... parte de vite.config.js
        icons: [
  { src: 'pwa192x192.png', sizes: '192x192', type: 'image/png' },
  { src: 'pwa512x512.png', sizes: '512x512', type: 'image/png' }
        ]
// ...
      }
    })
  ],
})