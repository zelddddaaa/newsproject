// 导入axios
import axios from 'axios'
// 导入store
import store from '@/store.js'
// 导入JSONBig 记得下载
import JSONBig from 'json-bigint'
// 导入router,因为这是js不是vue,不能this.$router
import router from '@/router.js'
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
  // 处理token过期
  async function (err) {
    // state的user保存有refresh_token
    const { user } = store.state
    // 401 token过期
    if (err.response.status === 401) {
      // 用户未登录
      if (!user) {
        // 导向登录页面
        router.push({ name: 'login' })
      } else {
        // 用户登录 向后端发送更新token的请求
        // 用axios发送请求 因为request发送请求会被请求拦截器拦截,配置过期的token
        try {
          const { data: { data } } = await axios({
            method: 'PUT',
            url: `http://ttapi.research.itcast.cn/app/v1_0/authorizations`,
            headers: {
              Authorization: `Bearer ${user.refresh_token}`
            }
          })
          // 修改vuex中state和本地存储的token
          store.commit('setUser', {
            token: data.token,
            // refresh_token有效期14天,可以重复使用
            refresh_token: user.refresh_token
          })
          // 之间失效请求重新发送 err.config保存了之前失效请求的配置项
          return request(err.config)
        } catch (err) {
          // 还是报错,跳转回登录页面
          router.push({ name: 'login' })
        }
      }
    }
    return Promise.reject(err)
  }
)
// 导出实例对象
export default request
