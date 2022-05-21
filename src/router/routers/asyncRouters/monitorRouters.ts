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
      path: '/monitor/index',
      component: () => import('@/pages/monitor/monitor/index.vue'),
      name: 'index',
      meta: {
        title: '电站信息概览',
      }
    },
    {
      path: '/monitor/subSite',
      component: () => import('@/pages/monitor/subSite/index.vue'),
      name: 'subSite',
      meta: {
        title: '设备信息详情',
      }
    },
    {
      path: '/monitor/reportAlarm',
      component: () => import('@/pages/monitor/reportAlarm/index.vue'),
      name: 'reportAlarm',
      meta: {
        title: '告警事件查看',
      }
    },
    {
      path: '/monitor/historicalCurve',
      component: () => import('@/pages/monitor/historicalCurve/index.vue'),
      name: 'historicalCurve',
      meta: {
        title: '历史曲线查询',
      }
    },
    {
      path: '/monitor/KeyDataReport',
      component: () => import('@/pages/monitor/KeyDataReport/index.vue'),
      name: 'KeyDataReport',
      meta: {
        title: '关键数据报表',
      }
    },
    {
      path: '/monitor/ElectricityStatisticsBill',
      component: () => import('@/pages/monitor/ElectricityStatisticsBill/index.vue'),
      name: 'ElectricityStatisticsBill',
      meta: {
        title: '电量统计账单',
      }
    },
  ]
}