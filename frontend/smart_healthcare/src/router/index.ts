import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import PatientManagement from '../views/PatientManagement.vue'
import AIDiagnosis from '../views/AIDiagnosis.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
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
      path: '/home',
      name: 'home',
      component: HomePage,
    },
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
  ],
})

export default router
