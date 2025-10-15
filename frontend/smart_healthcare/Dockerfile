# 使用 Node.js 镜像
FROM node:20-alpine

# 配置 Alpine 国内镜像源（清华源）
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories

# 设置工作目录
WORKDIR /app

# 复制 package 文件
COPY package*.json ./

# 配置 npm 使用国内镜像源（淘宝源）
RUN npm config set registry https://registry.npmmirror.com

# 安装依赖
RUN npm ci

# 复制项目文件
COPY . .

# 暴露 Vite 开发服务器端口
EXPOSE 5173

# 启动 Vite 开发服务器（监听所有网络接口）
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
