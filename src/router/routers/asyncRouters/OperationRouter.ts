import type { RouteRecordRaw } from 'vue-router';
import layout from '@/layouts/index.vue'

export const  OperationRouter: RouteRecordRaw = {
  path: '/Operation',
  component: layout,
  meta: {
    title: '工单系统',
  },
  children: [
    {
      path: '/Operation/NewWorkOrder',
      component: () => import('@/pages/Operation/WorkOrderProcess/index.vue'),
      name: 'NewWorkOrder',
      meta: {
        title: '工单流程',
      }
    },
    {
      path: '/Operation/WorkOrderPool',
      component: () => import('@/pages/Operation/WorkOrderStatistics/index.vue'),
      name: 'WorkOrderPool',
      meta: {
        title: '工单统计',
      }
    },
  ]
}