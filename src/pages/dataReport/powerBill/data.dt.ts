/** 表单字段模型 */ 
export type FormType = {
  code: string,
  type: number | string,
  start_time: Date | string | number,
  end_time: Date | string | number,
}


/** 账单表格 */ 


/** 电量账单模型字段 */
export type BillDataModel = {
  /** 累计充电 */ 
  charge: number,
  /** 账单表格 */ 
  data: Array<object>,
  /** 累计放电 */ 
  discharge: number,
  /** 收益 */ 
  profit: number,

}