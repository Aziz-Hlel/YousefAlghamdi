import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';


const root = path.resolve(__dirname, "src");


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    port: 70,
    allowedHosts: ['http://localhost:50',  '4d3e-197-15-72-205.ngrok-free.app'],  // change it l8er
    // hmr: {
    //   clientPort: 443, // Force WebSocket to use ngrok's HTTPS port
    //   protocol: 'wss'  // Force secure WebSocket (wss)
    // }
  },
  resolve: {
    alias: {
      '@img': path.resolve(__dirname, 'src/assets/img'),
      '@src': path.resolve(__dirname, 'src')
    }
  }

})
