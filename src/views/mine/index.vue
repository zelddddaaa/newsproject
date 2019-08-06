<template>
    <div>
        <!-- 未登录 使用组件带- -->
        <un-login v-if="!$store.state.user"></un-login>
        <!-- 登录后 -->
        <user-info v-else></user-info>
    </div>
</template>

<script>
// 导入用户信息组件 帕斯卡命名法
import UserInfo from './components/user-info.vue'
// 导入未登录组件
import UnLogin from './components/un-login.vue'
export default {
  name: 'MyIndex',
  // 注册组件
  components: {
    UserInfo,
    UnLogin
  }

}
</script>

<style>

</style>
