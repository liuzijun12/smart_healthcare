<script setup lang="ts">
import { ref } from 'vue'

// 健康知识文章数据
const healthArticles = ref([
  {
    id: 1,
    title: '科学搭配三餐，远离慢性疾病',
    description: '合理饮食搭配是预防慢性疾病的重要手段，本文将详细介绍如何科学搭配三餐。',
    author: '营养科·王医生',
    time: '3天前',
    category: '营养饮食',
    categoryColor: 'green',
    image: 'https://picsum.photos/300/200?random=1'
  },
  {
    id: 2,
    title: '每日30分钟运动，改善心血管健康',
    description: '适量的有氧运动对心血管系统有显著保护作用，让我们一起了解如何制定合适的运动计划。',
    author: '心血管科·李医生',
    time: '1周前',
    category: '运动健身',
    categoryColor: 'blue',
    image: 'https://picsum.photos/300/200?random=2'
  },
  {
    id: 3,
    title: '优质睡眠的秘诀: 打造完美睡眠环境',
    description: '良好的睡眠质量对身体健康至关重要，本文将分享如何创造有利于睡眠的环境和习惯。',
    author: '神经科·张医生',
    time: '5天前',
    category: '睡眠健康',
    categoryColor: 'purple',
    image: 'https://picsum.photos/300/200?random=3'
  }
])

// 健康讲座数据
const upcomingLecture = ref({
  title: '《糖尿病预防与管理》专题讲座',
  time: '2025年10月25日 14:00-16:00',
  description: '专业医生为您详细讲解糖尿病的预防措施和管理方法'
})

// 个性化健康计划数据
const fitnessPlan = ref({
  aerobic: {
    name: '快走30分钟',
    progress: 5,
    total: 7,
    status: '进行中'
  },
  strength: {
    name: '器械训练45分钟',
    progress: 2,
    total: 3,
    status: '进行中'
  }
})

const dietPlan = ref({
  protein: {
    name: '蛋白质摄入',
    current: 65,
    target: 80,
    unit: 'g'
  },
  vitamin: {
    name: '维生素摄入',
    status: '良好'
  }
})

// 热门问答数据
const hotQuestions = ref([
  {
    id: 1,
    doctor: {
      name: '李主任医师',
      department: '心血管科专家',
      avatar: 'https://i.pravatar.cc/50?img=1'
    },
    question: '高血压患者日常饮食需要注意什么?',
    answer: '高血压患者在日常饮食中应该控制钠盐摄入,多吃富含钾的食物如香蕉、橙子等,同时要限制饱和脂肪的摄入...',
    time: '2小时前',
    likes: 128,
    comments: 45,
    category: '心血管',
    categoryColor: 'green'
  },
  {
    id: 2,
    doctor: {
      name: '王副主任',
      department: '营养科专家',
      avatar: 'https://i.pravatar.cc/50?img=4'
    },
    question: '糖尿病患者如何制定合理的运动计划?',
    answer: '糖尿病患者运动前需要检查血糖水平,建议选择中等强度的有氧运动,如快走、游泳等,每次运动30-45分钟...',
    time: '5小时前',
    likes: 96,
    comments: 32,
    category: '营养健康',
    categoryColor: 'blue'
  }
])

// 健康数据监测
const healthData = ref({
  heartRate: {
    value: 72,
    unit: 'bpm',
    status: '正常',
    time: '2分钟前'
  },
  steps: {
    value: 8542,
    unit: '步',
    status: '目标达成',
    time: '今日'
  },
  watchStatus: 'Apple Watch 已连接'
})

// 方法
const handleUploadData = () => {
  console.log('上传健康数据')
}

const handleStartAnalysis = () => {
  console.log('开始健康分析')
}

const handleBookLecture = () => {
  console.log('预约讲座')
}

const handleViewReport = () => {
  console.log('查看报告')
}

const handleAskQuestion = () => {
  console.log('立即提问')
}

const handleGetAdvice = () => {
  console.log('获取建议')
}
</script>

<template>
  <div class="homepage">
    <!-- 顶部导航 -->
    <header class="header">
      <div class="header-content">
        <div class="logo">
          <div class="logo-icon">❤️</div>
          <div class="logo-content">
            <div class="logo-subtitle">智能医疗系统</div>
            <div class="logo-text">健康智慧平台</div>
          </div>
        </div>
        <nav class="nav">
          <a href="#" class="nav-link">首页</a>
          <a href="#" class="nav-link">专家问答</a>
          <a href="#" class="nav-link">健康分析报告</a>
          <a href="#" class="nav-link">个人健康数据</a>
          <a href="#" class="nav-link">AI 健康管理</a>
          <a href="#" class="nav-link">健康知识分享</a>
        </nav>
        <div class="header-actions">
          <button class="action-btn">患者管理</button>
          <button class="action-btn">AI 辅诊</button>
          <div class="user-info">
            <img src="https://i.pravatar.cc/40?img=2" alt="用户头像" class="user-avatar">
            <span class="user-name">张医生</span>
            <span class="dropdown-icon">▼</span>
          </div>
        </div>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main class="main-content">
      <!-- Hero 区域 -->
      <section class="hero-section">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">
              <span class="title-main">智能健康管理</span>
              <span class="title-accent">从数据开始</span>
            </h1>
            <p class="hero-description">
              通过 AI 智能分析您的健康数据,获得个性化的健康建议和专业医生指导,让健康管理变得更加科学和便捷。
            </p>
            <div class="hero-buttons">
              <button class="btn-primary" @click="handleUploadData">
                立即上传健康数据
              </button>
              <button class="btn-secondary" @click="handleStartAnalysis">
                开始健康分析
              </button>
            </div>
          </div>
          <div class="hero-image">
            <div class="smartwatch-card">
              <div class="watch-screen">
                <div class="watch-header">Valliimat</div>
                <div class="heart-rate">73</div>
                <div class="pulse-line">～～～～～～</div>
                <div class="watch-data">
                  <span>VAD: 1</span>
                  <span>DRET</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 核心功能区域 -->
      <section class="features-section">
        <div class="section-header">
          <h2 class="section-title">核心功能</h2>
          <p class="section-subtitle">全方位的健康管理解决方案</p>
        </div>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon green">
              <span class="icon">📊</span>
            </div>
            <h3 class="feature-title">健康分析报告</h3>
            <p class="feature-description">
              上传您的健康数据,AI 将为您生成详细的健康分析报告,帮助您了解身体状况。
            </p>
            <a href="#" class="feature-link" @click="handleViewReport">查看报告 →</a>
          </div>
          <div class="feature-card">
            <div class="feature-icon blue">
              <span class="icon">💬</span>
            </div>
            <h3 class="feature-title">智能问答平台</h3>
            <p class="feature-description">
              与专家和社区用户互动,提问健康相关问题,获得专业回答和建议。
            </p>
            <a href="#" class="feature-link" @click="handleAskQuestion">立即提问 →</a>
          </div>
          <div class="feature-card">
            <div class="feature-icon purple">
              <span class="icon">🤖</span>
            </div>
            <h3 class="feature-title">AI 健康建议</h3>
            <p class="feature-description">
              基于您的健康数据,AI 为您提供个性化的运动、饮食和生活方式建议。
            </p>
            <a href="#" class="feature-link" @click="handleGetAdvice">获取建议 →</a>
          </div>
        </div>
      </section>

      <!-- 健康知识推荐 -->
      <section class="knowledge-section">
        <div class="section-header">
          <h2 class="section-title">健康知识推荐</h2>
          <a href="#" class="view-more">查看更多 →</a>
        </div>
        <div class="articles-grid">
          <div 
            v-for="article in healthArticles" 
            :key="article.id" 
            class="article-card"
          >
            <div class="article-image">
              <img :src="article.image" :alt="article.title">
              <div class="article-category" :class="article.categoryColor">
                {{ article.category }}
              </div>
            </div>
            <div class="article-content">
              <h3 class="article-title">{{ article.title }}</h3>
              <p class="article-description">{{ article.description }}</p>
              <div class="article-meta">
                <span class="article-author">{{ article.author }}</span>
                <span class="article-time">{{ article.time }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 即将举办的健康讲座 -->
      <section class="lecture-section">
        <div class="lecture-card">
          <div class="lecture-icon">📅</div>
          <div class="lecture-content">
            <h3 class="lecture-title">即将举办的健康讲座</h3>
            <h4 class="lecture-topic">{{ upcomingLecture.title }}</h4>
            <p class="lecture-time">{{ upcomingLecture.time }}</p>
            <button class="btn-lecture" @click="handleBookLecture">立即预约</button>
          </div>
        </div>
      </section>

      <!-- 个性化健康计划 -->
      <section class="health-plan-section">
        <div class="section-header">
          <h2 class="section-title">个性化健康计划</h2>
          <p class="section-subtitle">基于您的健康数据，为您量身定制健康方案</p>
        </div>
        <div class="plan-content">
          <div class="fitness-plan">
            <h3 class="plan-title">个性化健身计划</h3>
            <div class="plan-item">
              <div class="plan-icon blue">🏃</div>
              <div class="plan-details">
                <span class="plan-name">{{ fitnessPlan.aerobic.name }}</span>
                <span class="plan-status">{{ fitnessPlan.aerobic.status }}</span>
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: (fitnessPlan.aerobic.progress / fitnessPlan.aerobic.total) * 100 + '%' }"></div>
                </div>
                <span class="progress-text">{{ fitnessPlan.aerobic.progress }}/{{ fitnessPlan.aerobic.total }}天</span>
              </div>
            </div>
            <div class="plan-item">
              <div class="plan-icon purple">💪</div>
              <div class="plan-details">
                <span class="plan-name">{{ fitnessPlan.strength.name }}</span>
                <span class="plan-status">{{ fitnessPlan.strength.status }}</span>
                <div class="progress-bar">
                  <div class="progress-fill purple" :style="{ width: (fitnessPlan.strength.progress / fitnessPlan.strength.total) * 100 + '%' }"></div>
                </div>
                <span class="progress-text">{{ fitnessPlan.strength.progress }}/{{ fitnessPlan.strength.total }}天</span>
              </div>
            </div>
          </div>
          <div class="diet-plan">
            <div class="plan-header">
              <h3 class="plan-title">个性化饮食计划</h3>
              <span class="weekly-goal">本周目标</span>
            </div>
            <div class="diet-item">
              <span class="diet-name">{{ dietPlan.protein.name }}</span>
              <div class="diet-progress">
                <div class="progress-bar green">
                  <div class="progress-fill" :style="{ width: (dietPlan.protein.current / dietPlan.protein.target) * 100 + '%' }"></div>
                </div>
                <span class="progress-text">{{ dietPlan.protein.current }}{{ dietPlan.protein.unit }}/{{ dietPlan.protein.target }}{{ dietPlan.protein.unit }}</span>
              </div>
            </div>
            <div class="diet-item">
              <span class="diet-name">{{ dietPlan.vitamin.name }}</span>
              <div class="diet-progress">
                <div class="progress-bar blue">
                  <div class="progress-fill" style="width: 100%"></div>
                </div>
                <span class="progress-text">{{ dietPlan.vitamin.status }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.homepage {
  min-height: 100vh;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
  padding: 0;
}

/* 确保所有元素都能正确显示 */
* {
  box-sizing: border-box;
}

/* 主要内容区域 */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
}

/* 顶部导航 */
.header {
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-content {
  display: flex;
  flex-direction: column;
}

.logo-subtitle {
  font-size: 0.8rem;
  color: #999;
  line-height: 1;
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: #4CAF50;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: white;
}

.logo-text {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: #666;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #4CAF50;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.action-btn {
  background: transparent;
  color: #4CAF50;
  border: 2px solid #4CAF50;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.action-btn:hover {
  background: #4CAF50;
  color: white;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.user-name {
  font-weight: 500;
  color: #2c3e50;
}

.dropdown-icon {
  color: #666;
  font-size: 0.8rem;
}

/* Hero 区域 */
.hero-section {
  background: linear-gradient(135deg, #e8f5e8 0%, #f0f8ff 100%);
  padding: 6rem 2rem;
  position: relative;
  overflow: hidden;
  flex: 1;
  display: flex;
  align-items: center;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="%234CAF50" opacity="0.1"/><circle cx="80" cy="30" r="1.5" fill="%232196F3" opacity="0.1"/><circle cx="60" cy="70" r="1" fill="%239C27B0" opacity="0.1"/></svg>');
  opacity: 0.3;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;
  width: 100%;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.title-main {
  color: #2c3e50;
  display: block;
}

.title-accent {
  color: #4CAF50;
  display: block;
}

.hero-description {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
}

.btn-primary {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary:hover {
  background: #45a049;
  transform: translateY(-2px);
}

.btn-secondary {
  background: white;
  color: #4CAF50;
  border: 2px solid #4CAF50;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-secondary:hover {
  background: #4CAF50;
  color: white;
}

.hero-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.smartwatch-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transform: rotate(-5deg);
  position: relative;
}

.watch-screen {
  background: #1a1a1a;
  color: white;
  padding: 1.5rem;
  border-radius: 15px;
  text-align: center;
  min-width: 200px;
}

.watch-header {
  font-size: 0.8rem;
  opacity: 0.7;
  margin-bottom: 0.5rem;
}

.heart-rate {
  font-size: 2.5rem;
  font-weight: bold;
  margin: 1rem 0;
}

.pulse-line {
  font-size: 1.2rem;
  margin: 1rem 0;
  opacity: 0.8;
}

.watch-data {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  opacity: 0.7;
}

/* 核心功能区域 */
.features-section {
  padding: 4rem 2rem;
  background: white;
  flex: 1;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #666;
}

.features-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 1.5rem;
}

.feature-icon.green {
  background: #e8f5e8;
  color: #4CAF50;
}

.feature-icon.blue {
  background: #e3f2fd;
  color: #2196F3;
}

.feature-icon.purple {
  background: #f3e5f5;
  color: #9C27B0;
}

.feature-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.feature-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.feature-link {
  color: #4CAF50;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s;
}

.feature-link:hover {
  color: #45a049;
}

/* 健康知识推荐 */
.knowledge-section {
  padding: 4rem 2rem;
  background: #f8f9fa;
  flex: 1;
}

.knowledge-section .section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
}

.view-more {
  color: #4CAF50;
  text-decoration: none;
  font-weight: 600;
}

.articles-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.article-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.article-card:hover {
  transform: translateY(-5px);
}

.article-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-category {
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
}

.article-category.green {
  background: #4CAF50;
}

.article-category.blue {
  background: #2196F3;
}

.article-category.purple {
  background: #9C27B0;
}

.article-content {
  padding: 1.5rem;
}

.article-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.8rem;
  line-height: 1.4;
}

.article-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #999;
}

/* 健康讲座 */
.lecture-section {
  padding: 2rem;
  background: white;
}

.lecture-card {
  max-width: 1200px;
  margin: 0 auto;
  background: linear-gradient(135deg, #e8f5e8 0%, #f0f8ff 100%);
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
}

.lecture-icon {
  font-size: 3rem;
  color: #4CAF50;
}

.lecture-content {
  flex: 1;
}

.lecture-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.lecture-topic {
  font-size: 1.2rem;
  font-weight: 600;
  color: #4CAF50;
  margin-bottom: 0.5rem;
}

.lecture-time {
  color: #666;
  margin-bottom: 1rem;
}

.btn-lecture {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-lecture:hover {
  background: #45a049;
}

/* 个性化健康计划 */
.health-plan-section {
  padding: 4rem 2rem;
  background: #f8f9fa;
  flex: 1;
}

.plan-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.fitness-plan,
.diet-plan {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.plan-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.plan-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.plan-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.plan-icon.blue {
  background: #e3f2fd;
  color: #2196F3;
}

.plan-icon.purple {
  background: #f3e5f5;
  color: #9C27B0;
}

.plan-details {
  flex: 1;
}

.plan-name {
  font-weight: 600;
  color: #2c3e50;
  display: block;
  margin-bottom: 0.5rem;
}

.plan-status {
  font-size: 0.9rem;
  color: #4CAF50;
  font-weight: 600;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  margin: 0.5rem 0;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #4CAF50;
  border-radius: 4px;
  transition: width 0.3s;
}

.progress-fill.purple {
  background: #9C27B0;
}

.progress-text {
  font-size: 0.9rem;
  color: #666;
}

.plan-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.weekly-goal {
  background: #e3f2fd;
  color: #2196F3;
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.diet-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.diet-name {
  font-weight: 600;
  color: #2c3e50;
}

.diet-progress {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.progress-bar.green .progress-fill {
  background: #4CAF50;
}

.progress-bar.blue .progress-fill {
  background: #2196F3;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .header-content {
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .nav {
    order: 3;
    width: 100%;
    justify-content: center;
    margin-top: 1rem;
  }
}

@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-buttons {
    flex-direction: column;
  }
  
  .plan-content {
    grid-template-columns: 1fr;
  }
  
  .lecture-card {
    flex-direction: column;
    text-align: center;
  }
  
  .header-actions {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .action-btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 3rem 1rem;
  }
  
  .hero-title {
    font-size: 1.8rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .features-grid,
  .articles-grid {
    grid-template-columns: 1fr;
  }
}
</style>
