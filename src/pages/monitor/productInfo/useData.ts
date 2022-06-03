import { ref, reactive, nextTick, onBeforeUnmount } from "vue";
import { ElMessage } from 'element-plus';
import { myProductList, myProduct } from '@/api'
import { respondBaseInfo, DeviceDataList , DeviceList} from '@/types'
import { respondState } from '@/enums'
import { deviceInfoModel, curveModel } from './data.dt'
import { getUserCurrentProjectCode, transfromProductDataSignal } from '@/utils'
import type { ECharts } from 'echarts'
import { userEcharts } from './useEcharts'

const { renderLine } = userEcharts()

export function useDataAndAction () {
  /** 图标实例 */ 
  let echartsInstance: ECharts;
  const resize = () => echartsInstance.resize()
  const echartsDom = ref<HTMLElement | null>(null) 
   /** 用户当前查看的项目code */
   const currentProjectCode = ref<string>(getUserCurrentProjectCode())
   /** 当前查看的设备id */
   const currentDeviceCode = ref<number>(1)
   /** 当前查看的设备数据 */
   const currentDeviceData = ref<DeviceList | null>(null)

  /*** 数据加载提示 */ 
  const listLoading = ref<boolean>(false)
  /** 是否弹出展示设备选择框 */
  const showSelectBox = ref<boolean>(false)
  /** 设备列表数据 */
  const deviceData = reactive<DeviceDataList>({
    total: 0,
    deviceList: []
  })
  /** 设备信息 */
  const deviceDataInfo = reactive<deviceInfoModel>({
    b_state: 0,
    curve: {
      unit: '',
      list: []
    },
    door_state: 1,
    fire_sprinkler: 1,
    immersion: 1,
    k1_state: 0,
    k2_state: 0,
    waring: 1,
  })




  /** 获取PC产品列表信息  */
  function getProductList (data: { keys?: string, code: string, page?: number, page_size?: number }) {
    listLoading.value = true
    myProductList(data).then(res => {
      const { code, data, msg } = res as respondBaseInfo
      if (code == respondState.SUCCESS) {
        const { data: deviceList, total } = data
        deviceData.total = total
        deviceData.deviceList = deviceList
        transfromProductDataSignal(deviceData.deviceList)
        currentDeviceData.value = deviceList[0]
        getMyProduct({
          code: currentProjectCode.value,
          order_num: currentDeviceCode.value,
          sub_id: currentDeviceData.value?.sub_id as number,
        });
      } else {
        ElMessage.error(msg)
      }
      listLoading.value = false
      
    })
  }

  /** 获取PC产品信息   (单个设备)*/
  function getMyProduct (data: { code: string, order_num: number, sub_id: number }) {
    listLoading.value = true
    myProduct(data).then(res => {
      const { code, data, msg } = res as respondBaseInfo
      if (code == respondState.SUCCESS) {
        const { curve, b_state, door_state, fire_sprinkler, immersion, k1_state, k2_state, waring } = data as deviceInfoModel
        deviceDataInfo.curve = curve
        deviceDataInfo.b_state = b_state
        deviceDataInfo.door_state = door_state
        deviceDataInfo.fire_sprinkler = fire_sprinkler
        deviceDataInfo.immersion = immersion
        deviceDataInfo.k1_state = k1_state
        deviceDataInfo.k2_state = k2_state
        deviceDataInfo.waring = waring
        nextTick(() => {
          echartsDom.value = document.getElementById('chart_box') as HTMLElement
          echartsInstance = renderLine(echartsDom.value, curve as curveModel)
          window.addEventListener('resize', resize)
        })
      } else {
        ElMessage.error(msg)
      }
      listLoading.value = false
    })
  }

  /*** 根据选中的设备查看详细信息 */ 
  const getProductInfo = (value: number) => {
    currentDeviceCode.value = value
    currentDeviceData.value = deviceData.deviceList.find(item => item.order_num == value) as DeviceList
    showSelectBox.value = false
    getMyProduct({ code: currentProjectCode.value, order_num: value, sub_id: currentDeviceData.value.sub_id })
  }

  /** 设备筛选事件 */
  const onSearchList = (code: string) => {
    getProductList({ code })
  }

  /** 当前页码变动事件 */
  const handleCurrentChange = (data: { page?: number, page_size?: number }, code: string) => {
    getProductList({ ...data, code })

  }
  /** 当前每页条数变动事件 */
  const handleSizeChange = (data: { page?: number, page_size?: number }, code: string) => {
    getProductList({ ...data, code })
  }

  /** 卸载事件 */
  onBeforeUnmount(() => {
    window.removeEventListener('resize', resize)
  })

  return {
    getProductList,
    getProductInfo,
    getMyProduct,
    handleCurrentChange,
    handleSizeChange,
    onSearchList,
    deviceDataInfo,


    listLoading,
    showSelectBox,
    currentProjectCode,
    currentDeviceCode,
    currentDeviceData,
    deviceData,
    echartsDom
  }
}