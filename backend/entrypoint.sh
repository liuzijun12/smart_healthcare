#!/bin/bash
set -e

echo "⏳ 等待数据库准备就绪..."
while ! nc -z mysql 3306; do
  sleep 1
done
echo "✅ 数据库已就绪！"

echo "🔄 执行数据库迁移..."
python manage.py migrate --noinput

echo "👤 创建超级用户（如果不存在）..."
python manage.py shell << END
from django.contrib.auth import get_user_model
import os

User = get_user_model()
username = os.environ.get('DJANGO_SUPERUSER_USERNAME', 'admin')
password = os.environ.get('DJANGO_SUPERUSER_PASSWORD', 'admin123456')
email = os.environ.get('DJANGO_SUPERUSER_EMAIL', 'admin@example.com')

if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username, email, password)
    print(f"超级用户创建成功！用户名: {username}")
else:
    print(f"超级用户 {username} 已存在")
END

echo "🚀 启动 Django 服务..."
python manage.py runserver 0.0.0.0:8000

