import { AlarmListModel } from "@/types";



/** 获取告警列表模型 */
export type FromModel = {
  code: string,
  start_time: Date ,
  end_time: Date,
  lv?: number | string
}



/** 返回表格数据模型 */
export type TableModel = {
  data: Array<AlarmListModel>;
  total: number
}