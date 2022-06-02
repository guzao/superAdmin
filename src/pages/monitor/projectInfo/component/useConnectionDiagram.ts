import { defineProps, computed, PropType } from "vue";
import { ConnectionDiagramDataModel } from "../data.dt";


/** 注册函数 */
export function useAction (connectionData: ConnectionDiagramDataModel) {
  /** 计算连接线盒子宽度 */
  const boxWith = computed<number>(() =>
  connectionData?.children?.length
    ? (connectionData?.children?.length - 1) * 110
    : 220
  );

  /** 检测数组下标是否是 0 或者是数组的末尾下标  */
  const numberIsStartOrEnd = (index: number): boolean => {
  return index == 0 || index == (connectionData?.children?.length - 1) 
  }

  /** 查看24小时有功功率曲线 */ 
  const viewPowerCurve = (data) => {
    console.log(data)
  }

  return {
    boxWith,
    numberIsStartOrEnd,
    viewPowerCurve
  }

}