import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '/desafio_latam_G103_REACT_desafio_01/',
  plugins: [react()],
  resolve: {
    alias: {
      '@css': path.resolve(__dirname, './src/assets/css'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
})
