import { respondState } from './../../../../enums/respond';
import { respondBaseInfo } from '@/types/respond';
import { ref } from 'vue';
import type { Ref } from 'vue';
import { overview } from '@/API'
import { MarkModel } from './Map.dt';
import { ElMessage } from 'element-plus';






/** 高德地图类 */
const AMap = window?.AMap;
export class GDMap {
  /** 地图实例 */ 
  public GDMapInstance: any

  /** 实际生成的分布点 */
  public markPonits: Array<any> = []
  
  constructor (container: string) {
    this.initMap(container)
  }

  /** 初始化地图 */ 
  initMap (container: string): void {
      this.GDMapInstance = new AMap.Map(container, {
        zoom: 4.8,
        mapStyle: "amap://styles/whitesmoke",
        features: ["bg", "point", "road"],
        center: [107.325777, 37.532983 ]
      });
      this.gdMapOnMounted()
  }

  /** 地图初始化完成事件 */
  gdMapOnMounted (): Promise<unknown> {
    return new Promise((resolve, reject) => {
      this.GDMapInstance.on('complete', () => {
        resolve('ok')
      })
    })
  }

  /** 添加散点 */ 
  addMarkPoints (markerPointList: Ref<Array<MarkModel>> ) {
    this.clearMarkPoint()
    this.markPonits = markerPointList.value.map((item) => {
      const { lat, long, name } = item
      return new AMap.Marker({
        map: this.GDMapInstance, 
        position: [ long, lat],  
        title: name,
      });
    })

  }

  /**  地图缩放事件 */
  gdMapZoomEvent (calkBack: Function) : void {
    this.GDMapInstance.on('zoomend', (e) => {
      const zoom = this.GDMapInstance.getZoom()
      calkBack(zoom, e)
    });
  }

  /** 清除散点 */ 
  clearMarkPoint () : void {
    this.GDMapInstance.remove(this.markPonits);
    this.markPonits = []
  }


  
}




/** 实例化地图 */
export function useMap (container: string): GDMap{
  const instanceMap = new GDMap(container)
  return instanceMap
}

/** 地图数据 */
export function useMapData () {

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


  return {
    markerPointList,
    getOverview
  }
}