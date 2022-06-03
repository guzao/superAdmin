import { DeviceList } from '@/types'


/**
 * * 使用空格' '截取出 数据数值 和单位
 * * 只可转换设备数据列表
*/
export function transfromProductDataSignal (data: Array<DeviceList>) {
  data.forEach(item => {
    {
      const [ value, signal ] = splittingSpaceToArray(item.maxTemp)
      item.maxTemp = value
      item.maxTempSignal = signal
    }
    {
      const [ value, signal ] = splittingSpaceToArray(item.minTemp)
      item.minTemp = value
      item.minTempSignal = signal
    }
    {
      const [ value, signal ] = splittingSpaceToArray(item.maxVolt)
      item.maxVolt = value
      item.maxVoltSignal = signal
    }
    {
      const [ value, signal ] = splittingSpaceToArray(item.minVolt)
      item.minVolt = value
      item.minVoltSignal = signal
    }
    {
      const [ value, signal ] = splittingSpaceToArray(item.accCharge)
      item.accCharge = value
      item.accChargeSignal = signal
    }
    {
      const [ value, signal ] = splittingSpaceToArray(item.acaDischarge)
      item.acaDischarge = value
      item.acaDischargeSignal = signal
    }
    {
      const [ value, signal ] = splittingSpaceToArray(item.volt)
      item.volt = value
      item.voltSignal = signal
    }
    {
      const [ value, signal ] = splittingSpaceToArray(item.current)
      item.current = value
      item.currentSignal = signal
    }
    {
      const [ value, signal ] = splittingSpaceToArray(item.activePower)
      item.activePower = value
      item.activePowerSignal = signal
    }
    {
      const [ value, signal ] = splittingSpaceToArray(item.reactivePower)
      item.reactivePower = value
      item.reactivePowerSignal = signal
    }
    {
      const [ value, signal ] = splittingSpaceToArray(item.concentration)
      item.concentration = value
      item.concentrationSignal = signal
    }
  })
}

function splittingSpaceToArray (value: string) {
  return value.split(' ')
}




/**
 * * 日期转时间戳
*/ 
export function dateToTimestamp (date: Date) {
  if (date instanceof Date) {
    return +date / 1000
  }
  return new Error('params is not Date Object')
}
