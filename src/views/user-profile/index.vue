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
      <van-cell is-link title="头像"  @click="isUploadPhotoShow=true">
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
    <!-- 头像上传  使用组件-->
    <upload-photo v-model='isUploadPhotoShow'></upload-photo>
  </div>
</template>

<script>
// 导入获取用户资料和编辑用户资料的请求api
import { getCurrentProfileInfo, patchCurrentProfileInfo } from '@/api/user.js'
// 导入上传组件
import UploadPhoto from './components/upload-photo.vue'
export default {
  // 注册组件
  components: {
    UploadPhoto
  },
  data () {
    return {
      // 用户资料
      user: {},
      // 显示上传组件
      isUploadPhotoShow: false
    }
  },
  created () {
    this.loadProfileInfo()
  },
  methods: {
    // 点击保存 提交编辑
    async handleSave () {
      await patchCurrentProfileInfo({
        name: '原神biss'
      })
    },
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
