import Vue from 'vue'
import Vuex from 'vuex'
// 导入处理token的模块
import * as auth from '@/utils/auth.js'
Vue.use(Vuex)
// 使用Vuex将token保存,方便在多个组件内共享使用
export default new Vuex.Store({
  state: {
    // 调用此方法,返回包含有token的对象
    user: auth.getUser()
  },
  mutations: {
    setUser (state, data) {
      // 修改state中存的token
      state.user = data
      // 更新local存储的token
      auth.setUser(state.user)
    }
  },
  actions: {

  }
})
