import { createApp } from 'vue'
import App from './App.vue'
import 'nprogress/nprogress.css'
import './index.css'
import '@/styles/index.scss'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import ElementPlus from 'element-plus'
import { setupRouter, setupRouterGuard } from '@/router'
import { setupPinia } from '@/stores'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import svgIcon from './icons/index.vue'


/** 初始化应用 */
function setupApp (): void {

  // init application
  const app = createApp(App)
  

  // use store
  setupPinia(app)

  
  // init router 
  const router = setupRouter(app)

  // use Router permission
  setupRouterGuard(router)


  // use UI { language： 中文, 组件尺寸： 小 }
  app.use(ElementPlus, { locale: zhCn,  })
  // app.use(ElementPlus, { locale: zhCn, size: 'small' })

  app.component('svg-icon', svgIcon)

  // use elemntui svg
  useIcons(app)


  // mount application
  app.mount('#app')

}


setupApp()

/** 注册elemntui svg */
function useIcons (app: any) : void {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
