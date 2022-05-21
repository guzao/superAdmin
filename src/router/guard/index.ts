import type { Router } from 'vue-router'
import { createPermissionGuard } from './permissionGuard'


/**
 * @router 路由实例
 * * 注册路由守卫
 * * 开启顶部进度条
*/
export function setupRouterGuard (router: Router) {
  createPermissionGuard(router)
}