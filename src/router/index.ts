import type { App } from 'vue';
import {  createRouter, createWebHashHistory } from 'vue-router'
import { WhetherToOpenDynamicRouting } from "@/appConfig";
import { basicRoutes } from "./routers/constantRouter"
import { OperationRouter, monitorRouters, dashboardRoute } from "./routers/asyncRouters"


/**
 * 创建路由
*/
export const router = createRouter({
  history: createWebHashHistory(),
  routes: WhetherToOpenDynamicRouting ? [...basicRoutes, ] : [...basicRoutes, dashboardRoute,  OperationRouter, monitorRouters ],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});



/** 注册路由 */ 
export function setupRouter (app: App<Element>) {
  app.use(router)
  return router
}

export * from './guard/index'
