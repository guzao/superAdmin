import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
import { useUserData } from '@/stores'
import { respondState } from '@/enums'
import { login, getCaptcha } from '@/API'
import { ElMessage } from 'element-plus'


/**
 * 登录逻辑
*/
export function useLogin () {

  const router = useRouter()
  const userInfo = useUserData()
  const remember = ref<boolean>(false)
  const ruleFormRef = ref<FormInstance>()
  const userForm = reactive({
    name: 'test1',
    password: 'Test$123',
    authentication: ''
  })

  const rules = {
    name: [
      { required: true, message: '必须输入用户名', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '必须输入密码', trigger: 'blur' }
    ],
    authentication : [
      { required: true, message: '请拖动滑块进行认证', trigger: 'blur' }
    ]
  }

  const handleLogin = async () => {
    let isPass = await ruleFormRef.value?.validate()
    if (!isPass) return
    const res = await login(userForm)
    const { code, msg, data } = res as any
    if (code === respondState.SUCCESS) {
      const { original: { access_token, token_type } } = data
      router.push('/dashboard')
      userInfo.setUserToken(access_token)
      ElMessage({
        showClose: true,
        message: msg,
        type: 'success',
      })
    } else {
      ElMessage({
        showClose: true,
        message: msg,
        type: 'error',
      })
    }
  }

  const statusChange = () => userForm.authentication = 'success'


  return {
    userForm,
    rules,
    ruleFormRef,
    handleLogin,
    remember,
    statusChange
  }
}