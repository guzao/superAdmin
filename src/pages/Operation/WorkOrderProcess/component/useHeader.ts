import { ref } from 'vue';


export function useHeader() {


  const isShowProjectInfo = ref<boolean>(false)
  const showProjectInfo = () => isShowProjectInfo.value = !isShowProjectInfo.value


  const isShowSelect = ref<boolean>(false)
  const showSelect = () => isShowSelect.value = !isShowSelect.value



  return {
    showProjectInfo,
    isShowProjectInfo,
    isShowSelect,
    showSelect
  }
}