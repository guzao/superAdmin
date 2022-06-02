import { setUserCurrentProjectCode } from '@/utils';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import { useRouter } from "vue-router"
import { indexSearch } from '@/API'
import { respondBaseInfo,  } from '@/types';
import { respondState } from '@/enums';
import { CardModel } from './Map.dt';


export function userSearchBoxData () {
  const router = useRouter()

  /** 是否展开卡片列表 */ 
  const isListOpen = ref<boolean>(false)
  /** 卡片列表 */ 
  const cardList = ref<Array<CardModel>>([])

  /** 获取卡片列表数据 */
  function getIndexSearch (data?: { key?: string, type?: number }) {
    indexSearch(data).then((res) => {
      const { code, data, msg } = res as respondBaseInfo
      if (code === respondState.SUCCESS) {
        cardList.value = data.data as Array<CardModel>
      } else {
        ElMessage.error(msg)
      }
    })
  }

  /**  设设置列表卡片的展开收起 */ 
  const listChange =  (): boolean => isListOpen.value = !isListOpen.value;


  /** 关键词 */ 
  const searchKey = ref<string>('')
  /** 是否展开筛选条件 */ 
  const isListOpenFilter = ref<boolean>(false)
  /**  设置筛选条件展开收起 */ 
  const filterChange =  (): boolean => isListOpenFilter.value = !isListOpenFilter.value;

  /** 
   * * 根据不用的状态跳转到不同页面
   * * value.addr 存在   去到项目  ==> 这里存选中的项目code
   * * value.addr 不存在 去到设备列表
  */
  const pathJumpingDetection = (value: CardModel) => {
    const { addr, code } = value
    if (addr) {
      setUserCurrentProjectCode(code as string)
      router.push('/monitor/projectInfo')
    } else {
      console.log('去到设备')
      router.push('/monitor/productInfo')
    }
  }

  return {
    listChange,
    isListOpen,
    getIndexSearch,
    cardList,

    searchKey,
    isListOpenFilter,
    filterChange,
    pathJumpingDetection
  }
}