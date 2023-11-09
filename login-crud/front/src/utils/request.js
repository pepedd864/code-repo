import axios from "axios";
import {useUserStore} from "@/stores/index.js";

const userStore = useUserStore()

const errCode = {
  401: '登录失效，请重新登录',
  403: '没有权限',
  404: '请求地址错误',
  500: '服务器错误',
}

const request = axios.create({
  baseURL: '/api/', // 这里可以同环境变量中拿，
  //参考`.env` `.env.development`或者`.env.production`文件的使用
  timeout: 10 * 1000,
})

/**
 * 请求前拦截
 */
request.interceptors.request.use((config) => {
  const token = userStore.token
  if (token) {
    config.headers['authentication'] = `${token}`
  }
  return config
})

/**
 * 响应拦截器
 */
request.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const response = error.response
    const status = response.status
    const msg = response.data.msg || errCode[status] || response.statusText

    // 判断错误类型
    if (status === 401) {
      userStore.logout()
      router.push('/user/login')
    }

    message.error(msg)
  },
)

export default request
