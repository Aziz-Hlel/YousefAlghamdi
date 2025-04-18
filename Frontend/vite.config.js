import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';


const root = path.resolve(__dirname, "src");

const ngrokUrl = '4c8f-41-225-176-145.ngrok-free.app';
// const ngrokUrl = 'localhost:50';
/*  */
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    port: 3000,
    host: '0.0.0.0',  /* Allows external access from AWS */
    // allowedHosts: ['ygp.ae'],
    strictPort: true, // Ensures the port is exactly 3000
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
