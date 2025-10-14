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

## Docker 部署

项目支持通过 Docker 进行一键部署，包含以下服务：

- MySQL: 数据库服务
- Adminer: 数据库管理工具
- MinIO: 对象存储服务（用于图片存储）
- Django Backend: 后端 API 服务
- Vue.js Frontend: 前端应用服务

### 部署步骤

1. 确保已安装 Docker 和 Docker Compose
2. 在 `backend/.env` 文件中配置环境变量
3. 进入 `backend/docker` 目录
4. 运行以下命令启动所有服务：
   ```bash
   docker-compose up -d
   ```

### 访问地址

- 前端应用: http://localhost
- 后端 API: http://localhost:8000
- 数据库管理: http://localhost:8080
- MinIO 控制台: http://localhost:9001

## 快速开始

### 环境准备
- Python 3.8+
- Node.js 16+
- npm 或 yarn
- Docker & Docker Compose (可选，用于容器化部署)

### 后端启动 (本地开发)
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 前端启动 (本地开发)
```bash
cd frontend/smart_healthcare
npm install
npm run dev
```

## 项目结构

```
smart_healthcare/
├── backend/           # Django后端服务
│   ├── app_ai/        # AI功能模块
│   │   └── best_models/  # 预训练模型权重文件
│   ├── docker/        # Docker 配置文件
│   └── smart_healthcare/  # 主配置
├── frontend/          # Vue前端应用
│   └── smart_healthcare/  # 前端源码
└── README.md          # 项目说明文档
```

## 开发指南

### 代码规范
- 后端遵循 PEP8 标准
- 前端使用 ESLint 和 Prettier 进行代码格式化

### 提交规范
- 使用 conventional commits 规范提交信息

## 贡献者

- [你的名字] - 初始版本开发

## 许可证

本项目采用 MIT 许可证，详情请见 LICENSE 文件。