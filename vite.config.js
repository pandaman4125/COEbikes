import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()], // Use the Vue.js plugin
  build: {
    assetsDir: '', // Set assetsDir to an empty string
    rollupOptions: {
      input: {
        main: 'index.html', // Entry point for HTML
        app: 'src/index.ts', // Entry point for TypeScript
      },
      output: {
        entryFileNames: 'index.js', // Use [name] placeholder for dynamic file names
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src', // Add an alias for convenience
    },
  }
})
