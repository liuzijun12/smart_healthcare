<script setup lang="ts">
// 患者管理组件
</script>

<template>
  <div class="patient-management">
    <h2>患者管理系统</h2>
    <div class="feature-grid">
      <div class="feature-card">
        <h3>患者信息录入</h3>
        <p>录入和管理患者的基本信息</p>
        <button class="primary-btn">录入信息</button>
      </div>
      <div class="feature-card">
        <h3>病历管理</h3>
        <p>查看和更新患者病历记录</p>
        <button class="primary-btn">管理病历</button>
      </div>
      <div class="feature-card">
        <h3>预约挂号</h3>
        <p>安排和管理患者预约</p>
        <button class="primary-btn">预约管理</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.patient-management {
  padding: 2rem;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.feature-card {
  background: #ffffff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.feature-card h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.feature-card p {
  color: #666;
  margin-bottom: 1.5rem;
}

.primary-btn {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.primary-btn:hover {
  background-color: #3aa876;
}
</style>