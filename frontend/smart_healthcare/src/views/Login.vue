<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// 获取 CSRF token 的函数
async function getCsrfToken(): Promise<string> {
  // 第一步：调用 GET 接口设置 cookie
  const response = await fetch('http://127.0.0.1:8000/ai/csrf/', {
    method: 'GET',
    credentials: 'include', // 关键：允许携带并存储 cookie
  })
  const data = await response.json()
  console.log('CSRF Token 获取成功:', data.csrfToken)
  
  // 等待一下确保 cookie 被设置
  await new Promise(resolve => setTimeout(resolve, 100))
  
  return data.csrfToken
}

// 从 cookie 中读取 CSRF token
function getCsrfTokenFromCookie(): string | null {
  const name = 'csrftoken'
  const cookies = document.cookie.split(';')
  for (let cookie of cookies) {
    const trimmedCookie = cookie.trim()
    if (trimmedCookie.startsWith(name + '=')) {
      const token = decodeURIComponent(trimmedCookie.substring(name.length + 1))
      console.log('从 Cookie 中读取的 CSRF Token:', token)
      return token
    }
  }
  console.log('Cookie 中没有找到 CSRF Token')
  return null
}

// 导入登录API
const login = async (username: string, password: string) => {
  try {
    // 先获取 CSRF token
    console.log('开始获取 CSRF Token...')
    let csrfToken = getCsrfTokenFromCookie()
    
    if (!csrfToken) {
      console.log('Cookie 中没有 token，从服务器获取...')
      csrfToken = await getCsrfToken()
      // 再次尝试从 cookie 中读取
      const cookieToken = getCsrfTokenFromCookie()
      if (cookieToken) {
        csrfToken = cookieToken
      }
    }
    
    console.log('最终使用的 CSRF Token:', csrfToken)
    console.log('当前 Cookies:', document.cookie)

    const response = await fetch("http://127.0.0.1:8000/ai/login/", {
      method: "POST",
      credentials: 'include', // 允许携带 cookie
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-CSRFToken": csrfToken, // 添加 CSRF token
      },
      body: new URLSearchParams({
        username: username,
        password: password,
      }),
    });
    const data = await response.json();
    console.log("后端返回：", data);

    if (data.status === 'ok') {
      alert('登录成功');
      router.push('/');
    } else {
      alert(`登录失败：${data.msg}`);
    }
  } catch (error) {
    console.log("请求出错：", error);
  }
};

const router = useRouter();
const username = ref('');
const password = ref('');
const rememberMe = ref(false);
const loading = ref(false);

const handleLogin = async () => {
  if (!username.value || !password.value) {
    alert('请输入用户名和密码');
    return;
  }
  
  loading.value = true;
  try {
    await login(username.value, password.value);
  } finally {
    loading.value = false;
  }
};

const goToRegister = () => {
  router.push('/register');
};
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <h2>智能医疗系统</h2>
      <div class="login-form">
        <div class="form-group">
          <label for="username">用户名</label>
          <input 
            type="text" 
            id="username" 
            v-model="username" 
            placeholder="请输入用户名"
            :disabled="loading"
          />
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            placeholder="请输入密码"
            :disabled="loading"
          />
        </div>
        <div class="form-options">
          <div class="remember-me">
            <input type="checkbox" id="remember" v-model="rememberMe" />
            <label for="remember">记住我</label>
          </div>
          <a href="#" class="forgot-password">忘记密码?</a>
        </div>
        <button 
          class="login-btn" 
          @click="handleLogin" 
          :disabled="loading"
        >
          {{ loading ? '登录中...' : '登录' }}
        </button>
        <div class="register-link">
          还没有账号? <a href="#" @click.prevent="goToRegister">立即注册</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.login-box {
  width: 400px;
  padding: 40px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #42b983;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #2c3e50;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s;
}

input[type="text"]:focus,
input[type="password"]:focus {
  border-color: #42b983;
  outline: none;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.remember-me {
  display: flex;
  align-items: center;
}

.remember-me input {
  margin-right: 8px;
}

.forgot-password {
  color: #409eff;
  text-decoration: none;
  font-size: 14px;
}

.login-btn {
  width: 100%;
  padding: 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-btn:hover {
  background-color: #36a472;
}

.login-btn:disabled {
  background-color: #a0cfbe;
  cursor: not-allowed;
}

.register-link {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #606266;
}

.register-link a {
  color: #42b983;
  text-decoration: none;
}
</style>