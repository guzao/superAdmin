/** 项目基本信息数据模型 */
export type ProjectBaseInfoModel = {
  /** 累计充电量 */
  acc_charge: number,
  /** 累计放电量 */
  acc_discharge: number,
  /** 项目产品数 */ 
  b_num: number,
  /** 项目code */
  code: string,
  /** 客户 */ 
  customer: string,
  /** 能量 */ 
  energy: number,
  /** 异常产品数 */
  error_num: number,
  /** 名称 */
  name: string,
  /** 地址 */ 
  addr: string,
  /** 功率 */ 
  power: number,
  /** 投运日期 */ 
  running_time: string | Date,
  /** 累计收益 */
  sum_profit: number,
  /** 投运时长 */
  time: number
}


/** 电器连接图 */
export type ConnectionDiagramDataModel = {
  /** 有功功率 */ 
  active_power: number,
  /** 无功功率 */
  reactive_power: number,
  name: '',
  /** 子级设备 */ 
  children: Array<
    {  
      /** 有功功率 */ 
      active_power: number
      name: string
      /** 无功功率 */
      reactive_power: number 
    }
  >
}


/***/ 


