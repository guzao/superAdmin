import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { whiteList } from '@/appConfig'
import { getToken } from '@/utils'



// 创建axios的实例
const service = axios.create({
  baseURL: '',
  headers: {},
  withCredentials: false,
  timeout: 30000,
})



/** 请求前拦截 */
service.interceptors.request.use(

  (config: AxiosRequestConfig) => {
    const { url } = config
    // 1 路径是否需要 TOKEN
    if ( whiteList.includes( url! )) return config

    // token 检测 存在
    if (getToken()) {
      /** 报错问题请忽略，TS检测导致 */
      config.headers['Authorization'] = 'Bearer ' + getToken()
    } else {  // 不存在 TOKEN
      console.log('// 3 不存在 TOKEN')
    }
    
    return config
  }, 

  (error) => {
    return Promise.reject(error);
  }

)


/** 响应拦截 */
service.interceptors.response.use(

  (response: AxiosResponse) => {
    const data = response.data
    // TODO
    // 接口返回的错误类型
    // 400 401 404 500 根据不同类型做特殊处理
    // 响应状态正常处理
    return data
  },

  (error) => {
    return Promise.reject(error)
  }

)

export default service