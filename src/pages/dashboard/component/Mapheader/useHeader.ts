import { ref } from "vue";
import { projectSummary } from "@/API";
import { respondBaseInfo } from "@/types";
import { respondState } from "@/enums";
import { ElMessage } from "element-plus";
type dataModel = {
  /** 产品总数 */
  b_num?: number;
  /** 累计充电 */
  charge?: number;
  /** 累计放电 */
  discharge?: number;
  /** 异常产品总数 */
  err_num?: number;
  /** 离线产品总数 */
  off_line?: number;
};
export function useHeaderData() {
  const collectData = ref<dataModel>({});
  
  /** 获取总览数据 */
  async function getProjectSummary(): Promise<void>{
    let { code, data, msg } = (await projectSummary({})) as respondBaseInfo;
    if (code == respondState.SUCCESS) {
      collectData.value = data;
    } else {
      ElMessage.error(msg);
    }
  }
  return {
    collectData,
    getProjectSummary
  }
}