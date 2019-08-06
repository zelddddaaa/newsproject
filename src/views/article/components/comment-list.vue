<template>
<div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="(item,index) in  commets" :key="index">
            <!-- 自定义左侧图标 -->
            <div slot="icon">
                <img :src="item.aut_photo" alt="" class="avatar">
            </div>
            <!-- 自定义标题显示内容 -->
            <div slot="title">
                <span>{{item.aut_name}}</span>
            </div>
            <!-- 自定义value显示内容 -->
            <div slot="default">
                <van-button icon="like-o" size="mini" plain>赞</van-button>
            </div>
            <div slot="label">
                <p>{{item.content}}</p>
                <p>
                    <span>>{{item.pubdate| relTime}}</span>
                    <!-- 传递当前评论 -->
                    <span @click="showReply(item)">回复</span>
                </p>
            </div>
        </van-cell>

    </van-list>
</div>
</template>

<script>
// 导入获取文章评论的请求
import { getCommentsOrReply } from '@/api/article.js'
// 导入事件总线 完成兄弟传参
import vm from '@/utils/global-bus.js'
export default {

  data () {
    return {
      // 加载动画
      loading: false,
      // 加载完成
      finished: false,
      // 页码 offset 值为空,有默认值 axios使用默认值取代null
      offset: null,
      // 文章评论
      commets: []
    }
  },
  // 手动调用onload方法
  created () {
    this.onload()
  },
  // 接收组件调用者传值
  props: {
    source: {
      tyep: [Number, String],
      required: true
    },
    isCommet: {
      type: Boolean
    }
  },
  // 计算属性接收跳转过来携带的文章id
  computed: {
    article_id () {
      return this.$route.params.article_id
    }
  },
  methods: {
    // 给回复组件传递当前评论 兄弟组件传参
    showReply (item) {
      vm.$emit('reply-show', item)
    },
    async onload () {
      // 延时执行
      this.$sleep(800)
      // 获取文章评论
      const data = await getCommentsOrReply({
        // 实参为组件调用者传入
        source: this.source,
        offset: this.offset,
        // 获取文章评论
        isCommet: this.isCommet
      })
      // 无数据
      if (!data.results.length) {
        // 动画停止
        this.loading = false
        // 显示加载完成
        this.finished = true
      }
      if (data.results.length) {
        // 把结果一条条push进comments 让数据一条条显示
        this.commets.push(...data.results)
        // 修改页码 使用后台返回的offset 类似页码 标记本次返回数据
        this.offset = data.last_id
        // 手动停止加载动画
        this.loading = false
      }
    }
  }

}
</script>

<style lang="less" scoped>
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin-right: 10px;
}
</style>
