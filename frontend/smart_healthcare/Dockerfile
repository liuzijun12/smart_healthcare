# 构建阶段
FROM node:20-alpine as build-stage

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

# 构建应用（包含类型检查，确保代码质量）
RUN npm run build

# 生产阶段
FROM nginx:alpine as production-stage

# 配置 Alpine 国内镜像源（清华源）
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories

# 复制构建后的文件到 nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 创建 nginx 配置文件
RUN echo 'server {\n\
    listen 80;\n\
    server_name localhost;\n\
    \n\
    # 前端静态资源\n\
    location / {\n\
        root /usr/share/nginx/html;\n\
        index index.html;\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
    \n\
    # 代理后端 API 请求\n\
    location /api/ {\n\
        proxy_pass http://backend:8080;\n\
        proxy_set_header Host $host;\n\
        proxy_set_header X-Real-IP $remote_addr;\n\
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n\
        proxy_set_header X-Forwarded-Proto $scheme;\n\
        proxy_connect_timeout 60s;\n\
        proxy_send_timeout 60s;\n\
        proxy_read_timeout 60s;\n\
    }\n\
    \n\
    # 代理 Django Admin\n\
    location /admin/ {\n\
        proxy_pass http://backend:8080;\n\
        proxy_set_header Host $host;\n\
        proxy_set_header X-Real-IP $remote_addr;\n\
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n\
        proxy_set_header X-Forwarded-Proto $scheme;\n\
    }\n\
    \n\
    # 代理静态文件\n\
    location /static/ {\n\
        proxy_pass http://backend:8080;\n\
        proxy_set_header Host $host;\n\
    }\n\
    \n\
    # 开启 gzip 压缩\n\
    gzip on;\n\
    gzip_vary on;\n\
    gzip_min_length 1024;\n\
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/x-javascript application/xml+rss application/json;\n\
}\n\
' > /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]

