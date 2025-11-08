import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  //What plugins are being used
  plugins: [react()],

  //Server settings
  server: {
    host: '0.0.0.0',    //Makes the dev server accessible from outside the container
    port: 5173,         //Port that the server is run on
    hmr: {
      clientPort: 5173  //The port where the browser should check for HMR updates
    },
    watch: {
      usePolling: true, //Ensures hot updates as files are changed even inside the container
    },
    proxy: {            //Proxies API requests to the backend hosted through docker
      '/api': {
        target: 'http://backend:8000',  //requests are captured and redirected here before reaching the netowork layer, avoiding CORS issues
        changeOrigin: true,
        secure: false,
        ws: true
      }
    }
  }
})
