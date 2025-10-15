# 使用官方 Python 运行时作为父镜像
FROM python:3.10-slim

# 设置工作目录
WORKDIR /app

# 设置环境变量
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    DJANGO_SETTINGS_MODULE=smart_healthcare.settings

# 安装系统依赖（MySQL 客户端库需要）
RUN apt-get update && apt-get install -y \
    gcc \
    default-libmysqlclient-dev \
    pkg-config \
    netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

# 复制依赖文件
COPY requirements.txt .

# 配置 pip 使用国内镜像源（清华源）
RUN pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple && \
    pip config set install.trusted-host pypi.tuna.tsinghua.edu.cn

# 安装 Python 依赖
RUN pip install --no-cache-dir -r requirements.txt

# 复制项目文件
COPY . .

# 创建静态文件目录
RUN mkdir -p staticfiles

# 收集静态文件（如果失败也继续）
RUN python manage.py collectstatic --noinput || true

# 暴露端口
EXPOSE 8000

# 创建启动脚本
RUN echo '#!/bin/bash\n\
set -e\n\
\n\
echo "⏳ 等待数据库准备就绪..."\n\
while ! nc -z mysql 3306; do\n\
  sleep 1\n\
done\n\
echo "✅ 数据库已就绪！"\n\
\n\
echo "🔄 执行数据库迁移..."\n\
python manage.py migrate --noinput\n\
\n\
echo "👤 创建超级用户（如果不存在）..."\n\
python manage.py shell << END\n\
from django.contrib.auth import get_user_model\n\
User = get_user_model()\n\
if not User.objects.filter(username="admin").exists():\n\
    User.objects.create_superuser("admin", "admin@example.com", "admin123456")\n\
    print("超级用户创建成功！用户名: admin, 密码: admin123456")\n\
else:\n\
    print("超级用户已存在")\n\
END\n\
\n\
echo "🚀 启动 Django 服务..."\n\
python manage.py runserver 0.0.0.0:8000\n\
' > /app/entrypoint.sh && chmod +x /app/entrypoint.sh

# 运行启动脚本
CMD ["/app/entrypoint.sh"]

