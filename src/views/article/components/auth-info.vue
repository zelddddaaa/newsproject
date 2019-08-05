<template>
    <div class="auth-info">
        <div class="base-info">
            <img :src="article.aut_photo" alt="" class="avatar">
            <div>
                <!-- 作者名字 -->
                <p>{{article.aut_name}}</p>
                <!-- 分布时间 全局过滤器 -->
                <p>{{article.pubdate | relTime}}</p>
            </div>
        </div>
        <div>
            <!-- 通过article.is_followed切换内容和按钮样式 -->
            <van-button  @click="handleFollow" :type="!article.is_followed?'danger':'default'" :loading="loading">{{!article.is_followed?'关注':'已关注'}}</van-button>
        </div>
    </div>
</template>

<script>
// 导入关注用户 取消用户
import { unFollowUser, followUser } from '@/api/user.js'
// 导入store中的mapState
import { mapState } from 'vuex'
export default {
  data () {
    return {
      // 动画加载
      loading: false
    }
  },
  // 通过计算属性 调用user 判断登录与否
  computed: {
    ...mapState(['user'])
  },
  props: {
    // 父组件传来的文章信息
    article: {
      tyep: Object,
      default: () => {}
    }
  },
  methods: {
    // 切换关注和取消关注
    async handleFollow () {
      // 开启加载动画
      this.loading = true
      // 未登录
      if (!this.user) {
        this.$toast('请登录')
        return ''
      }
      // 登录后 已关注 => 取消关注
      if (this.article.is_followed) {
        // 向后台发送请求
        await unFollowUser(this.article.aut_id)
        // 修改视图关注按钮状态
        this.article.is_followed = false
      } else {
        // 未关注 => 关注用户
        await followUser(this.article.aut_id)
        this.article.is_followed = true
      }
    }
  }

}
</script>

<style lang="less" scoped>
.auth-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 26px;
  .base-info {
    display: flex;
    align-items: center;
  }
  .avatar {
    margin-right: 10px;
    width: 100px;
    height: 100px;
    border-radius: 100%;
  }
}

</style>
