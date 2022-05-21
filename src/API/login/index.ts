import http from '@/http/index'

/** 获取验证码 */
export function getCaptcha(data: any) {
  return http({
    url: '/api/captcha',
    method: 'post',
    data
  })
}

/**
 * * 登录
 * * captcha=19r3&name=test1&password=Test$123
*/
export function login(data: any) {
  return http({
    url: '/api/login',
    method: 'post',
    data
  })
} 

/**
 * 获取用户信息
*/
export function getInfo(data: any) {
  return http({
    url: '/api/me',
    method: 'post',
    data
  })
}

/**
 * 获取用户路由表
*/
export function getUserMenu(data: any) {
  return http({
    url: '/myapi/userMenu',
    method: 'post',
    data
  })
}

/**
 * 用户登出
*/
export function logout() {
  return http({
    url: '/api/logout',
    method: 'post'
  })
}