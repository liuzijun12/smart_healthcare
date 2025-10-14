import { createRouter, createWebHistory } from 'vue-router'
import PatientManagement from '../views/PatientManagement.vue'
import AIDiagnosis from '../views/AIDiagnosis.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'patient',
      component: PatientManagement,
    },
    {
      path: '/ai-diagnosis',
      name: 'ai-diagnosis',
      component: AIDiagnosis,
    },
  ],
})

export default router
