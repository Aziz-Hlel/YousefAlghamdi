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
  
  envPrefix: 'VITE_',

  server: {
    port: 3000,
    
    host: true,  /* Allows external access from AWS */
    allowedHosts: ['ygp.ae', 'www.ygp.ae', 'localhost', '127.0.0.1',"http://localhost:3000"],
    strictPort: true, // Ensures the port is exactly 3000
    watch: {
      usePolling: true
    }

  },
  watch: {
    usePolling: true
  },

  resolve: {
    alias: {
      '@img': path.resolve(__dirname, 'src/assets/img'),
      '@src': path.resolve(__dirname, 'src')
    }
  },

  // added this for caddy reverse proxy
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // For better debugging in development
    sourcemap: true
  }


})
