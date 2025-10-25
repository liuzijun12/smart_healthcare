// API 请求封装
import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios'

// 创建 axios 实例
const api = axios.create({  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 允许携带 cookie
})

// 从 cookie 中获取 CSRF token
function getCsrfTokenFromCookie(): string | null {
  const name = 'csrftoken'
  const cookies = document.cookie.split(';')
  for (let cookie of cookies) {
    const trimmedCookie = cookie.trim()
    if (trimmedCookie.startsWith(name + '=')) {
      return decodeURIComponent(trimmedCookie.substring(name.length + 1))
    }
  }
  return null
}

// 获取 CSRF token（从服务器）
export async function fetchCsrfToken(): Promise<string> {
  try {
    const response = await axios.get('http://127.0.0.1:8000/ai/csrf/', {
      withCredentials: true,
    })
    return response.data.csrfToken
  } catch (error) {
    console.error('获取 CSRF token 失败:', error)
    throw error
  }
}

// 请求拦截器
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // 添加认证 token
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // 为 POST/PUT/DELETE 等修改数据的请求添加 CSRF token
    if (config.method && ['post', 'put', 'delete', 'patch'].includes(config.method.toLowerCase())) {
      let csrfToken = getCsrfTokenFromCookie()
      
      // 如果 cookie 中没有 token，则从服务器获取
      if (!csrfToken) {
        try {
          csrfToken = await fetchCsrfToken()
        } catch (error) {
          console.error('无法获取 CSRF token')
        }
      }
      
      if (csrfToken && config.headers) {
        config.headers['X-CSRFToken'] = csrfToken
      }
    }
    
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // 处理未授权错误
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export default api