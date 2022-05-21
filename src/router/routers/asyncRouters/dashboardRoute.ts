import type { RouteRecordRaw } from 'vue-router';
import layout from '@/layouts/index.vue'

export const dashboardRoute: RouteRecordRaw = {
  path: '/',
  component: layout,
  meta: {
    title: '数据总览'
  },
  children: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/pages/dashboard/index.vue'),
      meta: {
        title: '',
      },
    },
  ]
}