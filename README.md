# 智能医疗系统 (Smart Healthcare)

## 项目简介

智能医疗系统是一个结合了人工智能技术与医疗服务的综合性平台。该系统旨在提高医疗服务效率，改善患者体验，并为医护人员提供智能化辅助工具。

## 技术架构

### 后端 (Backend)
- **语言**: Python
- **框架**: Django
- **AI组件**: 
  - 机器学习模型用于疾病预测
  - 自然语言处理用于病历分析
- **数据库**: MySQL (生产环境) / SQLite (开发环境)

### 前端 (Frontend)
- **框架**: Vue.js 3 + TypeScript
- **构建工具**: Vite
- **UI组件库**: Element Plus (待集成)
- **状态管理**: Pinia
- **路由**: Vue Router

## 功能模块

### 1. 患者管理系统
- 患者信息录入与查询
- 病历管理
- 预约挂号

### 2. AI 辅诊系统
- 症状分析与初步诊断建议
- 医学影像识别
- 智能问诊助手

### 3. 数据统计与分析
- 就诊数据分析
- 疾病趋势预测
- 医疗资源使用情况

## AI 模型权重文件

项目中包含了预训练的 AI 模型权重文件，用于医学影像识别功能：

- `eyes_best_model.pth` - 眼部疾病识别模型
- `tooth_best_model.pt` - 牙科疾病识别模型

这些模型文件位于 `backend/app_ai/best_models/` 目录下，在部署时需要确保这些文件正确放置在相应位置。

## 🚀 自动化部署（推荐）

项目已配置 **GitHub Actions** 自动化部署，支持推送代码后自动部署到服务器。

### 部署流程

1. 将代码推送到 GitHub 的 `main` 或 `master` 分支
2. GitHub Actions 自动触发部署
3. 服务器自动拉取代码、构建镜像、重启服务

### 快速配置

**服务器端：**
```bash
# 1. 安装 Docker 和 Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 2. 克隆项目
git clone https://github.com/your-username/smart_healthcare.git
cd smart_healthcare

# 3. 配置环境变量（重要！）
cp backend/example.env backend/.env
vim backend/.env  # 修改配置

# 必须修改以下配置项：
# - MYSQL_ROOT_PASSWORD=<设置强密码>
# - DB_PASSWORD=<设置数据库密码>
# - SECRET_KEY=<生成Django密钥>
# - MINIO_ROOT_PASSWORD=<设置MinIO密码>
# - DEBUG=False (生产环境)
# - ALLOWED_HOSTS=<你的域名或IP>
```

**GitHub 端：**

在仓库 `Settings` → `Secrets and variables` → `Actions` 中添加：

| Secret 名称 | 说明 | 示例 |
|------------|------|------|
| `SERVER_HOST` | 服务器 IP | `192.168.1.100` |
| `SERVER_USER` | SSH 用户名 | `root` |
| `SSH_PRIVATE_KEY` | SSH 私钥 | `-----BEGIN...` |
| `DEPLOY_PATH` | 部署路径 | `/home/deploy/smart_healthcare` |

**触发部署：**
```bash
git add .
git commit -m "update: 更新功能"
git push origin main  # 自动触发部署
```

📖 详细部署文档请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🐳 Docker 手动部署

项目支持通过 Docker 进行部署，包含以下服务：

- **MySQL**: 数据库服务
- **Adminer**: 数据库管理工具
- **MinIO**: 对象存储服务（用于图片存储）
- **Django Backend**: 后端 API 服务
- **Vue.js Frontend**: 前端应用服务

### 本地开发/测试部署

```bash
# 1. 配置环境变量
cp .env.example .env

# 2. 启动所有服务（在根目录运行，明确指定 env 文件）
docker-compose -f docker/docker-compose.yaml --env-file .env up -d

# 3. 查看服务状态
docker-compose -f docker/docker-compose.yaml --env-file .env ps

# 4. 查看日志
docker-compose -f docker/docker-compose.yaml --env-file .env logs -f
```

### 访问地址

- **前端应用**: http://localhost:5173
- **后端 API**: http://localhost:8080
- **后端管理**: http://localhost:8080/admin
- **数据库管理**: http://localhost:8081
- **MinIO 控制台**: http://localhost:9001

## 💻 本地开发环境

### 环境准备
- Python 3.10+
- Node.js 20+
- Docker & Docker Compose（推荐）

### 方式一：使用 Docker（推荐）

```bash
# 1. 克隆项目
git clone https://github.com/your-username/smart_healthcare.git
cd smart_healthcare

# 2. 配置环境变量
cp .env.example .env

# 3. 启动所有服务（在根目录运行，明确指定 env 文件）
docker-compose -f docker/docker-compose.yaml --env-file .env up -d

# 4. 访问应用
# 前端: http://localhost:5173
# 后端: http://localhost:8080/admin
```

### 方式二：本地开发模式

**后端启动：**
```bash
cd backend

# 安装依赖
pip install -r requirements.txt

# 配置环境变量（会自动读取根目录的 .env）
# 或者使用 SQLite 进行本地开发

# 数据库迁移
python manage.py migrate

# 创建超级用户
python manage.py createsuperuser

# 启动服务
python manage.py runserver
```

**前端启动：**
```bash
cd frontend/smart_healthcare

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:5173
```

## 📁 项目结构

```
smart_healthcare/
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Actions 自动化部署配置
├── backend/                   # Django 后端服务
│   ├── app_ai/                # AI 功能模块
│   │   ├── best_models/       # 预训练模型权重文件
│   │   │   ├── eyes_best_model.pth
│   │   │   └── tooth_best_model.pt
│   │   └── views.py           # AI 诊断接口
│   ├── smart_healthcare/      # Django 主配置
│   │   └── settings.py        # 配置文件（从根目录 .env 读取）
│   ├── Dockerfile             # 后端 Docker 镜像配置
│   ├── requirements.txt       # Python 依赖
│   └── manage.py
├── frontend/                  # Vue 前端应用
│   └── smart_healthcare/
│       ├── src/               # 前端源码
│       │   ├── views/         # 页面组件
│       │   ├── router/        # 路由配置
│       │   └── api/           # API 接口封装
│       ├── Dockerfile         # 前端 Docker 镜像配置
│       └── package.json
├── docker/                    # Docker 配置目录
│   ├── docker-compose.yaml    # Docker Compose 配置（包含所有服务）
│   ├── mysql_data/            # MySQL 数据持久化
│   └── minio_data/            # MinIO 数据持久化
├── .env                       # 环境变量配置（不提交到 Git）
├── .env.example               # 环境变量模板
├── .gitignore                 # Git 忽略文件配置
├── DEPLOYMENT.md              # 详细部署文档
└── README.md                  # 项目说明文档
```

## 📊 常用命令

### Docker 相关
```bash
# 查看服务状态（在根目录运行，明确指定 env 文件）
docker-compose -f docker/docker-compose.yaml --env-file .env ps

# 查看日志
docker-compose -f docker/docker-compose.yaml --env-file .env logs -f
docker-compose -f docker/docker-compose.yaml --env-file .env logs -f backend
docker-compose -f docker/docker-compose.yaml --env-file .env logs -f frontend

# 重启服务
docker-compose -f docker/docker-compose.yaml --env-file .env restart backend
docker-compose -f docker/docker-compose.yaml --env-file .env restart frontend

# 停止服务
docker-compose -f docker/docker-compose.yaml --env-file .env down

# 重新构建并启动
docker-compose -f docker/docker-compose.yaml --env-file .env up -d --build

# 进入容器
docker exec -it smart_healthcare_backend bash

# 在容器内执行命令
docker exec -it smart_healthcare_backend python manage.py migrate
docker exec -it smart_healthcare_backend python manage.py createsuperuser
```

### Django 命令
```bash
# 数据库迁移
python manage.py makemigrations
python manage.py migrate

# 创建超级用户
python manage.py createsuperuser

# 收集静态文件
python manage.py collectstatic

# 运行开发服务器
python manage.py runserver

# 检查环境变量配置
cd backend && python check_env.py
```

### 前端命令
```bash
cd frontend/smart_healthcare

# 开发模式
npm run dev

# 构建生产版本
npm run build

# 代码检查
npm run lint

# 运行测试
npm run test:unit
```

## 🔧 开发指南

### 代码规范
- **后端**: 遵循 PEP8 标准
- **前端**: 使用 ESLint 和 Prettier 进行代码格式化

### 提交规范
使用 Conventional Commits 规范：
```bash
feat: 新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式调整
refactor: 代码重构
test: 测试相关
chore: 构建/工具链相关
```

### 环境变量说明

所有环境变量统一在 `backend/.env` 文件中配置：

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `SECRET_KEY` | Django 密钥 | 开发密钥 |
| `DEBUG` | 调试模式 | `True` |
| `ALLOWED_HOSTS` | 允许的主机 | `localhost,127.0.0.1,*` |
| `DB_ENGINE` | 数据库引擎 | `django.db.backends.mysql` |
| `DB_NAME` | 数据库名 | `smart_healthcare` |
| `DB_USER` | 数据库用户 | `healthcare_user` |
| `DB_PASSWORD` | 数据库密码 | `healthcare_password` |
| `DB_HOST` | 数据库主机 | `mysql` |
| `MINIO_ROOT_USER` | MinIO 用户名 | `minioadmin` |
| `MINIO_ROOT_PASSWORD` | MinIO 密码 | `minioadmin123456` |

## 🛡️ 安全注意事项

**生产环境部署前必须修改：**
- ✅ `SECRET_KEY`: 生成新的随机密钥
- ✅ `DEBUG`: 设置为 `False`
- ✅ `ALLOWED_HOSTS`: 设置为实际域名/IP
- ✅ 所有默认密码（数据库、MinIO、管理员等）

## 📝 相关文档

- [部署文档](./DEPLOYMENT.md) - 详细的自动化部署指南
- [API 文档](http://localhost:8080/api/docs) - 后端 API 接口文档
- [前端路由](./frontend/smart_healthcare/src/router/index.ts) - 前端路由配置

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 📞 技术支持

如果遇到问题：
1. 查看 [DEPLOYMENT.md](./DEPLOYMENT.md) 中的常见问题
2. 查看 GitHub Issues
3. 查看容器日志：`docker-compose -f docker/docker-compose.yaml --env-file .env logs -f`

## 📄 许可证

本项目采用 MIT 许可证。详见 [LICENSE](./LICENSE) 文件。

---

⭐ 如果这个项目对你有帮助，欢迎 Star！