import { ElMessage } from 'element-plus';
import { ref, reactive } from 'vue'
import { myProjectInfo, myProjectList, myProductList, waringList } from '@/api'
import { respondBaseInfo, ProjectList, DeviceDataList , AlarmDataModel } from '@/types'
import { ProjectBaseInfoModel, ConnectionDiagramDataModel } from './data.dt'
import { respondState } from '@/enums'
import { setUserCurrentProjectCode, getUserCurrentProjectCode , transfromProductDataSignal } from '@/utils'

export function useData () {
  /** 数据加载框 */
  const loading = ref<boolean>(false)
  /** 列表数据加载框 */
  const listLoading = ref<boolean>(false)

  /** 项目基本信息 */ 
  const projectBaseInfo = ref< ProjectBaseInfoModel | null >(null)

  /** 项目连接图 */ 
  const connectionDiagramData = ref<Array<ConnectionDiagramDataModel>>([])

  /** 项目列表 */
  const projectDataList = ref<Array<ProjectList>>([])

  /** 是否展示选择项目弹窗 */
  const isShowSelectBox = ref(false)

  /** 用户当前查看的项目code */
  const currentProjectCode = ref<string>(getUserCurrentProjectCode())

  /** 查看设备列表 */ 
  const showDeviceList = ref<boolean>(false)
  /** 设备列表数据 */
  const deviceData = reactive<DeviceDataList>({
    total: 0,
    deviceList: []
  })

  /** 查看实时告警列表 */ 
  const showAlarmList = ref<boolean>(false)
  /** 实时告警数据 */
  const alarmData = reactive<AlarmDataModel>({
    total: 0,
    alarmList: []
  })

  /** 获获取PC端项目信息 */
  function getMyProjectInfo(data: { code: string }) {
    loading.value = true
    isShowSelectBox.value = false
    currentProjectCode.value = data.code
    
    /** 设置 用户当前查看的项目 */ 
    setUserCurrentProjectCode(data.code)

    myProjectInfo(data).then(res => {
      const { code, data, msg } = res as respondBaseInfo
      if (code === respondState.SUCCESS) {
        const { power, project } = data
        projectBaseInfo.value = project
        connectionDiagramData.value = power
      } else {
        ElMessage.error(msg)
      }
      loading.value = false
    })
  }

  /** 获获取PC端项目列表 */ 
  function getMyProjectData (data?: { keys?: string }) {
    myProjectList(data).then(res => {
      const { code, data, msg } = res as respondBaseInfo
      if (code === respondState.SUCCESS) {
        projectDataList.value = data
      } else {
        ElMessage.error(msg)
      }
    })
  }
  
  /** 展示选择项目弹窗 */ 
  function showSelectBox (value: boolean) {
    isShowSelectBox.value = !isShowSelectBox.value
  }

  /** 重置筛选条件 */ 
  function resetting () {
    console.log('== resetting ==')
  }

  /** 查询项目 */
  function serachProject (value: string) {
    console.log('== serachProject ==', value)
    getMyProjectData({ keys: value })
  }

  /** 
   * * 展示对话框
   * * type == 1 设备
   * * type == 2 告警列表
  */ 
  function showDialog (type:  any) {
    if (type == 1) {
      showDeviceList.value = true
      getProductList({code: currentProjectCode.value})
    }
    if (type == 2) {
      showAlarmList.value = true
      getWaringList({ code: currentProjectCode.value })
    }
  }

  /** 获取PC产品列表信息 (设备信息) */
  function getProductList (data: { keys?: string, code: string, page?: number, page_size?: number }) {
    listLoading.value = true
    myProductList(data).then(res => {
      const { code, data, msg } = res as respondBaseInfo
      if (code == respondState.SUCCESS) {
        const { data: deviceList, total } = data
        deviceData.total = total
        deviceData.deviceList = deviceList
        transfromProductDataSignal(deviceData.deviceList)
      } else {
        ElMessage.error(msg)
      }
      listLoading.value = false
    })
  }



  /** 获取PC实时告警信息 */
  function getWaringList (data:{ code: string, lv?: string | number  }) {
    listLoading.value = true
    waringList(data).then(res => {
      const { code, data, msg} = res as respondBaseInfo
      if (code == respondState.SUCCESS) {
        const { data: alarmList, total } = data
        alarmData.total = total
        alarmData.alarmList = alarmList
      } else {
        ElMessage.error(msg)
      }
      listLoading.value = false
    })
  }

  /** 根据故障不同等级检索数据 */
  function serachAlarmList (data: { page: number, page_szie: number }, value: number) {
    getWaringList({ ...data, code: currentProjectCode.value, lv: value })
  }


  /** 
   * * 分页事件 pagesize 事件 
   * * showDeviceList == true 是设备列表的分页事件
   * * showAlarmList == true  是实时告警列表的分页事件
  */
  function handleSizeChange(data: { page: number, page_szie: number }, value?: any) {
    if (showDeviceList.value) {
      getProductList({ code: currentProjectCode.value, ...data  })
    }

    if (showAlarmList.value) {
      getWaringList({ code: currentProjectCode.value, ...data, lv: value })
    }
  }

  /** 
   * * 分页事件 size 事件 
   * * showDeviceList == true 是设备列表的分页事件
   * * showAlarmList == true  是实时告警列表的分页事件
  */
  function handleCurrentChange(data: { page: number, page_szie: number }, value?: any) {
    if (showDeviceList.value) {
      getProductList({ code: currentProjectCode.value, ...data  })
    }

    if (showAlarmList.value) {
      getWaringList({ code: currentProjectCode.value, ...data , lv: value})
    }
  }





  return {
    loading,
    listLoading,
    getMyProjectInfo,
    projectBaseInfo,
    connectionDiagramData,

    getMyProjectData,
    projectDataList,

    showSelectBox,
    isShowSelectBox,

    resetting,
    serachProject,
    currentProjectCode,

    showDeviceList,
    showDialog,
    deviceData,

    showAlarmList,
    alarmData,
    serachAlarmList,

    handleSizeChange,
    handleCurrentChange
  }
}