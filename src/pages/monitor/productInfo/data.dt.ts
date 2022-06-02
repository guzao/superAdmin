export type deviceInfoModel = {
  /** 是否有告警 0 没有 1有 */
  waring: number	,
  /** 设备状态1正常 2异常 */
  b_state: number	,
  /** 门禁状态 1关 2 开 */
  door_state: number	,
  /** 消防喷洒 1未喷洒 2 喷洒 */
  fire_sprinkler: number	,
  /** 是否浸水 1未浸水 2 浸水 */
  immersion: number	,
  /** 空调1状态 0无状态 1制冷2制热 */
  k1_state: number	,
  /** 空调2状态 0无状态 1制冷2制热 */
  k2_state: number	,
  /** 24小时功率曲线 */
  curve?: curveModel
}

export type curveModel = {
  /** 功率 单位 */
  unit: string,
  /** 实时功率曲线数据 */
  list: []
}