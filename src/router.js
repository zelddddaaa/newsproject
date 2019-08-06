import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      // 登录
      path: '/login',
      name: 'login',
      // 路由懒加载 自动加载index开头的文件
      component: () => import('@/views/login')
    }, {
      // 主页
      path: '/',
      component: () => import('@/views/tabbar-layout'),
      children: [{
        path: '/',
        name: 'home',
        component: () => import('@/views/home')
      }, {
        path: '/mine',
        name: 'mine',
        component: () => import('@/views/mine')
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
    }, {
      // 文章详情
      name: 'article',
      // 路径传参
      path: '/article/:article_id',
      component: () => import('@/views/article')
    }, {
      // 编辑用户信息
      name: 'user-profile',
      path: '/user-profile',
      component: () => import(`@/views/user-profile`)
    }
  ]
})
