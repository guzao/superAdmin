 
/**
 * * 用户菜单
 * * 用户路由
*/
export type MenuType = {
  /** 路径 */
  path: string,
  /** 组件 */
  component: string | any,
  /** 路由名称 */
  name?: string,
  /** 路由信息 */
  meta: {
    /** 路由标题 */
    title: string,
    icon?: string
  },
  /** 子路由 */
  children?: Array<MenuType>
}


/** 用户项目列表数据模型 */ 
export type ProjectList = {
  /** 项目产品数 */
  b_num: number,
  /** 累计充电量 */
  charge: number,
  /** 项目code */
  code: string,
  /** 累计充电量 */
  discharge: number,
  /** 异常产品数 */ 
  err_num: number,
  /** 名称 */
  name: string,
  /** 累计收益 */
  profit: number
}


/** 设备列表数据模型 */
export type DeviceList = {
  /** 产品id */
  id:	number,
  /** 产品号 */
  order_num:	number	,
  /** 地址 */
  address:	string	,
  /** 投运日期 */
  start_time:	string	,
  /** 项目名称 */ 
  code_name:	string	,
  /** 客户 */ 
  customer:	string	,
  /** 产品名称 */ 
  name:	string	,
  /** 产品型号 */ 
  model:	string	,
  /** 产品规格 */ 
  specs:	string	,
  /**产品编号*/ 
  number:	string	,
  /**产品版本*/ 
  version:	string	,
  /**运行天数*/ 
  time:	string	,
  /**soc*/ 
  soc:	string	,
  /**soh*/ 
  soh:	string	,
  /**最大电压*/ 
  maxVolt:	string	,   
  maxVoltSignal?: string, // Signal
  /**最小电压*/ 
  minVolt:	string	,
  minVoltSignal?:	string	,
  /**最大温度*/ 
  maxTemp:	string	,
  maxTempSignal?:	string	,
  /**最小温度*/ 
  minTemp:	string	,
  minTempSignal?:	string	,
  /**实时电压*/ 
  volt:	string,
  voltSignal?:	string,
  /**实时电流*/ 
  current:	string	,
  currentSignal?:	string	,
  /**累计充电量*/ 
  accCharge:	string	,
  accChargeSignal?:	string	,
  /**累计放电量*/ 
  acaDischarge:	string	,
  acaDischargeSignal?:	string	,
  /**气体检测浓度*/ 
  concentration:	string	,
  concentrationSignal?:	string	,
  /**有功功率*/ 
  activePower:	string	,
  activePowerSignal?:	string	,
  /**无功功率*/ 
  reactivePower:	string,
  reactivePowerSignal?:	string,
  /** 异常状态 */ 
  err_state: number
}

/** 项目设备列表数据模型 */
export type DeviceDataList = {
  /** 多少条数据 */
  total: number,
  deviceList: Array<DeviceList>
}



/** 告警列表数据模型 */
export type AlarmListModel = {
  /** 告警名称 */
  name:	string	,
  /** 告警类型 */
  dev_name:	string	,
  /** 告警等级 */
  lv:	string	,
  /** 告警开始时间 */
  start:	string	,
  /** 告警持续时间 */
  last:	string	,
  /** 告警结束时间 */
  end:	string,
  id?: number,
  /**  设备 */ 
  device?: string,
  /**  设备id */ 
  device_id?: number,
  /** 设备类型 */
  device_type?: string,
  /** 信息 */
  info?: any,
  /** 告警推送时间 */
  push_time?: string,
}

/** 告警数据模型  */
export type AlarmDataModel = {
  /** 多少条数据 */
  total: number,
  alarmList: Array<AlarmListModel>
}