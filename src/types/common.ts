 
/**
 * * 用户菜单
 * * 用户路由
*/
export type MenuType = {
  /** 路径 */
  path: string,
  /** 组件 */
  component: string | any,
  /** 路由名称 */
  name?: string,
  /** 路由信息 */
  meta: {
    /** 路由标题 */
    title: string
  },
  /** 子路由 */
  children?: Array<MenuType>
}
