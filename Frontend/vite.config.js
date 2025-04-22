import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';


const root = path.resolve(__dirname, "src");

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    port: 3000,

    host: true,  /* Allows external access from AWS */
    allowedHosts: ['ygp.ae', 'www.ygp.ae', 'client'],
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
