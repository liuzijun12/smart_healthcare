<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 患者数据
const patients = ref([
  {
    id: 1,
    name: '张小明',
    age: 35,
    gender: '男',
    phone: '138****1234',
    email: 'zhang@example.com',
    lastVisit: '2024-01-15',
    nextAppointment: '2024-01-25',
    status: 'active',
    department: '心血管科',
    doctor: '李主任',
    diagnosis: '高血压',
    avatar: 'https://i.pravatar.cc/60?img=1',
    priority: 'high',
    notes: '需要定期监测血压'
  },
  {
    id: 2,
    name: '李小红',
    age: 28,
    gender: '女',
    phone: '139****5678',
    email: 'li@example.com',
    lastVisit: '2024-01-12',
    nextAppointment: '2024-01-20',
    status: 'pending',
    department: '妇科',
    doctor: '王医生',
    diagnosis: '月经不调',
    avatar: 'https://i.pravatar.cc/60?img=2',
    priority: 'medium',
    notes: '建议调整作息时间'
  },
  {
    id: 3,
    name: '王大华',
    age: 45,
    gender: '男',
    phone: '137****9012',
    email: 'wang@example.com',
    lastVisit: '2024-01-10',
    nextAppointment: '2024-02-01',
    status: 'completed',
    department: '骨科',
    doctor: '陈主任',
    diagnosis: '腰椎间盘突出',
    avatar: 'https://i.pravatar.cc/60?img=3',
    priority: 'high',
    notes: '需要物理治疗'
  },
  {
    id: 4,
    name: '陈小丽',
    age: 32,
    gender: '女',
    phone: '136****3456',
    email: 'chen@example.com',
    lastVisit: '2024-01-08',
    nextAppointment: '2024-01-22',
    status: 'active',
    department: '内分泌科',
    doctor: '刘医生',
    diagnosis: '糖尿病',
    avatar: 'https://i.pravatar.cc/60?img=4',
    priority: 'high',
    notes: '血糖控制良好'
  },
  {
    id: 5,
    name: '赵大伟',
    age: 50,
    gender: '男',
    phone: '135****7890',
    email: 'zhao@example.com',
    lastVisit: '2024-01-05',
    nextAppointment: '2024-01-30',
    status: 'pending',
    department: '呼吸科',
    doctor: '孙医生',
    diagnosis: '慢性支气管炎',
    avatar: 'https://i.pravatar.cc/60?img=5',
    priority: 'medium',
    notes: '戒烟建议'
  }
])

// 统计数据
const stats = ref({
  totalPatients: 1248,
  activePatients: 856,
  newPatients: 32,
  appointmentsToday: 18,
  avgWaitTime: '15分钟',
  satisfactionRate: 4.7
})

// 今日预约
const todayAppointments = ref([
  { 
    id: 1,
    time: '09:00', 
    patient: '张小明', 
    department: '心血管科', 
    doctor: '李主任',
    status: 'confirmed',
    type: '复诊'
  },
  { 
    id: 2,
    time: '10:30', 
    patient: '李小红', 
    department: '妇科', 
    doctor: '王医生',
    status: 'confirmed',
    type: '初诊'
  },
  { 
    id: 3,
    time: '14:00', 
    patient: '王大华', 
    department: '骨科', 
    doctor: '陈主任',
    status: 'pending',
    type: '复诊'
  },
  { 
    id: 4,
    time: '15:30', 
    patient: '陈小丽', 
    department: '内分泌科', 
    doctor: '刘医生',
    status: 'confirmed',
    type: '复诊'
  },
  { 
    id: 5,
    time: '16:00', 
    patient: '赵大伟', 
    department: '呼吸科', 
    doctor: '孙医生',
    status: 'pending',
    type: '初诊'
  }
])

// 搜索和筛选
const searchQuery = ref('')
const selectedStatus = ref('all')
const selectedDepartment = ref('all')
const selectedPriority = ref('all')

// 方法
const handleBackToHome = () => {
  router.push('/home')
}

const handleAddPatient = () => {
  console.log('添加新患者')
}

const handleViewPatient = (patient: any) => {
  console.log('查看患者详情:', patient.name)
}

const handleEditPatient = (patient: any) => {
  console.log('编辑患者信息:', patient.name)
}

const handleScheduleAppointment = (patient: any) => {
  console.log('为患者安排预约:', patient.name)
}

const handleDeletePatient = (patient: any) => {
  console.log('删除患者:', patient.name)
}

const filteredPatients = computed(() => {
  return patients.value.filter(patient => {
    const matchesSearch = patient.name.includes(searchQuery.value) || 
                         patient.phone.includes(searchQuery.value) ||
                         patient.diagnosis.includes(searchQuery.value) ||
                         patient.doctor.includes(searchQuery.value)
    const matchesStatus = selectedStatus.value === 'all' || patient.status === selectedStatus.value
    const matchesDepartment = selectedDepartment.value === 'all' || patient.department === selectedDepartment.value
    const matchesPriority = selectedPriority.value === 'all' || patient.priority === selectedPriority.value
    
    return matchesSearch && matchesStatus && matchesDepartment && matchesPriority
  })
})

const getStatusText = (status: string) => {
  const statusMap = {
    active: '在诊',
    pending: '待诊',
    completed: '已完成'
  }
  return statusMap[status] || status
}

const getStatusClass = (status: string) => {
  return `status-${status}`
}

const getPriorityClass = (priority: string) => {
  return `priority-${priority}`
}

const getPriorityText = (priority: string) => {
  const priorityMap = {
    high: '高',
    medium: '中',
    low: '低'
  }
  return priorityMap[priority] || priority
}
</script>

<template>
  <div class="patient-management">
    <!-- 顶部导航 -->
    <header class="header">
      <div class="header-content">
        <button class="back-btn" @click="handleBackToHome">
          <span class="back-icon">←</span>
          <span>返回首页</span>
        </button>
        <div class="header-title">
          <h1>患者管理系统</h1>
          <p>专业的患者信息管理平台</p>
        </div>
        <div class="header-actions">
          <button class="action-btn primary" @click="handleAddPatient">
            <span class="btn-icon">+</span>
            添加患者
          </button>
          <button class="action-btn">导出数据</button>
        </div>
      </div>
    </header>

    <!-- 主要内容 -->
    <main class="main-content">
      <!-- 统计概览 -->
      <section class="stats-section">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon total">👥</div>
            <div class="stat-content">
              <div class="stat-number">{{ stats.totalPatients.toLocaleString() }}</div>
              <div class="stat-label">总患者数</div>
              <div class="stat-trend">+12% 本月</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon active">🏥</div>
            <div class="stat-content">
              <div class="stat-number">{{ stats.activePatients }}</div>
              <div class="stat-label">在诊患者</div>
              <div class="stat-trend">+5% 本周</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon new">🆕</div>
            <div class="stat-content">
              <div class="stat-number">{{ stats.newPatients }}</div>
              <div class="stat-label">新增患者</div>
              <div class="stat-trend">+8% 今日</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon appointment">📅</div>
            <div class="stat-content">
              <div class="stat-number">{{ stats.appointmentsToday }}</div>
              <div class="stat-label">今日预约</div>
              <div class="stat-trend">{{ stats.avgWaitTime }}</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon satisfaction">⭐</div>
            <div class="stat-content">
              <div class="stat-number">{{ stats.satisfactionRate }}/5</div>
              <div class="stat-label">满意度</div>
              <div class="stat-trend">+0.2 本月</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 搜索和筛选 -->
      <section class="search-section">
        <div class="search-controls">
          <div class="search-box">
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="搜索患者姓名、电话、诊断或医生..."
              class="search-input"
            >
            <span class="search-icon">🔍</span>
          </div>
          <div class="filter-controls">
            <select v-model="selectedStatus" class="filter-select">
              <option value="all">全部状态</option>
              <option value="active">在诊</option>
              <option value="pending">待诊</option>
              <option value="completed">已完成</option>
            </select>
            <select v-model="selectedDepartment" class="filter-select">
              <option value="all">全部科室</option>
              <option value="心血管科">心血管科</option>
              <option value="妇科">妇科</option>
              <option value="骨科">骨科</option>
              <option value="内分泌科">内分泌科</option>
              <option value="呼吸科">呼吸科</option>
            </select>
            <select v-model="selectedPriority" class="filter-select">
              <option value="all">全部优先级</option>
              <option value="high">高优先级</option>
              <option value="medium">中优先级</option>
              <option value="low">低优先级</option>
            </select>
          </div>
        </div>
      </section>

      <!-- 患者列表和今日预约 -->
      <section class="content-section">
        <div class="content-grid">
          <!-- 患者列表 -->
          <div class="patients-panel">
            <div class="panel-header">
              <h2>患者列表</h2>
              <div class="panel-actions">
                <span class="patient-count">{{ filteredPatients.length }} 位患者</span>
                <button class="refresh-btn">🔄</button>
              </div>
            </div>
            <div class="patients-list">
              <div 
                v-for="patient in filteredPatients" 
                :key="patient.id"
                class="patient-card"
                @click="handleViewPatient(patient)"
              >
                <div class="patient-avatar">
                  <img :src="patient.avatar" :alt="patient.name">
                  <div class="status-indicator" :class="getStatusClass(patient.status)"></div>
                  <div class="priority-badge" :class="getPriorityClass(patient.priority)">
                    {{ getPriorityText(patient.priority) }}
                  </div>
                </div>
                <div class="patient-info">
                  <div class="patient-header">
                    <h3 class="patient-name">{{ patient.name }}</h3>
                    <span class="patient-status" :class="getStatusClass(patient.status)">
                      {{ getStatusText(patient.status) }}
                    </span>
                  </div>
                  <div class="patient-details">
                    <div class="detail-row">
                      <span class="detail-label">年龄:</span>
                      <span class="detail-value">{{ patient.age }}岁</span>
                      <span class="detail-label">科室:</span>
                      <span class="detail-value">{{ patient.department }}</span>
                    </div>
                    <div class="detail-row">
                      <span class="detail-label">医生:</span>
                      <span class="detail-value">{{ patient.doctor }}</span>
                      <span class="detail-label">诊断:</span>
                      <span class="detail-value">{{ patient.diagnosis }}</span>
                    </div>
                    <div class="detail-row">
                      <span class="detail-label">上次就诊:</span>
                      <span class="detail-value">{{ patient.lastVisit }}</span>
                      <span class="detail-label">下次预约:</span>
                      <span class="detail-value">{{ patient.nextAppointment }}</span>
                    </div>
                    <div class="detail-row notes">
                      <span class="detail-label">备注:</span>
                      <span class="detail-value">{{ patient.notes }}</span>
                    </div>
                  </div>
                  <div class="patient-actions">
                    <button class="action-btn-small" @click.stop="handleEditPatient(patient)">
                      编辑
                    </button>
                    <button class="action-btn-small primary" @click.stop="handleScheduleAppointment(patient)">
                      预约
                    </button>
                    <button class="action-btn-small danger" @click.stop="handleDeletePatient(patient)">
                      删除
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 今日预约 -->
          <div class="appointments-panel">
            <div class="panel-header">
              <h2>今日预约</h2>
              <div class="panel-actions">
                <span class="appointment-count">{{ todayAppointments.length }} 个预约</span>
                <button class="refresh-btn">🔄</button>
              </div>
            </div>
            <div class="appointments-list">
              <div 
                v-for="appointment in todayAppointments" 
                :key="appointment.id"
                class="appointment-item"
              >
                <div class="appointment-time">{{ appointment.time }}</div>
                <div class="appointment-info">
                  <div class="appointment-patient">{{ appointment.patient }}</div>
                  <div class="appointment-department">{{ appointment.department }}</div>
                  <div class="appointment-doctor">{{ appointment.doctor }}</div>
                  <div class="appointment-type">{{ appointment.type }}</div>
                </div>
                <div class="appointment-status" :class="appointment.status">
                  {{ appointment.status === 'confirmed' ? '已确认' : '待确认' }}
                </div>
              </div>
            </div>
            <div class="appointment-actions">
              <button class="action-btn-small">查看全部</button>
              <button class="action-btn-small primary">添加预约</button>
      </div>
      </div>
    </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.patient-management {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
  max-width: 1600px;
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
  transition: all 0.3s;
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

.action-btn.primary {
  background: #4CAF50;
  color: white;
}

.action-btn.primary:hover {
  background: #45a049;
}

.btn-icon {
  font-size: 1.1rem;
}

/* 主要内容 */
.main-content {
  max-width: 1600px;
  margin: 0 auto;
  padding: 2rem;
}

/* 统计概览 */
.stats-section {
  margin-bottom: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.3s;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
}

.stat-icon.total {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  color: #2196F3;
}

.stat-icon.active {
  background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
  color: #4CAF50;
}

.stat-icon.new {
  background: linear-gradient(135deg, #fff3e0 0%, #ffcc80 100%);
  color: #FF9800;
}

.stat-icon.appointment {
  background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%);
  color: #9C27B0;
}

.stat-icon.satisfaction {
  background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%);
  color: #FFC107;
}

.stat-content {
  flex: 1;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.2rem;
}

.stat-label {
  color: #666;
  font-weight: 600;
  margin-bottom: 0.3rem;
}

.stat-trend {
  color: #4CAF50;
  font-size: 0.8rem;
  font-weight: 500;
}

/* 搜索和筛选 */
.search-section {
  margin-bottom: 2rem;
}

.search-controls {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 1rem;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.search-box {
  position: relative;
  flex: 1;
}

.search-input {
  width: 100%;
  padding: 0.8rem 1rem 0.8rem 3rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s;
  background: white;
}

.search-input:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.filter-controls {
  display: flex;
  gap: 1rem;
}

.filter-select {
  padding: 0.8rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.filter-select:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
}

/* 内容区域 */
.content-section {
  margin-bottom: 2rem;
}

.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.patients-panel,
.appointments-panel {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.panel-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.panel-header h2 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
}

.panel-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.patient-count,
.appointment-count {
  background: #4CAF50;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
}

.refresh-btn {
  background: transparent;
  border: 1px solid #e0e0e0;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.refresh-btn:hover {
  background: #f8f9fa;
  border-color: #4CAF50;
}

/* 患者列表 */
.patients-list {
  max-height: 600px;
  overflow-y: auto;
}

.patient-card {
  padding: 1.5rem;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  gap: 1rem;
}

.patient-card:hover {
  background: #f8f9fa;
  transform: translateX(5px);
}

.patient-card:last-child {
  border-bottom: none;
}

.patient-avatar {
  position: relative;
  flex-shrink: 0;
}

.patient-avatar img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.status-indicator {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid white;
}

.status-indicator.status-active {
  background: #4CAF50;
}

.status-indicator.status-pending {
  background: #FF9800;
}

.status-indicator.status-completed {
  background: #9E9E9E;
}

.priority-badge {
  position: absolute;
  top: -5px;
  left: -5px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 600;
  color: white;
}

.priority-badge.priority-high {
  background: #F44336;
}

.priority-badge.priority-medium {
  background: #FF9800;
}

.priority-badge.priority-low {
  background: #4CAF50;
}

.patient-info {
  flex: 1;
}

.patient-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
}

.patient-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
}

.patient-status {
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.patient-status.status-active {
  background: #e8f5e8;
  color: #4CAF50;
}

.patient-status.status-pending {
  background: #fff3e0;
  color: #FF9800;
}

.patient-status.status-completed {
  background: #f5f5f5;
  color: #9E9E9E;
}

.patient-details {
  margin-bottom: 1rem;
}

.detail-row {
  display: grid;
  grid-template-columns: auto 1fr auto 1fr;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  align-items: center;
}

.detail-row.notes {
  grid-template-columns: auto 1fr;
}

.detail-label {
  color: #666;
  font-size: 0.9rem;
  font-weight: 500;
}

.detail-value {
  color: #2c3e50;
  font-size: 0.9rem;
  font-weight: 600;
}

.patient-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn-small {
  padding: 0.4rem 0.8rem;
  border: 1px solid #e0e0e0;
  background: white;
  color: #666;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.action-btn-small:hover {
  background: #f5f5f5;
  color: #2c3e50;
}

.action-btn-small.primary {
  background: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

.action-btn-small.primary:hover {
  background: #45a049;
}

.action-btn-small.danger {
  background: #F44336;
  color: white;
  border-color: #F44336;
}

.action-btn-small.danger:hover {
  background: #d32f2f;
}

/* 今日预约 */
.appointments-list {
  padding: 1rem;
}

.appointment-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 12px;
  margin-bottom: 0.8rem;
  transition: all 0.3s;
  border: 1px solid transparent;
}

.appointment-item:hover {
  background: #e9ecef;
  border-color: #4CAF50;
  transform: translateX(5px);
}

.appointment-time {
  font-weight: 600;
  color: #4CAF50;
  font-size: 1rem;
  min-width: 60px;
  text-align: center;
}

.appointment-info {
  flex: 1;
}

.appointment-patient {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.2rem;
}

.appointment-department,
.appointment-doctor,
.appointment-type {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.1rem;
}

.appointment-status {
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  text-align: center;
}

.appointment-status.confirmed {
  background: #e8f5e8;
  color: #4CAF50;
}

.appointment-status.pending {
  background: #fff3e0;
  color: #FF9800;
}

.appointment-actions {
  padding: 1rem;
  border-top: 1px solid #e0e0e0;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .search-controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-controls {
    flex-direction: column;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .detail-row {
    grid-template-columns: 1fr;
    gap: 0.2rem;
  }
  
  .patient-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .appointment-item {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }
  
  .panel-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>
