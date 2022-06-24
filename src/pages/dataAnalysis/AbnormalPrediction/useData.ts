import { ElMessage } from 'element-plus';
import { ref, reactive, onMounted } from 'vue'
import { waringList } from '@/API'
import { respondBaseInfo } from "@/types"
import { FromModel, TableModel } from './data.dt'
import { respondState } from '@/enums'
import { getUserCurrentProjectCode, dateToTimestamp } from '@/utils'
import { type } from 'os';

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
        let noNumber = 748595
        const nameArr = [
          '短路保护',
          '软启动异常',
          '主解除器异常',
          '输出电压异常',
          '输出电压不符合离网条件',
          '逆变软件过流',
          '逆变硬件过流',
          '电池过压',
          '电池轻载欠压',
          '电池重载欠压',
          '主解除器异常',
          '主解除器异常',
          '主解除器异常'
        ]
        const typeArr = [
          1, 2, 3, 4, 5, 1, 2, 3, 3, 4, 4, 5, 5
        ]
        const stateArr = [
          3, 2, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1
        ]
        const abnormalTypeArr = [
          1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3, 3
        ]
        const buttonArr = [
          1, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 3
        ]
        for (let i = 0; i < 13; i++) {
          let obj = {
            id: i,
            name: nameArr[i],
            type: typeArr[i],
            no: 'TL-' + noNumber,
            address: '上海市浦江科技广场21号单元楼xxxx',
            state: stateArr[i],
            abnormalType: abnormalTypeArr[i],
            time: '2022-05-22 21:19:06',
            buttonType: buttonArr[i]
          }
          noNumber++
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