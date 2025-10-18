import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量
  // 从当前目录向上两级查找 .env 文件（项目根目录）
  const envDir = fileURLToPath(new URL('../../', import.meta.url))
  const env = loadEnv(mode, envDir, '')
  
  // 从环境变量中读取允许的主机列表
  const allowedHosts = env.FRONTEND_ALLOWED_HOSTS
    ? env.FRONTEND_ALLOWED_HOSTS.split(',').map(host => host.trim())
    : ['localhost', '127.0.0.1']

  return {
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
      host: '0.0.0.0', // 允许外部访问（支持通过域名访问前端页面）
      port: 5173,
      strictPort: true,
      
      // 允许访问的主机名列表（从环境变量读取）
      allowedHosts: allowedHosts,
      
      hmr: {
        clientPort: 5173, // 热模块替换端口
      },
      
      // CORS 配置：允许跨域请求
      cors: true,
      
      proxy: {
        '/api': {
          target: 'http://backend:8080',
          changeOrigin: true,
        },
      },
    },
  }
})
