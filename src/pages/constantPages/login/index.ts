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

  const ruleFormRef = ref<FormInstance>()
  const userForm = reactive({
    name: 'test1',
    password: 'Test$123',
    key: '',
    captcha: ''
  })

  const rules = {
    name: [
      { required: true, message: '必须输入用户名', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '必须输入密码', trigger: 'blur' }
    ],
    captcha: [
      { required: true, message: '必须输入验证码', trigger: 'blur' }
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
      getCode()
      userForm.captcha = ''
      ElMessage({
        showClose: true,
        message: msg,
        type: 'error',
      })
    }
    
  }

  const img = ref('')
  const getCode = async () => {
    let res = await getCaptcha({})
    const { msg, code, data } = res
    if (code === respondState.SUCCESS) {
      const { img: imgUrl, key } = data.url
      userForm.key = key
      img.value = imgUrl
    }
  }

  return {
    userForm,
    rules,
    ruleFormRef,
    img,
    getCode,
    handleLogin
  }
}