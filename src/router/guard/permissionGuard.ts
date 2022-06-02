import { MenuType } from '@/types';
import type { Router, RouteRecordRaw } from 'vue-router'
import nProgress from 'nprogress'
import { useUserData } from '@/stores'
import { routerWhiteList } from '@/appConfig'
import { getToken } from '@/utils'
nProgress.configure({ showSpinner: false })
import { WhetherToOpenDynamicRouting } from "@/appConfig";
import layout from '@/layouts/index.vue'


/**
 * 权限注册
 * * 1 注册进度条 
 * * 2 页面权限检测
*/
export function createPermissionGuard (router: Router) {
  const userIinfo = useUserData()

  router.beforeEach(async (to, from, next) => {
    nProgress.start()
    const token = getToken()
    const name = userIinfo.getUserInfo.name
    const { path } = to

    if (token) {
  
      // 登录状态下去登录无意义 ==>>> next('/dashboard')
      if (path === '/login') return next('/dashboard')
      
      // 没有用户数据 重新拉取
      if (!name) {
        
        try {
          // 获取用户数据
          await userIinfo.setUserInfo()

          // 获取用户所属项目列表
          await userIinfo.getUserProjectList()

          /** 是否开启动态路由 */
          if (WhetherToOpenDynamicRouting) {
            // 获取用户路由、侧边栏
            const userRouters = await userIinfo.setUserRouers()
  
            // 设置路由表的组件地址
            const newRouters = setRouterComponentPath(userRouters)
            
            // 添加动态路由
            addRouter(router, newRouters)
            
            // 路由重定向
            next(to.fullPath === '/' ? '/dashboard': to.fullPath) 
            return 
          }
          next()
          return
          
        } catch (error) {
          console.log(error, '===========[ 网络接口异常 ]========')
          userIinfo.removeUserInfo()
          next('/login')  
          return
        }

      }

      // token name 都有直接放行
      next()
      return 
    } 

    // 在白名单里
    if (routerWhiteList.includes(path)) return next()

    // 未登录，又不在白名单 定向到登录
    next('/login')  
  })


  router.afterEach(() => {
    nProgress.done()
  })

}




/** 设置动态路由组件路径 */
function setRouterComponentPath (userRouter: Array<MenuType>): Array<MenuType> {
  userRouter.forEach(item => {
    let { component, children } = item
    item.component = component.includes('layout') 
                                                  ? layout 
                                                  : () => import(/* @vite-ignore */ `../../${component}`)
    // 递归设置组件路由地址
    if ( children ) setRouterComponentPath(children)
  })
  return userRouter
}



/** 动态添加路由 */
function addRouter (router: Router, routers: Array<RouteRecordRaw>): void {
  routers.forEach((item) => {
    router.addRoute(item)
  })
}