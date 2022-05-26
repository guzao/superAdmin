import type { RouteRecordRaw } from 'vue-router';
import layout from '@/layouts/index.vue'

export const dataAnalysisRoutes: RouteRecordRaw = {
  path: '/dataAnalysis',
  component: layout,
  meta: {
    title: '智能分析',
  },
  children: [
    {
      path: '/dataAnalysis/combinationProperty',
      component: () => import('@/pages/dataAnalysis/combinationProperty/index.vue') ,
      name: 'combinationProperty',
      meta: {
        title: '综合性能',
      }
    },
    {
      path: '/dataAnalysis/AbnormalPrediction',
      component: () => import('@/pages/dataAnalysis/AbnormalPrediction/index.vue') ,
      name: 'AbnormalPrediction',
      meta: {
        title: '异常预测',
      }
    },
  ]
}