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

# 复制构建后的文件到 nginx（使用默认配置）
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 暴露端口
EXPOSE 80

# 启动 nginx（使用默认配置）
CMD ["nginx", "-g", "daemon off;"]

