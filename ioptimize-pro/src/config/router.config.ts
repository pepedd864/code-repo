import AuthLayout from '@/layouts/AuthLayout.vue'
import BasicLayout from '@/layouts/BasicLayout.vue'

export const constantRouterMap = [
  {
    name: 'basicLayout',
    path: '/',
    // redirect: '/dashboard',
    component: BasicLayout,
    children: [],
  },
  {
    name: 'authLayout',
    path: '/auth',
    component: AuthLayout,
    redirect: '/auth/login',
    hidden: true,
    children: [
      {
        name: 'login',
        path: '/auth/login',
        meta: {
          title: '登录',
        },
        component: () => import('@/views/auth/login/index.vue'),
      },
      {
        name: 'register',
        path: '/auth/register',
        meta: {
          title: '注册',
        },
        component: () => import('@/views/auth/register/index.vue'),
      },
    ],
  },
]
