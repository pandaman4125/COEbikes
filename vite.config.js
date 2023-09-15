import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dotenv from 'dotenv';
import dsv from '@rollup/plugin-dsv'

dotenv.config(); // Load environment variables from .env file

export default defineConfig({
  plugins: [vue(),  dsv()], // Use the Vue.js plugin
  build: {
    assetsDir: 'assets', // Set assetsDir to an empty string
    rollupOptions: {
      input: {
        main: 'index.html', // Entry point for HTML
        app: 'src/index.ts', // Entry point for TypeScript
      },
      output: {
        entryFileNames: '[name].js', // Use [name] placeholder for dynamic file names
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src', // Add an alias for convenience
    },
  }
})
