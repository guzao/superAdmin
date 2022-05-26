import Cookies from "js-cookie"

/** 用户token */
const TOKEN = 'TOKEN'
/** 
 *  @token-用户token
 * * 设置用户 token
 * * 存储在  Cookies 中
 * * 过期时间为 7 天
*/
export function setToken (token: string) {
  Cookies.set(TOKEN, token, {
    expires: 7
  })
}
/** 
 * * 获取用户 TOKEN
 * * 过期时间为 7 天
*/
export function getToken (): string {
  const token =  Cookies.get(TOKEN) || ''
  return token
}
/** 
 * * 移除用户 TOKEN
 * * 存储在  Cookies 中
*/
export function removeToken () {
  Cookies.remove(TOKEN)
}





/** 侧边栏状态 */
const IS_COLLAPSE = 'IS_COLLAPSE'
/** 
 *  @isCollapse-侧边栏状态
 * * 设置用户侧边栏状态
 * * 存储在  Cookies 中
*/
export function setIsCollapse (isCollapse: any) {
  Cookies.set(IS_COLLAPSE, isCollapse, {
    expires: 360
  })
}
/** 
 * * 获取用户 侧边栏状态
*/
export function getIsCollapse () {
  const isCollapse = Cookies.get(IS_COLLAPSE) as unknown
  return isCollapse as boolean
}
/** 
 * * 移除用户 侧边栏状态
 * * 存储在  Cookies 中
*/
export function removeIsCollapse () {
  Cookies.remove(IS_COLLAPSE)
}

