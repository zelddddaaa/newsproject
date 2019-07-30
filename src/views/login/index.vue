<template>
  <div>
    <!-- 导航 -->
    <van-nav-bar title="登录" />
    <!-- 表单 -->
    <form action="/" method="post">
      <van-cell-group>
         <!-- 使用v-validate指令 值为规则名,设置name属性,错误提示 errors.first('name属性值') -->
        <van-field v-model="user.mobile" label="手机号" placeholder="请输入手机号"  required clearable name="phone" :error-message="errors.first('phone')" v-validate="'required|phone'"/>
        <van-field v-model="user.code" label="密码" placeholder="请输入密码" type="password" required/>
      </van-cell-group>
      <van-button type="info" :loading="loginLoading" block @click.prevent="handleLogin">登录</van-button>
    </form>
  </div>
</template>

<script>
// 导入后台请求方法login
import { login } from '@/api/user.js'
// 导入mapmutations
import { mapMutations } from 'vuex'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '18801185985',
        code: '246810'
      },
      loginLoading: false
    }
  },
  methods: {
    // 配置setUser方法
    ...mapMutations(['setUser']),
    async handleLogin () {
      // 开启载入动画
      this.loginLoading = true
      try {
        // 验证规则
        this.$validator.validate()
          .then(async valid => {
            // 验证未通过
            if (!valid) {
              console.log('err...')
              // 关闭载入动画
              this.loginLoading = false
              return
            }
            // 验证通过,请求后台
            const data = await login(this.user)
            // data:{token,refresh_token}
            console.log(data)
            // 触发mutations中的方法,setUser,存入后台返回的包含有token的数据
            this.$store.commit('setUser', data)
            // 关闭载入动画
            this.loginLoading = false
            // 跳转到tab栏
            this.$router.push('/')
          })
      } catch (err) {
        this.loginLoading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.van-nav-bar {
  background-color: #1989fa;
  .van-nav-bar__title {
    color: #ffffff;
  }
}
</style>
