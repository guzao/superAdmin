import http from '@/http/index'

/** 获取首页统计信息 地图顶部信息 */
export function projectSummary(data: any): Promise<unknown> {
  return http({
    url: '/api/projectSummary',
    method: 'post',
    data
  })
}


/** 获取首页地图点信息 项目产品所在地址 */
export function overview(data: { area?: string }): Promise<unknown> {
  return http({
    url: '/api/overview',
    method: 'post',
    data
  })
}



/** 获取首页地图搜索信息  */
export function indexSearch(data: { area?: string }): Promise<unknown> {
  return http({
    url: '/api/indexSearch',
    method: 'post',
    data
  })
}




