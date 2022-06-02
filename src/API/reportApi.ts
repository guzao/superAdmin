import http from '@/http/index'
import { arrayBuffer } from 'stream/consumers'

/** 获取电量账单信息 */
export function electricityBill(data: any): Promise<unknown> {
  return http({
    url: '/api/electricityBill',
    method: 'post',
    data
  })
}

/** 下载电量账单信息 */
export function electricityBillExport(data: any): Promise<unknown> {
  return http({
    url: '/api/electricityBillExport',
    method: 'get',
    params: data,
    responseType: 'blob',
    headers: {
      'content-disposition': 'attachment;filename=total.csv',
      'content-type': 'application/x-download;charset=utf-8'
    }
  })
}
