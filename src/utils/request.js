// 导入axios
import axios from 'axios'
// 配置axios实例对象
const request = axios.create({
  // 配置项
  baseURL: 'http://ttapi.research.itcast.cn'
})
// 请求拦截器
request.interceptors.request.use(
  function (config) {
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
