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

// 导入注册API
const register = async (userInfo: {
  username: string;
  password: string;
  email: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
}) => {
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

    const response = await fetch("http://127.0.0.1:8000/ai/register/", {
      method: "POST",
      credentials: 'include', // 允许携带 cookie
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-CSRFToken": csrfToken, // 添加 CSRF token
      },
      body: new URLSearchParams(userInfo),
    });

    const data = await response.json();
    console.log("后端返回：", data);

    if (data.status === "ok") {
      alert("注册成功！");
      router.push('/login');
    } else {
      alert(`注册失败：${data.msg}`);
    }
  } catch (error) {
    console.error("请求出错：", error);
  }
};

const router = useRouter();
const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const email = ref('');
const age = ref('');
const gender = ref('男');
const height = ref('');
const weight = ref('');
const loading = ref(false);

const handleRegister = async () => {
  if (!username.value || !password.value || !email.value) {
    alert('请填写必填项（用户名、密码、邮箱）');
    return;
  }
  
  if (password.value !== confirmPassword.value) {
    alert('两次输入的密码不一致');
    return;
  }
  
  loading.value = true;
  try {
    await register({
      username: username.value,
      password: password.value,
      email: email.value,
      age: age.value,
      gender: gender.value,
      height: height.value,
      weight: weight.value
    });
  } finally {
    loading.value = false;
  }
};

const goToLogin = () => {
  router.push('/login');
};
</script>

<template>
  <div class="register-container">
    <div class="register-box">
      <h2>用户注册</h2>
      <div class="register-form">
        <div class="form-group">
          <label for="username">用户名 <span class="required">*</span></label>
          <input 
            type="text" 
            id="username" 
            v-model="username" 
            placeholder="请输入用户名"
            :disabled="loading"
          />
        </div>
        
        <div class="form-group">
          <label for="password">密码 <span class="required">*</span></label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            placeholder="请输入密码"
            :disabled="loading"
          />
        </div>
        
        <div class="form-group">
          <label for="confirmPassword">确认密码 <span class="required">*</span></label>
          <input 
            type="password" 
            id="confirmPassword" 
            v-model="confirmPassword" 
            placeholder="请再次输入密码"
            :disabled="loading"
          />
        </div>
        
        <div class="form-group">
          <label for="email">邮箱 <span class="required">*</span></label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            placeholder="请输入邮箱"
            :disabled="loading"
          />
        </div>
        
        <div class="form-row">
          <div class="form-group half">
            <label for="age">年龄</label>
            <input 
              type="number" 
              id="age" 
              v-model="age" 
              placeholder="请输入年龄"
              :disabled="loading"
            />
          </div>
          
          <div class="form-group half">
            <label for="gender">性别</label>
            <select id="gender" v-model="gender" :disabled="loading">
              <option value="男">男</option>
              <option value="女">女</option>
              <option value="其他">其他</option>
            </select>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group half">
            <label for="height">身高 (cm)</label>
            <input 
              type="number" 
              id="height" 
              v-model="height" 
              placeholder="请输入身高"
              :disabled="loading"
            />
          </div>
          
          <div class="form-group half">
            <label for="weight">体重 (kg)</label>
            <input 
              type="number" 
              id="weight" 
              v-model="weight" 
              placeholder="请输入体重"
              :disabled="loading"
            />
          </div>
        </div>
        
        <button 
          class="register-btn" 
          @click="handleRegister" 
          :disabled="loading"
        >
          {{ loading ? '注册中...' : '注册' }}
        </button>
        
        <div class="login-link">
          已有账号? <a href="#" @click.prevent="goToLogin">立即登录</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.register-box {
  width: 500px;
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

.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.half {
  flex: 1;
  margin-bottom: 0;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #2c3e50;
}

.required {
  color: #f56c6c;
}

input[type="text"],
input[type="password"],
input[type="email"],
input[type="number"],
select {
  width: 100%;
  padding: 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s;
}

input:focus,
select:focus {
  border-color: #42b983;
  outline: none;
}

.register-btn {
  width: 100%;
  padding: 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
}

.register-btn:hover {
  background-color: #36a472;
}

.register-btn:disabled {
  background-color: #a0cfbe;
  cursor: not-allowed;
}

.login-link {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #606266;
}

.login-link a {
  color: #42b983;
  text-decoration: none;
}
</style>