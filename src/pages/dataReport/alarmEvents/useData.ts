import { ElMessage } from 'element-plus';
import { ref, reactive, onMounted } from 'vue'
import { waringList } from '@/API'
import { respondBaseInfo } from "@/types"
import { FromModel, TableModel } from './data.dt'
import { respondState } from '@/enums'
import { getUserCurrentProjectCode, dateToTimestamp } from '@/utils'

export function useData () {
  
  /** lodaing */
  const loading = ref<boolean>(false)

  /** 表单数据 */
  const form  = reactive<FromModel>({
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
  const alarmList = reactive<TableModel>({
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
      if (code ===  respondState.SUCCESS) {
        const { data: tableData, total } = data
        alarmList.data = tableData
        alarmList.total = total
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

  onMounted(() => {
    getWaringList()
  })

  return {
    loading,
    form,
    pagination,
    alarmList,
    sizeChange,
    currentChange,
    onSearch,
    onResetting
  }

}