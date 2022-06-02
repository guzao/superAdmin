import type { RouteRecordRaw } from 'vue-router';
import layout from '@/layouts/index.vue'

export const  reportRoutes: RouteRecordRaw = {
  path: '/report',
  component: layout,
  meta: {
    title: '数据报表',
  },
  children: [
    {
      path: '/report/statisticalReport',
      component: () => import('@/pages/dataReport/statisticalReport/index.vue'),
      name: 'statisticalReport',
      meta: {
        title: '统计报表' 
      },
    },
    {
      path: '/report/alarmEvents',
      component: () => import('@/pages/dataReport/alarmEvents/index.vue'),
      name: 'alarmEvents',
      meta: {
        title: '告警事件'
      }
    },
    {
      path: '/report/dataCurves',
      component: () => import('@/pages/dataReport/dataCurves/index.vue'),
      name: 'dataCurves',
      meta: {
        title: '数据曲线'
      }
    }
  ]
}

