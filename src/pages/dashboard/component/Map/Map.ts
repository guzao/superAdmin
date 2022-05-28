import { respondState } from '@/enums/respond';
import { respondBaseInfo } from '@/types/respond';
import { ref } from 'vue';
import type { Ref } from 'vue';
import { overview } from '@/API'
import { MarkModel } from './Map.dt';
import { ElMessage } from 'element-plus';

/** 获取首页地图点信息 项目产品所在地址 */
function getOverview (area?: string): Promise<void> {
  return new Promise((resolve, reject) => {
    overview({area}).then(res => {
      const { code, data, msg } = res as respondBaseInfo
      if (code == respondState.SUCCESS) {
        markerPointList.value = data.data
        resolve(data.data)
      } else {
        ElMessage.error(msg)
        reject('error')
      }
    })
  }) 
}

/** 项目、产品数据 */ 
const markerPointList = ref<Array<MarkModel>>([])

/**地图加载loadin*/
const mapLoading = ref<boolean>(true)

const AMap = window?.AMap;
export class GDMap {
  /** 地图实例 */ 
  public GDMapInstance: any

  /** 实际生成的分布点 */
  public markPonits: Array<any> = []

  /** 初始化时地图缩放等级 */ 
  public initZoomLevel: number;

  /** 是否是城市层级 */
  public isCityLevel: boolean = false

  
  constructor (GDMapInstance: any) {
    this.GDMapInstance = GDMapInstance
    this.initZoomLevel = this.GDMapInstance.getZoom()
    this.zoomEvent()
  }

  /** 地图初始化完成事件 */
  gdMapOnMounted (): Promise<unknown> {
    return new Promise((resolve, reject) => {
      this.GDMapInstance.on('complete', () => {
        resolve('ok')
      })
    })
  }

  /** 添加散点 注册点击事件 */ 
  addMarkPoints (markerPointList: Ref<Array<MarkModel>>, type?: string) {
    this.clearMarkPoint()
    this.markPonits = markerPointList.value.map((item) => {
      const { lat, long, name, b_num } = item
      const content = type 
                          ? `<div class="device_box"></div>`
                          : `<div class="product_box"> ${ b_num } </div>`
      return new AMap.Marker({
        map: this.GDMapInstance, 
        content: content,
        position: [ long, lat],  
        title: name,
        offset: type 
                    ? [-5, -5] 
                    : [-20, -32]
      });
    })
    this.clickEvent(this.markPonits)
  }

  /** 地图缩放到不同等级触发不同逻辑 */
  zoomEvent () {
    this.GDMapInstance.on('zoomend', async () => {
      // const zoom = this.GDMapInstance.getZoom()
      // if (zoom <= 8 && zoom <= 4.8 ) {
      //   await getOverview()
      //   this.addMarkPoints(markerPointList)
      // } else if (zoom >= 9 && zoom >= 13 ) {
      //   await getOverview()
      //   this.addMarkPoints(markerPointList, 'city')
      // }
    })
  }

  /** 清除散点 */ 
  clearMarkPoint () : void {
    this.GDMapInstance.remove(this.markPonits);
    this.markPonits = []
  }

  /** 地图缩放事件 */ 
  gdMapZoomAction (type: string) {
    const currentZoomNumber: number = this.GDMapInstance.getZoom()
    switch (type) {
      case '+':
        this.GDMapInstance.setZoom(currentZoomNumber + 1)
        break;
      case '-':
        this.GDMapInstance.setZoom(currentZoomNumber - 1)
        break;
    
      default:
        break;
    }
  }

  /** 点击事件 */
  clickEvent (markPonits: Array<any>) {
    markPonits.forEach(item => {
      item.on('click', async (e: any) => {
        const currentZoomNumber = this.GDMapInstance.getZoom()
        const { target: { dom: { title } } } = e
        const { lat, long, code } = this.findCityData(title) as MarkModel
        if (currentZoomNumber == 12) {
          console.log('note tobe city todo something ',  code)
        } else {
          this.GDMapInstance.setZoomAndCenter(12, [long, lat])
          await getOverview(title)
          this.addMarkPoints(markerPointList, 'city')
        }
      })
    })
  }

  /** 返回地图初始缩放等级 */
  async mapZoomLevelGoback () {
    this.GDMapInstance.setZoomAndCenter(this.initZoomLevel, [107.325777, 37.532983])
    await getOverview()
    this.addMarkPoints(markerPointList)
  }

  /** 地图销毁事件 */ 
  destroy () {
    this.GDMapInstance.off('zoomend')
    this.clearMarkPoint()
    this.GDMapInstance.destroy()
  }

  /** 根据城市名获取城市数据 */
  findCityData (title: string) {
    return markerPointList.value.find(item => item.name == title)
  }



}



/** 地图数据 */
export function useMapData () {
  return {
    markerPointList,
    mapLoading,
    getOverview
  }
}

