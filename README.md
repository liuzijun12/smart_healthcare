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
- **数据库**: SQLite (开发环境)

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
- 医学影像识别 (待开发)
- 智能问诊助手

### 3. 数据统计与分析
- 就诊数据分析
- 疾病趋势预测
- 医疗资源使用情况

## 快速开始

### 环境准备
- Python 3.8+
- Node.js 16+
- npm 或 yarn

### 后端启动
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 前端启动
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