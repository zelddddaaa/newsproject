import Vue from 'vue'
import App from './App.vue'
// 導入vuex
import Vuex from 'vuex'
// 引入Vant
import Vant from 'vant'
// 引入Vant样式
import 'vant/lib/index.css'
// 注册Vant
Vue.use(Vant)
// 注册Vuex
Vue.use(Vuex)
// 创建vuex实例
const store = new Vuex.Store({
  state: {
    count: 100,
    age: 20
  },
  // mutations操纵state中的数据,同步
  mutations: {
    setCount (state, payload) {
      console.log(payload, 'setCount')
      state.count = 300
    }
  },
  // 异步,返回数据给mutations中的方法,context传入的就是store
  actions: {
    acSetcount (context) {
      console.log('action中的方法')
      setTimeout(() => {
        const newcount = 1000
        // store.commit触发mutations中的方法
        context.commit('setCount', newcount)
      }, 1000)
    }
  }
})
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
