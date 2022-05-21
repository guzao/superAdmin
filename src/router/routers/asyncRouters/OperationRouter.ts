import type { RouteRecordRaw } from 'vue-router';
import layout from '@/layouts/index.vue'

export const  OperationRouter: RouteRecordRaw = {
  path: '/Operation',
  component: layout,
  meta: {
    title: '运维管理',
  },
  children: [
    {
      path: '/Operation/NewWorkOrder',
      component: () => import('@/pages/Operation/NewWorkOrder/index.vue'),
      name: 'NewWorkOrder',
      meta: {
        title: '新建工单',
      }
    },
    {
      path: '/Operation/WorkOrderPool',
      component: () => import('@/pages/Operation/WorkOrderPool/index.vue'),
      name: 'WorkOrderPool',
      meta: {
        title: '工单池',
      }
    },
    {
      path: '/Operation/MyWorkOrder',
      component: () => import('@/pages/Operation/MyWorkOrder/index.vue'),
      name: 'MyWorkOrder',
      meta: {
        title: '我的工单',
      }
    },
    {
      path: '/Operation/allWorkOrder',
      component: () => import('@/pages/Operation/allWorkOrder/index.vue'),
      name: 'allWorkOrder',
      meta: {
        title: '所有工单',
      }
    },
  ]
}