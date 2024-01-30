import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import { constantRouterMap } from '@/config/router.config'

const router = createRouter({
  history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
  routes: constantRouterMap,
})

export default router
