import type { RouteRecordRaw } from 'vue-router';
import layout from '@/layouts/index.vue'


/**
 * 信息监视
*/
export const  monitorRouters: RouteRecordRaw = {
  path: '/monitor',
  component: layout,
  meta: {
    title: '信息监视',
  },
  children: [
    {
      path: '/monitor/projectInfo',
      component: () => import('@/pages/monitor/projectInfo/index.vue'),
      name: 'projectInfo',
      meta: {
        title: '项目信息',
      }
    },
    {
      path: '/monitor/productInfo',
      component: () => import('@/pages/monitor/productInfo/index.vue'),
      name: 'productInfo',
      meta: {
        title: '设备信息',
      }
    },
  ]
}