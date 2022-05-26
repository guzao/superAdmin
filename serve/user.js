const { qs, TOKEN } = require('./utils')
function login () {
  return qs({
    code: 0,
    msg: 'success',
    data: {
      original: {
        access_token: TOKEN,
        expires_in: 394200000,
        token_type: "bearer"
      }
    }
  })
}


function userInfo () {
  return qs({
    code: 0,
    msg: 'success',
    data: {
      id: 59,
      menuAuth: [],
      name: "zhanglibo",
    }
  })
}


function userMenu () {
  return qs({
    code: 0,
    msg: 'success',
    data: userMenuData
  })
}

module.exports = {
  login,
  userInfo,
  userMenu
}


const userMenuData = [

  // 总览
  {
    path: '/',
    component: 'layout',
    meta: {
      title: '总览'
    },
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: '/pages/dashboard/index.vue',
        meta: {
          title: '数据总览',
        },
      },
    ]
  },


  // 监视
  {
    path: '/monitor',
    component: 'layout',
    meta: {
      title: '实时监视'
    },
    children: [
      {
        path: '/monitor/projectInfo',
        component: 'pages/monitor/projectInfo/index.vue',
        name: 'projectInfo',
        meta: {
          title: '项目信息' 
        },
      },
      {
        path: '/monitor/productInfo',
        component: 'pages/monitor/productInfo/index.vue',
        name: 'productInfo',
        meta: {
          title: '产品信息'
        }
      },
    ]
  },



  // 报表
  {
    path: '/report',
    component: 'layout',
    meta: {
      title: '数据报表'
    },
    children: [
      {
        path: '/report/statisticalReport',
        component: 'pages/dataReport/statisticalReport/index.vue',
        name: 'statisticalReport',
        meta: {
          title: '统计报表' 
        },
      },
      {
        path: '/report/alarmEvents',
        component: 'pages/dataReport/alarmEvents/index.vue',
        name: 'alarmEvents',
        meta: {
          title: '告警事件'
        }
      },
      {
        path: '/report/dataCurves',
        component: 'pages/dataReport/dataCurves/index.vue',
        name: 'dataCurves',
        meta: {
          title: '数据曲线'
        }
      },
    ]
  },




  // 工单
  {
    path: '/Operation',
    component: 'layout',
    meta: {
      title: '工单系统',
    },
    children: [
      {
        path: '/Operation/WorkOrderProcess',
        component: 'pages/Operation/WorkOrderProcess/index.vue',
        name: 'WorkOrderProcess',
        meta: {
          title: '工单流程',
        }
      },
      {
        path: '/Operation/WorkOrderStatistics',
        component: 'pages/Operation/WorkOrderStatistics/index.vue',
        name: 'WorkOrderStatistics',
        meta: {
          title: '工单统计',
        }
      },
    ]
  },



  // 数据分析
  {
    path: '/dataAnalysis',
    component: 'layout',
    meta: {
      title: '智能分析',
    },
    children: [
      {
        path: '/dataAnalysis/combinationProperty',
        component: 'pages/dataAnalysis/combinationProperty/index.vue',
        name: 'combinationProperty',
        meta: {
          title: '综合性能',
        }
      },
      {
        path: '/dataAnalysis/AbnormalPrediction',
        component: 'pages/dataAnalysis/AbnormalPrediction/index.vue',
        name: 'AbnormalPrediction',
        meta: {
          title: '异常预测',
        }
      }
    ]
  },


]