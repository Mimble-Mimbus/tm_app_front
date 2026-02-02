import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy()
  ],
  esbuild: {
    keepNames: true,
    supported: {
      'top-level-await': true
    },
    target: 'esnext'
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
      keepNames: true,
    },
    exclude: ['jeep-sqlite/loader', 'js-big-decimal']
  }
})
