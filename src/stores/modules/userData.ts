import { MenuType } from '@/types'
import type { RouteRecordRaw } from 'vue-router';
import { defineStore } from 'pinia'
import { setToken, getToken, removeToken, setIsCollapse, getIsCollapse, removeIsCollapse  } from '@/utils'
import { getInfo, logout, getUserMenu } from '@/API'
import { respondState } from '@/enums'
import { ElMessage } from 'element-plus'
import { WhetherToOpenDynamicRouting } from '@/appConfig'
import { basicRoutes } from "@/router/routers/constantRouter"
import { dashboardRoute, monitorRouters, reportRoutes, OperationRouter, dataAnalysisRoutes } from "@/router/routers/asyncRouters"

/** 用户信息 */
type info = {
  name: string,
  full_name: string,
  black: number,
  id: number,
  email: string
}

/** 用户动态路由 */
type Routers = Array<
  { 
    path: string,
    name: string,
    component: string
  } | MenuType
>
 
/**
 * 用户数据 
 * 
*/
export const useUserData = defineStore('userData', {
  state: () => ({
    /** 用户token */ 
    token: '' as string,
    /** 用户信息 */ 
    userInfo: {} as info,
    /** 用户路由 */
    routers: [] as Routers,
    /** 用户菜单 */ 
    userMenu: [] as Array<MenuType>,
    /** 侧边栏状态 */ 
    isCollapse: false
  }),

  getters: {

    /** 获取用户 TOEKN  数据源来自Cookies  建议直接使用 '@/utils' 文件夹里的 getToken()获取  特殊情景会遇到数据延迟问题   */
    getToken (): string {
      return getToken() || ''
    },

    /** 获取用户数据 数据来源运行时全局数据 */
    getUserInfo(): info {
      return this.userInfo
    },

    /** 获取用户路由 运行时全局数据 */
    getUserRouers (): Routers {
      return WhetherToOpenDynamicRouting 
      ? this.routers 
      : [ ...basicRoutes ] as Routers
    },

    /** 获取用户菜单 运行时全局数据 */
    getUserMenu (): Array<MenuType | RouteRecordRaw > {
      return WhetherToOpenDynamicRouting  
      ? this.userMenu
      : [ dashboardRoute, monitorRouters,  OperationRouter ]
    },

    /** 获取用户侧边栏状态 */
    getIsCollapse () : boolean {
      return this.isCollapse 
    }
    
  },

  actions: {

    /** 设置用户数据 */
    async setUserInfo () {
      const res = await getInfo({})
      return new Promise((resolve, reject) => {
        let { code, data, msg } = res as any
        if (code === respondState.SUCCESS) {
          this.userInfo = data
          return resolve(data)
        } else {
          console.log(res)
          reject(res)
        }
      })
    },

    /** 
     * * 设置用户路由   
     * * 设置用户菜单栏
    */
    setUserRouers (): Promise<Array<MenuType>> {
      return new Promise((resolve, jeject) => {
        console.log('===== << 生成路由 >> << 生成菜单栏 >> =====')
        getUserMenu({}).then(res => {
          const userMenu = res.data as Array<MenuType>
          this.userMenu = userMenu
          this.routers = userMenu
          resolve(userMenu)
        })
      })
    },

    /** 
     * @token-用户token
     * * 存储在 Cookies 中
     * * 过期时间为 7 天
    */
    setUserToken (token: string): void {
      this.token = token
      setToken(token)
    },

    /**
     * 用户登出
     * 
    */
    loginOut () {
      return new Promise((resolve, reject) => {
        logout().then(res => {
          const { data, code, msg } = res as any
          console.log(res)
          if (code === respondState.SUCCESS) {
            resolve(res)  
            this.removeUserInfo()
            location.reload()
          } else {
            ElMessage.error(msg)
          }

        })
      })

    },

    /** 
     * * 清除用户所有副作用 TOKEN
    */
    removeUserInfo (): void {
      removeToken()
      removeIsCollapse()
    },

    /** 设置用户侧边栏状态 */ 
    setIsCollapse () : void {
      this.isCollapse = !this.isCollapse
      // setIsCollapse(this.isCollapse)
    }


  },
})

