import { ElMessage } from 'element-plus';
import { ref, reactive } from 'vue'
import { respondBaseInfo } from '@/types';
import { respondState } from '@/enums';
import { electricityBill, electricityBillExport } from '@/API'
import { FormType, BillDataModel } from './data.dt';
import { getUserCurrentProjectCode } from "@/utils";
const allDayTime = 24 * 60 * 60 * 1000

/** 注册数据 */
export function useData () {
  /** 获取电量账单 */
  function getElectricityBill () {
    const params = {
      code: form.code,
      type: form.type,
      start_time: processFormatDate(form.type, formatDate(form.start_time as Date)),
      end_time: processFormatDate(form.type, formatDate(form.end_time as Date))
    }
    loading.value = true
    electricityBill(params).then(res => {
      const { code, data, msg } = res as respondBaseInfo
      if (code == respondState.SUCCESS) {
        const { data: tableData, charge,  discharge, profit } = data
        billData.data = tableData
        billData.charge = charge
        billData.discharge = discharge
        billData.profit = profit
      } else {
        ElMessage.error(msg)
      }
      loading.value = false
    })
  }



  const code = ref<string>(getUserCurrentProjectCode())
  /** 数据加载状态 */
  const loading = ref<boolean>(false)
  /** 账单列表数据 */
  const billData = reactive<BillDataModel>({
    charge: 0,
    data: [],
    discharge: 0,
    profit: 0,
  })

  /** 表单数据 */ 
  const form = reactive<FormType>({
    code: code.value,
    start_time: new Date(+new Date() - (allDayTime * 7)),
    end_time: new Date(),
    type: 1,
  });

  /** 统计维度切换事件 */
  const typeChange = (value: number) => {
    switch (value) {
      case 1:
        form.start_time = new Date(+new Date() - (allDayTime * 7))
        form.end_time = new Date()
        break;
      case 2:
        form.start_time = new Date(new Date().getFullYear(), new Date().getMonth() - 1,)
        form.end_time = new Date()
        break;
      case 3:
        form.start_time = new Date(new Date().getFullYear() - 1, 1)
        form.end_time = new Date()
        break;
    }
  }

  /** 重置筛选条件 */
  const reseting = () => {
    form.start_time = new Date(+new Date() - (allDayTime * 7))
    form.end_time = new Date()
    form.type = 1
    getElectricityBill()
  }

  /** 下载账单 */
  const downloadBill = () => {
    const params = {
      code: form.code,
      type: form.type,
      start_time: processFormatDate(form.type, formatDate(form.start_time as Date)),
      end_time: processFormatDate(form.type, formatDate(form.end_time as Date))
    }
    electricityBillExport(params).then(res => {
      let url = window.URL.createObjectURL(res as Blob)
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', 'excel.csv')
      document.body.appendChild(link)
      link.click()
    })
  }

  return {
    getElectricityBill,
    typeChange,
    downloadBill,
    reseting,
    loading,
    billData,
    form,
  }

}

type formatDateModel =  {
  Y: number;
  M: string | number;
  D: string | number;
}

function formatDate (date: Date): formatDateModel {
  const Y = date.getFullYear()
  const M = date.getMonth() + 1 < 9 ?  `0${date.getMonth() + 1}` : date.getMonth() + 1
  const D = date.getDate() < 9 ? `0${date.getDate()}` : date.getDate() 
  return {
    Y,
    M,
    D
  }
}

function processFormatDate (type: number | string, date: formatDateModel) {
  switch (type) {
    case 1:
      return `${date.Y}-${date.M}-${date.D}`
    case 2:
      return `${date.Y}-${date.M}`
    case 3:
      return date.Y
    default:
      break;
  }
}