import type { RouteRecordRaw } from 'vue-router';
import layout from '@/layouts/index.vue'

export const  OperationRouter: RouteRecordRaw = {
  path: '/report',
  component: layout,
  meta: {
    title: '数据报表',
    icon: 'monitor_un_active'
  },
  children: [
    { // powerBill
      path: '/report/powerBill',
      component: () => import('@/pages/dataReport/powerBill/index.vue'),
      name: 'powerBill',
      meta: {
        title: '电量账单' 
      },
    },
    // {
    //   path: '/report/statisticalReport',
    //   component: () => import('@/pages/dataReport/statisticalReport/index.vue'),
    //   name: 'statisticalReport',
    //   meta: {
    //     title: '统计报表' 
    //   },
    // },
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
// export const  OperationRouter: RouteRecordRaw = {
//   path: '/Operation',
//   component: layout,
//   meta: {
//     title: '工单系统',
//     icon: 'monitor_un_active'
//   },
//   children: [
//     {
//       path: '/Operation/NewWorkOrder',
//       component: () => import('@/pages/Operation/WorkOrderProcess/index.vue'),
//       name: 'NewWorkOrder',
//       meta: {
//         title: '工单流程',
//       }
//     },
//     {
//       path: '/Operation/WorkOrderPool',
//       component: () => import('@/pages/Operation/WorkOrderStatistics/index.vue'),
//       name: 'WorkOrderPool',
//       meta: {
//         title: '工单统计',
//       }
//     },
//   ]
// }