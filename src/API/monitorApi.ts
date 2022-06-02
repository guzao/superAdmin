import http from '@/http/index'

/** 获获取PC端项目信息 code是string 项目code比如NJ02 */
export function myProjectInfo(data: any): Promise<unknown> {
  return http({
    url: '/api/myProjectInfo',
    method: 'post',
    data
  })
}


/** 获获取PC端项目列表数据 */
export function myProjectList(data: any): Promise<unknown> {
  return http({
    url: '/api/myProject',
    method: 'post',
    data
  })
}


/** 获取PC告警信息 code 项目code 必选  lv告警等级 可不填 */
export function waringList(data: any): Promise<unknown> {
  return http({
    url: '/api/waringList',
    method: 'post',
    data
  })
}


/** 获取PC产品列表信息 */
export function myProductList(data: any): Promise<unknown> {
  return http({
    url: '/api/myProductList',
    method: 'post',
    data
  })
}



/** 获取PC产品信息 (单个设备)  */
export function myProduct(data: any): Promise<unknown> {
  return http({
    url: '/api/myProduct',
    method: 'post',
    data
  })
}







