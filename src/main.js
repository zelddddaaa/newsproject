import Vue from 'vue'
import App from './App.vue'
// 导入router
import router from './router'
// 导入store
import store from './store'
// 引入Vant
import Vant from 'vant'
// 导入表单验证组件
import VeeValidate, {
  Validator
} from 'vee-validate'
// 引入Vant样式
import 'vant/lib/index.css'
// 引入设置rem基准值
import 'amfe-flexible/index.min.js'
// 导入语言包,为什么报错?
import zh_CN from 'vee-validate/dist/locale/zh_CN'
// 注册Vant
Vue.use(Vant)
// 注册表单验证插件
Vue.use(VeeValidate)
// 语言包本地化
Validator.localize('zh_CN', zh_CN)
// 自定义验证规则,规则名phone
Validator.extend('phone', {
  // 提示消息
  getMessage: field => field + '格式不正确',
  validate: value => {
    return (
      value.length === 11 && /^((13|15|16|18|19)[0-9]{1})\d{8}$/.test(value)
    )
  }
})
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
