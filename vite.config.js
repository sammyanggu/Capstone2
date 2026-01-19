import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.svg'],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  },
  base: '/',
  // --- DAGDAG NA SETTINGS MULA DITO ---
  build: {
  // Pinapababa ang load sa memory sa pamamagitan ng pag-disable ng features na hindi kailangan sa dev build
  minify: 'esbuild', // Mas mabilis at mas tipid sa RAM kaysa terser
  cssCodeSplit: true,
  rollupOptions: {
    output: {
      // Pinaghihiwalay ang malalaking chunks
      manualChunks: (id) => {
        if (id.includes('node_modules')) return 'vendor';
      }
    }
  }
}
})