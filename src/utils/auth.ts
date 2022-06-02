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



/**
 *  用户当前查看的项目
*/
const USER_CURRENT_PROJECT_CODE = 'USER_CURRENT_PROJECT_CODE'

/** 
 * * 设置 用户当前查看的项目
 * * 存储在  sessionStorage中
*/
export function setUserCurrentProjectCode (code: string): void {
  sessionStorage.setItem(USER_CURRENT_PROJECT_CODE, code)
}
/** 
 * * 获取 用户当前查看的项目 code 
 * * 存储在  sessionStorage中
*/
export function getUserCurrentProjectCode (): string {
  return sessionStorage.getItem(USER_CURRENT_PROJECT_CODE) as string
}
/** 删除 用户当前查看的项目 */
export function removeUserCurrentProjectCode (): void {
  sessionStorage.removeItem(USER_CURRENT_PROJECT_CODE)
}


/**
 *  用户当前查看设备id
*/
const USER_CURRENT_DEVICE_CODE = 'USER_CURRENT_DEVICE_CODE'

/** 
 * * 设置 用户当前查看的设备id
 * * 存储在  sessionStorage中
*/
export function setUserCurrentDeviceCode (code: string): void {
  sessionStorage.setItem(USER_CURRENT_DEVICE_CODE, code)
}
/** 
 * * 获取 用户当前查看设备id
 * * 存储在  sessionStorage中
*/
export function getUserCurrentDeviceCode (): string {
  return sessionStorage.getItem(USER_CURRENT_DEVICE_CODE) as string
}
/** 删除 用户当前查看设备id */
export function removeUserCurrentDeviceCode (): void {
  sessionStorage.removeItem(USER_CURRENT_DEVICE_CODE)
}