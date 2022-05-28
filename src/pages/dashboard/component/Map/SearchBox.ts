import { ElMessage } from 'element-plus';
import type { Ref } from 'vue';
import { ref } from 'vue';
import { indexSearch } from '@/API'
import { respondBaseInfo } from '@/types';
import { respondState } from '@/enums';
import { CardModel } from './Map.dt';


export function userSearchBoxData () {

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

  return {
    listChange,
    isListOpen,
    getIndexSearch,
    cardList,

    searchKey,
    isListOpenFilter,
    filterChange
  }
}