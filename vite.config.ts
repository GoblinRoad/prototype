import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'         // ✅ mkcert 플러그인 import
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    mkcert()                                     // ✅ 플러그인 등록
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '#': path.resolve(__dirname, './public'),
    },
  },
  server: {
    https: true,                                 // ✅ HTTPS 사용
    host: true,                                  // ✅ 0.0.0.0 의미 (외부 접속 허용)
  },
})