// 导入axios
import axios from 'axios'
// 导入store
import store from '@/store.js'
// 导入JSONBig 记得下载
import JSONBig from 'json-bigint'
// 配置axios实例对象
const request = axios.create({
  // 配置项
  baseURL: 'http://ttapi.research.itcast.cn'
})
// 配置JSONBig响应转换
request.defaults.transformResponse = [
  function (data) {
    try {
      return JSONBig.parse(data)
    } catch (error) {
      return data
    }
  }
]
// 请求拦截器
request.interceptors.request.use(
  function (config) {
    // 登录后,配置请求头
    const { user } = store.state
    // 排除登录请求,且登陆完成后,且user中存有token信息
    config.url !== '/app/v1_0/authorizations' && user && (config.headers.Authorization = `Bearer ${user.token}`)
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
// 响应拦截器
request.interceptors.response.use(
  function (response) {
    // 直接返回所需data,避免解构
    return response.data.data || response.data
  },
  function (err) {
    return Promise.reject(err)
  }
)
// 导出实例对象
export default request
