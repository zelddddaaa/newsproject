<template>
  <div>
    <van-nav-bar
      title="个人信息"
      left-text="返回"
      right-text="保存"
      left-arrow
      @click-left="$router.back()"
      @click-right="handleSave"
    ></van-nav-bar>
    <van-cell-group>
      <van-cell is-link title="头像">
        <div slot="default">
          <img :src="user.photo" alt width="30" />
        </div>
      </van-cell>
      <van-cell is-link title="昵称" :value="user.name"></van-cell>
      <van-cell is-link title="介绍" value="内容"></van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell is-link title="性别" :value="user.gender===0 ? '男' : '女'"></van-cell>
      <van-cell is-link title="生日" :value="user.birthday"></van-cell>
    </van-cell-group>
    <!-- 头像上传 -->

  </div>
</template>

<script>
// 导入获取用户资料的请求api
import { getCurrentProfileInfo } from '@/api/user.js'
export default {
  data () {
    return {
      // 用户资料
      user: {}
    }
  },
  created () {
    this.loadProfileInfo()
  },
  methods: {
    // 提交编辑
    handleSave () {},
    // 获取用户资料
    async loadProfileInfo () {
      const data = await getCurrentProfileInfo()
      // 获取后台数据 赋值
      this.user = data
    }
  }
}
</script>

<style>
</style>
