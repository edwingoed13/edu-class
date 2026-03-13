import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import DashboardView from '../views/DashboardView.vue'
import CatalogView from '../views/CatalogView.vue'
import LessonView from '../views/LessonView.vue'
import PRDView from '../views/PRDView.vue'
import AuthView from '../views/AuthView.vue'
import SettingsView from '../views/SettingsView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView
    },
    {
      path: '/',
      name: 'landing',
      component: LandingView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: CatalogView
    },
    {
      path: '/lesson',
      name: 'lesson',
      component: LessonView
    },
    {
      path: '/prd',
      name: 'prd',
      component: PRDView
    }
  ]
})

export default router
