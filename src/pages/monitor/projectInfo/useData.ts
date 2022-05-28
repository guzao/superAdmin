import { ref } from 'vue'
import { myProjectInfo } from '@/api'


export function useData () {
  function getMyProjectInfo(data: { code: string }) {
    /** 获获取PC端项目信息 */
    myProjectInfo(data).then(res => {
      console.log(res)
    })
  }

  return {
    getMyProjectInfo
  }
}