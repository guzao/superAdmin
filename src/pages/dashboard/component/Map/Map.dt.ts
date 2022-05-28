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



/** 项目数据模型  */ 
export type CardModel = {
  /** 地址 */
  address: "测试地址",
  /** 设备id */
  id: 3,
  /** 产品型号 */
  name: "型号1",
  /** 设备状态 状态1正常2离线3故障 */
  state: 3,
  /** 运行时长 */
  time: "21天",
  /** 地址 */ 
  addr?: string,
  /** 投运日期 */ 
  run_time?: string | Date
}