/**
 * 页面请求不用携带TOKEN白名单
 * @ 以/开头 例 '/login'
*/
export const whiteList =  ['/login', '/api/captcha'] as Array <string>


/**
 * 页面白名单
 * @ 以/开头 例 '/login'
*/
export const routerWhiteList =  ['/login', '/404'] as Array <string>


/**
 * * 是否开启动态路由 
 * * true 使用后端返回的路由表动态生成路由 ==> 详细实现方式参考 @/router/guard/permissionGuard 和  @/stores/modules/userData 文件
 * * false 使用本地配置的路由表  数据源来自 router文件夹   ==>> 只允许使用在开发环境 ==> 配置方式请参考 @/router/index  createRouter 函数
 *    ==> 和 @/stores/modules/userData下的 getUserRouerss 和 getUserMenu 属性配置方式  
 *    ==> 新增的动态路由请在 @/router/routers/asyncRouters/index 文件 使用export * from './xxxxx' 方式导出
 * * 默认 开启动态路由
*/
export const WhetherToOpenDynamicRouting: boolean = true
