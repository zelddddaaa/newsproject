import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      // 登录
      path: '/login',
      name: 'login',
      // 路由懒加载
      component: () => import('@/views/login')
    }, {
      // 主页
      path: '/',
      component: () => import('@/views/tabbar-layout'),
      children: [{
        path: '/',
        name: 'home',
        component: () => import('@/views/home')
      }]
    }, {
      // 搜索
      path: '/search',
      name: 'search',
      // 路由懒加载
      component: () => import('@/views/search')
    }, {
      // 搜索结果
      path: '/search-result',
      name: 'search-result',
      component: () => import('@/views/search/search-result.vue')
    }
  ]
})
