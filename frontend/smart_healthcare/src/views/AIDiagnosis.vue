<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// AI功能模块数据
const aiModules = ref([
  {
    id: 1,
    title: '智能症状分析',
    description: '基于AI的初步症状分析与诊断建议',
    icon: '🔍',
    color: 'blue',
    features: ['症状识别', '风险评估', '建议方案'],
    status: 'active'
  },
  {
    id: 2,
    title: '医学影像识别',
    description: 'AI辅助医学影像分析与诊断',
    icon: '📸',
    color: 'green',
    features: ['X光片分析', 'CT扫描', 'MRI诊断'],
    status: 'active'
  },
  {
    id: 3,
    title: '智能问诊助手',
    description: 'AI智能问诊助手服务',
    icon: '💬',
    color: 'purple',
    features: ['在线咨询', '症状询问', '健康建议'],
    status: 'active'
  },
  {
    id: 4,
    title: '健康评估报告',
    description: '全面的健康状态评估报告',
    icon: '📊',
    color: 'orange',
    features: ['健康评分', '风险分析', '改善建议'],
    status: 'coming'
  },
  {
    id: 5,
    title: '用药建议系统',
    description: '基于症状的智能用药建议',
    icon: '💊',
    color: 'red',
    features: ['药物推荐', '剂量建议', '注意事项'],
    status: 'coming'
  },
  {
    id: 6,
    title: '报告智能解读',
    description: '医学检查报告智能解读',
    icon: '📋',
    color: 'teal',
    features: ['报告分析', '异常标记', '专业解读'],
    status: 'coming'
  }
])

// 使用统计
const usageStats = ref({
  totalDiagnosis: 1256,
  accuracyRate: 96.8,
  avgResponseTime: '2.3秒',
  userSatisfaction: 4.8
})

// 最近诊断记录
const recentDiagnosis = ref([
  {
    id: 1,
    patient: '张**',
    symptoms: '头痛、发热',
    diagnosis: '感冒',
    confidence: 92,
    time: '2小时前',
    status: 'completed'
  },
  {
    id: 2,
    patient: '李**',
    symptoms: '胸痛、气短',
    diagnosis: '疑似心绞痛',
    confidence: 88,
    time: '5小时前',
    status: 'pending'
  },
  {
    id: 3,
    patient: '王**',
    symptoms: '腹痛、恶心',
    diagnosis: '胃炎',
    confidence: 95,
    time: '1天前',
    status: 'completed'
  }
])

// 方法
const handleModuleClick = (module: any) => {
  if (module.status === 'active') {
    console.log(`启动${module.title}`)
    // 这里可以添加具体的功能逻辑
  } else {
    console.log(`${module.title}功能即将上线`)
  }
}

const handleBackToHome = () => {
  router.push('/home')
}

const handleViewDetails = (record: any) => {
  console.log('查看诊断详情:', record)
}
</script>

<template>
  <div class="ai-diagnosis">
    <!-- 顶部导航 -->
    <header class="header">
      <div class="header-content">
        <button class="back-btn" @click="handleBackToHome">
          <span class="back-icon">←</span>
          <span>返回首页</span>
        </button>
        <div class="header-title">
          <h1>AI 智能辅诊系统</h1>
          <p>基于先进AI技术的医疗诊断辅助平台</p>
        </div>
        <div class="header-actions">
          <button class="action-btn">使用记录</button>
          <button class="action-btn">系统设置</button>
        </div>
      </div>
    </header>

    <!-- 主要内容 -->
    <main class="main-content">
      <!-- 系统概览 -->
      <section class="overview-section">
        <div class="overview-content">
          <div class="overview-text">
            <h2>AI 智能诊断，让医疗更精准</h2>
            <p>集成多种AI算法，提供准确的症状分析和诊断建议，辅助医生做出更精准的诊断决策</p>
            <div class="overview-stats">
              <div class="stat-item">
                <div class="stat-number">{{ usageStats.totalDiagnosis.toLocaleString() }}</div>
                <div class="stat-label">累计诊断</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">{{ usageStats.accuracyRate }}%</div>
                <div class="stat-label">准确率</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">{{ usageStats.avgResponseTime }}</div>
                <div class="stat-label">平均响应</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">{{ usageStats.userSatisfaction }}/5</div>
                <div class="stat-label">用户满意度</div>
              </div>
            </div>
          </div>
          <div class="overview-visual">
            <div class="ai-brain">
              <div class="brain-core">🧠</div>
              <div class="brain-pulse"></div>
              <div class="brain-pulse delay-1"></div>
              <div class="brain-pulse delay-2"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- AI功能模块 -->
      <section class="modules-section">
        <div class="section-header">
          <h2>AI 功能模块</h2>
          <p>选择您需要的AI诊断服务</p>
        </div>
        <div class="modules-grid">
          <div 
            v-for="module in aiModules" 
            :key="module.id"
            class="module-card"
            :class="[module.color, module.status]"
            @click="handleModuleClick(module)"
          >
            <div class="module-header">
              <div class="module-icon">
                <span>{{ module.icon }}</span>
              </div>
              <div class="module-status" :class="module.status">
                {{ module.status === 'active' ? '可用' : '即将上线' }}
              </div>
            </div>
            <div class="module-content">
              <h3 class="module-title">{{ module.title }}</h3>
              <p class="module-description">{{ module.description }}</p>
              <div class="module-features">
                <span 
                  v-for="feature in module.features" 
                  :key="feature"
                  class="feature-tag"
                >
                  {{ feature }}
                </span>
              </div>
            </div>
            <div class="module-action">
              <button 
                class="module-btn" 
                :class="module.status"
                :disabled="module.status === 'coming'"
              >
                {{ module.status === 'active' ? '立即使用' : '敬请期待' }}
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- 最近诊断记录 -->
      <section class="records-section">
        <div class="section-header">
          <h2>最近诊断记录</h2>
          <a href="#" class="view-all">查看全部</a>
        </div>
        <div class="records-list">
          <div 
            v-for="record in recentDiagnosis" 
            :key="record.id"
            class="record-item"
            @click="handleViewDetails(record)"
          >
            <div class="record-avatar">
              <div class="avatar-circle">{{ record.patient.charAt(0) }}</div>
            </div>
            <div class="record-content">
              <div class="record-header">
                <h4 class="record-patient">{{ record.patient }}</h4>
                <div class="record-confidence">
                  <span class="confidence-label">置信度</span>
                  <span class="confidence-value">{{ record.confidence }}%</span>
                </div>
              </div>
              <div class="record-details">
                <div class="detail-row">
                  <span class="detail-label">症状:</span>
                  <span class="detail-value">{{ record.symptoms }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">诊断:</span>
                  <span class="detail-value">{{ record.diagnosis }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">时间:</span>
                  <span class="detail-value">{{ record.time }}</span>
                </div>
              </div>
            </div>
            <div class="record-status" :class="record.status">
              {{ record.status === 'completed' ? '已完成' : '待确认' }}
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.ai-diagnosis {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

/* 顶部导航 */
.header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: none;
  color: #4CAF50;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.3s;
  padding: 0.5rem 1rem;
  border-radius: 8px;
}

.back-btn:hover {
  color: #45a049;
  background: rgba(76, 175, 80, 0.1);
}

.back-icon {
  font-size: 1.2rem;
}

.header-title h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header-title p {
  color: #666;
  margin: 0.2rem 0 0 0;
  font-size: 0.9rem;
}

.header-actions {
  display: flex;
  gap: 1rem;
}

.action-btn {
  background: transparent;
  color: #4CAF50;
  border: 2px solid #4CAF50;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.action-btn:hover {
  background: #4CAF50;
  color: white;
  transform: translateY(-2px);
}

/* 主要内容 */
.main-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

/* 系统概览 */
.overview-section {
  background: white;
  border-radius: 20px;
  padding: 3rem;
  margin-bottom: 3rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.overview-section::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  opacity: 0.1;
  transform: translate(50%, -50%);
}

.overview-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

.overview-text h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.overview-text p {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.overview-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.stat-item {
  text-align: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  border: 1px solid #e0e0e0;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #4CAF50;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #666;
  font-weight: 600;
  font-size: 0.9rem;
}

.overview-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.ai-brain {
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.brain-core {
  font-size: 4rem;
  z-index: 2;
  animation: pulse 2s infinite;
}

.brain-pulse {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid #4CAF50;
  border-radius: 50%;
  animation: ripple 2s infinite;
}

.brain-pulse.delay-1 {
  animation-delay: 0.5s;
}

.brain-pulse.delay-2 {
  animation-delay: 1s;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

@keyframes ripple {
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  100% {
    transform: scale(1.4);
    opacity: 0;
  }
}

/* 功能模块 */
.modules-section {
  margin-bottom: 3rem;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2.2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.section-header p {
  color: #666;
  font-size: 1.1rem;
}

.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.module-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  border: 2px solid transparent;
}

.module-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.module-card.active {
  border-color: #4CAF50;
}

.module-card.coming {
  opacity: 0.7;
  cursor: not-allowed;
}

.module-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #4CAF50, #45a049);
}

.module-card.blue::before {
  background: linear-gradient(90deg, #2196F3, #1976D2);
}

.module-card.green::before {
  background: linear-gradient(90deg, #4CAF50, #45a049);
}

.module-card.purple::before {
  background: linear-gradient(90deg, #9C27B0, #7B1FA2);
}

.module-card.orange::before {
  background: linear-gradient(90deg, #FF9800, #F57C00);
}

.module-card.red::before {
  background: linear-gradient(90deg, #F44336, #D32F2F);
}

.module-card.teal::before {
  background: linear-gradient(90deg, #009688, #00796B);
}

.module-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.module-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.module-card.blue .module-icon {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
}

.module-card.green .module-icon {
  background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
}

.module-card.purple .module-icon {
  background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%);
}

.module-card.orange .module-icon {
  background: linear-gradient(135deg, #fff3e0 0%, #ffcc80 100%);
}

.module-card.red .module-icon {
  background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
}

.module-card.teal .module-icon {
  background: linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%);
}

.module-status {
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.module-status.active {
  background: #e8f5e8;
  color: #4CAF50;
}

.module-status.coming {
  background: #fff3e0;
  color: #FF9800;
}

.module-content {
  margin-bottom: 1.5rem;
}

.module-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.8rem;
}

.module-description {
  color: #666;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.module-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.feature-tag {
  background: #f8f9fa;
  color: #666;
  padding: 0.3rem 0.6rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 500;
}

.module-action {
  text-align: center;
}

.module-btn {
  width: 100%;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.module-btn.active {
  background: #4CAF50;
  color: white;
}

.module-btn.active:hover {
  background: #45a049;
  transform: translateY(-2px);
}

.module-btn.coming {
  background: #e0e0e0;
  color: #999;
  cursor: not-allowed;
}

/* 诊断记录 */
.records-section {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.records-section .section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  text-align: left;
}

.view-all {
  color: #4CAF50;
  text-decoration: none;
  font-weight: 600;
}

.view-all:hover {
  color: #45a049;
}

.records-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.record-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid transparent;
}

.record-item:hover {
  background: #e9ecef;
  border-color: #4CAF50;
  transform: translateX(5px);
}

.record-avatar {
  flex-shrink: 0;
}

.avatar-circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.2rem;
}

.record-content {
  flex: 1;
}

.record-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
}

.record-patient {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
}

.record-confidence {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.confidence-label {
  color: #666;
  font-size: 0.9rem;
}

.confidence-value {
  background: #4CAF50;
  color: white;
  padding: 0.2rem 0.6rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
}

.record-details {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.detail-row {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.detail-label {
  color: #666;
  font-size: 0.8rem;
  font-weight: 500;
}

.detail-value {
  color: #2c3e50;
  font-size: 0.9rem;
  font-weight: 600;
}

.record-status {
  padding: 0.4rem 0.8rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  text-align: center;
}

.record-status.completed {
  background: #e8f5e8;
  color: #4CAF50;
}

.record-status.pending {
  background: #fff3e0;
  color: #FF9800;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .overview-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .overview-stats {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .overview-text h2 {
    font-size: 2rem;
  }
  
  .overview-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .modules-grid {
    grid-template-columns: 1fr;
  }
  
  .record-details {
    grid-template-columns: 1fr;
  }
  
  .record-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .records-section .section-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>