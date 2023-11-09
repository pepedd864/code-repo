import BasicLayout from '@/layouts/BasicLayout.vue'
import UserLayout from '@/layouts/UserLayout.vue'

export const constantRouterMap = [
  {
    name: 'basicLayout',
    path: '/',
    redirect: '/list',
    component: BasicLayout,
    children: [],
  },
  {
    name: 'userLayout',
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        name: 'login',
        path: '/user/login',
        component: () =>
          import(/* webpackChunkName: "user" */ '@/pages/user/login/index.vue'),
      },
    ],
  },
]

export function getAsyncRouterMap() { // 此处是作为动态路由向后端请求路由的异步方法，这里就写死路由了
  return [
    {
      name: '产品列表',
      path: '/list',
      meta: {
        icon: 'TaobaoCircleOutlined',
      },
      component: import('@/pages/list/index.vue'),
    },
    {
      name: '路由1',
      path: '/router1',
      meta: {
        icon: 'EditOutlined',
      },
      component: import('@/pages/test/index.vue'),
      children: [
        {
          name: '路由1-1',
          path: '/router1-1',
          meta: {
            icon: 'EditOutlined',
          },
          component: import('@/pages/test/index.vue'),
        },
        {
          name: '路由1-2',
          path: '/router1-2',
          meta: {
            icon: 'EditOutlined',
          },
          component: import('@/pages/test/index.vue'),
        },
      ],
    },
    {
      name: '路由2',
      path: '/router2',
      meta: {
        icon: 'EditOutlined',
      },
      component: import('@/pages/test/index.vue'),
    },
    {
      name: '路由3',
      path: '/router3',
      meta: {
        icon: 'EditOutlined',
      },
      component: import('@/pages/test/index.vue'),
    },
    {
      name: '路由4',
      path: '/router4',
      meta: {
        icon: 'EditOutlined',
      },
      component: import('@/pages/test/index.vue'),
    },
  ]
}
