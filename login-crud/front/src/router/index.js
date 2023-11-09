import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import { ref } from 'vue'
import { constantRouterMap, getAsyncRouterMap } from '@/config/router.config.js'

export const asyncRouterMap = ref([])

// 将异步路由添加到路由表
function syncRouterMap() {
  asyncRouterMap.value = getAsyncRouterMap()
  constantRouterMap[0].children = asyncRouterMap.value
}

syncRouterMap()
export default createRouter({
  history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
  routes: constantRouterMap,
})
