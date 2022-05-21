import type { RouteRecordRaw } from 'vue-router';
import layout from '@/layouts/index.vue'
import { dashboardRoute } from './asyncRouters/index'
/**
 * 静态路由
*/
export const basicRoutes: Array<RouteRecordRaw> =  [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/constantPages/login/index.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/404',
    name: 'error',
    component: () => import('@/pages/constantPages/404.vue'),
    meta: {
      title: '错误',
    }
  },
]
