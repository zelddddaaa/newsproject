<template>
  <div>
    <!-- 子路由 把加载过的页面缓存下来-->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <van-tabbar active-color="#07c160" inactive-color="#000" v-model="activeIndex" route>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <!-- 登录后显示我的,未登录显示未登录 -->
      <van-tabbar-item icon="search" to="/mine">{{$store.state.user? '我的' : '未登录'}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'TabBarIndex',
  data () {
    return {
      activeIndex: 1
    }
  }
}
</script>

<style>
</style>
