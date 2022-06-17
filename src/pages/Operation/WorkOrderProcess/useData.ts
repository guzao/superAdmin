import { ElMessage } from 'element-plus';
import { ref, reactive, onMounted } from 'vue'
import { waringList } from '@/API'
import { respondBaseInfo } from "@/types"
import { FromModel, TableModel } from './data.dt'
import { respondState } from '@/enums'
import { getUserCurrentProjectCode, dateToTimestamp } from '@/utils'

export function useData() {

  /** lodaing */
  const loading = ref<boolean>(false)

  /** 表单数据 */
  const form = reactive<FromModel>({
    code: getUserCurrentProjectCode(),
    start_time: new Date(),
    end_time: new Date(),
    lv: ''
  })

  /** 分页数据 */
  const pagination = reactive({
    page: 1,
    page_szie: 10,
  });

  /** 告警列表数据 */
  const statisticList = reactive<TableModel>({
    data: [],
    total: 0
  })


  /** 获取告警列表数据 */
  const getWaringList = () => {
    const { code, start_time, end_time, lv } = form
    loading.value = true
    const params = {
      code,
      start_time: dateToTimestamp(start_time),
      end_time: dateToTimestamp(end_time),
      lv
    }
    waringList(params).then(res => {
      const { code, data, msg } = res as respondBaseInfo
      if (code === respondState.SUCCESS) {
        // const { data: tableData, total } = data
        // statisticList.data = tableData
        // statisticList.total = total
        const arr = []
        let ot = true
        for (let i = 0; i < 14; i++) {
          let obj
          if (ot) {
            obj = { id: i, date: "2022-04-0" + (i + 1), accCharge: 200, acaDischarge: 188, batteryCycleEfficiency: 94, minimumBatteryOower: 300, minimumBatteryTemperature: 12.2, maximumBatteryTemperature: 56.4, estimatedIncome: 12.89 }
          } else {
            obj = { id: i, date: "2022-04-0" + (i + 1), accCharge: 320, acaDischarge: 211, batteryCycleEfficiency: 93, minimumBatteryOower: 300, minimumBatteryTemperature: 15.2, maximumBatteryTemperature: 52.7, estimatedIncome: 13.66 }
          }
          ot = !ot
          arr.push(obj)
        }
        statisticList.data = arr
        statisticList.total = arr.length
      } else {
        ElMessage.error(msg)
      }
      loading.value = false
    })
  }

  /** size变化事件 */
  const sizeChange = (size: number) => {
    pagination.page_szie = size
    pagination.page = 1
    getWaringList()
  }


  /** page变化事件 */
  const currentChange = (page: number) => {
    pagination.page = page
    getWaringList()
  }

  /** 根据条件查询数据 */
  const onSearch = () => {
    pagination.page = 1
    getWaringList()
  }

  /** 重置筛选条件 */
  const onResetting = () => {
    pagination.page = 1
    pagination.page_szie = 20
    form.start_time = new Date()
    form.end_time = new Date()
    form.lv = ''
    getWaringList()
  }

  /** 查看实时告警列表 */
  const chartVisible = ref<boolean>(false)

  /** 打开报表弹窗 */
  const onCreateChart = () => {
    chartVisible.value = true
  }

  /** 关闭报表弹窗 */
  const closeChartDialog = () => {
    chartVisible.value = false
  }


  onMounted(() => {
    getWaringList()
  })

  return {
    loading,
    form,
    pagination,
    statisticList,
    sizeChange,
    currentChange,
    onSearch,
    onResetting,
    chartVisible,
    closeChartDialog,
    onCreateChart
  }

}