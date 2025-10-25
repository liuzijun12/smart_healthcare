// 获取 CSRF token 的函数
async function getCsrfToken(): Promise<string> {
  const response = await fetch('http://127.0.0.1:8000/ai/csrf/', {
    credentials: 'include', // 允许携带 cookie
  })
  const data = await response.json()
  return data.csrfToken
}

// 从 cookie 中读取 CSRF token
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

async function login(username:string,password:string){
  try{
    // 先获取 CSRF token
    let csrfToken = getCsrfTokenFromCookie()
    if (!csrfToken) {
      csrfToken = await getCsrfToken()
    }

    const response = await fetch("http://127.0.0.1:8000/ai/login/",{
      method:"POST",
      credentials: 'include', // 允许携带 cookie
      headers: {
        "Content-Type":"application/x-www-form-urlencoded",
        "X-CSRFToken": csrfToken, // 添加 CSRF token
      },
      body: new URLSearchParams({
        username:username,
        password:password,
      }),
    });
    const data = await response.json();
    console.log("后端返回：",data);

    if (data.status == 'ok'){
      alert('登陆成功');
    }
    else{
      alert(`登录失败：${data.msg}`);
    }
  }catch(error){
    console.log("请求出错：",error)
  }
}
