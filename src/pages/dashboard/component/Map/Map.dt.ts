/** 产品数据模型 */
export type MarkModel = {
  /** 产品id */
  code: string,
  /** 产品名称 */
  name: string,
  /** 项目产品数 */ 
  b_num: number,
  /** 经度 */ 
  long: number,
  /** 维度 */ 
  lat: number,
  /** 地址 */ 
  addr: string,
  /** 功率 */ 
  power: number,
  /** 能量 */ 
  energy: number,
  /** 投运日期 */ 
  run_time: string | Date
}