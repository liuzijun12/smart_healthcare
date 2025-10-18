import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    host: '0.0.0.0', // 允许外部访问
    port: 5173,
    strictPort: true,
    
    // 允许访问的主机名列表（写死配置）
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      'vue-smart-healthcare.code-review.fun',
      '.code-review.fun', // 允许所有 code-review.fun 子域名
    ],
    
    hmr: {
      clientPort: 5173,
    },
    
    cors: true,
    
    proxy: {
      '/api': {
        target: 'http://backend:8080',
        changeOrigin: true,
      },
    },
  },
})
