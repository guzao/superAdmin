import type { App } from 'vue';
import { createPinia } from 'pinia'
export * from './modules'

const store = createPinia()
/**
 * 注册Pinia 全局共享数据
*/
export function setupPinia (app: App<Element>) {
  app.use(store)
}