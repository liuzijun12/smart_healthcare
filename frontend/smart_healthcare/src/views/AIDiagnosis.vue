<script setup lang="ts">
// AI辅诊组件
</script>

<template>
  <div class="ai-diagnosis">
    <h2>AI 辅诊系统</h2>
    <div class="feature-grid">
      <div class="feature-card">
        <h3>症状分析</h3>
        <p>基于AI的初步症状分析与诊断建议</p>
        <button class="primary-btn">开始分析</button>
      </div>
      <div class="feature-card">
        <h3>医学影像识别</h3>
        <p>AI辅助医学影像分析与诊断</p>
        <button class="primary-btn">上传影像</button>
      </div>
      <div class="feature-card">
        <h3>智能问诊</h3>
        <p>AI智能问诊助手服务</p>
        <button class="primary-btn">开始问诊</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ai-diagnosis {
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
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.primary-btn:hover {
  background-color: #357abd;
}
</style>