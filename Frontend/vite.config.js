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
  },
  resolve: {
    alias: {
      '@img': path.resolve(__dirname, 'src/assets/img')
    }
  }

})
