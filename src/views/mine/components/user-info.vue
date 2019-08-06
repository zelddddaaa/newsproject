<template>
  <van-cell-group class="user-info">
    <!-- is-link	是否展示右侧箭头并开启点击反馈 -->
    <van-cell
      class="base-info"
      is-link
      :border="false"
      @click="$router.push({ name: 'user-profile' })"
    >
      <div slot="title">
        <img :src="user.photo" alt="显示头像" class="avatar" />
        <span class="title">{{user.name}}</span>
      </div>
    </van-cell>
    <van-grid class="data-info" :border="false">
      <van-grid-item>
        <span class="count">{{user.art_count}}</span>
        <span class="text">头条</span>
      </van-grid-item>
      <van-grid-item>
        <span class="count">{{user.follow_count}}</span>
        <span class="text">关注</span>
      </van-grid-item>
      <van-grid-item>
        <span class="count">{{user.fans_count}}</span>
        <span class="text">粉丝</span>
      </van-grid-item>
      <van-grid-item>
          <span class="count">{{user.like_count}}</span>
          <span class="text">获赞</span>
      </van-grid-item>
    </van-grid>
  </van-cell-group>
</template>

<script>
// 导入获取用户个人信息的请求api
import { getCurrentUserInfo } from '@/api/user.js'
export default {
  name: 'UserInfo',
  data () {
    return {
      user: {}
    }
  },
  created () {
    this.loadUserInfo()
  },
  methods: {
    async loadUserInfo () {
      const data = await getCurrentUserInfo()
      console.log(data)
      // 后台返回数据赋值给页面渲染数据
      this.user = data
    }
  }
}
</script>

<style scoped lang="less">
.user-info {
  .base-info {
    display: flex;
    align-items: center;
    div {
      display: flex;
      align-items: center;
    }
    .avatar {
      margin-right: 30px;
      width: 100px;
      height: 100px;
      border-radius: 100%;
    }
  }
  .data-info {
    .text {
      font-size: 28px;
    }
    .count {
      font-size: 24px;
    }
  }
}
</style>
