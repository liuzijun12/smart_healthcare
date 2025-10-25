import { createRouter, createWebHistory } from 'vue-router'
import PatientManagement from '../views/PatientManagement.vue'
import AIDiagnosis from '../views/AIDiagnosis.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/patient',
      name: 'patient',
      component: PatientManagement,
    },
    {
      path: '/ai-diagnosis',
      name: 'ai-diagnosis',
      component: AIDiagnosis,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/',
      redirect: '/login'
    },
  ],
})

export default router
