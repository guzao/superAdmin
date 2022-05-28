import http from '@/http/index'

/** 获获取PC端项目信息 code是string 项目code比如NJ02 */
export function myProjectInfo(data: any): Promise<unknown> {
  return http({
    url: '/api/myProjectInfo',
    method: 'post',
    data
  })
}