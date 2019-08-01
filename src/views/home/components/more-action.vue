<template>
  <!-- 弹出框 -->
  <van-dialog :value="value" close-on-click-overlay @input="$emit('input')" :showConfirmButton="false" :show-cancel-button="false">
    <!-- 第一套布局 -->
    <van-cell-group v-if="!isReport">
      <van-cell  icon="location-o" title="不感兴趣" @click="handleDislikeArticle()"></van-cell>
      <van-cell  icon="location-o" title="反馈垃圾内容" is-link></van-cell>
      <van-cell  icon="location-o" title="拉黑作者"></van-cell>
    </van-cell-group>
    <!-- 第二套布局 -->
    <van-cell-group v-else>
       <van-cell icon="arrow-left" @click="isReport=false" />
       <van-cell></van-cell>
    </van-cell-group>
  </van-dialog>
</template>

<script>
// 导入对应的请求api,不喜欢,举报
import { dislikeArticle } from '@/api/article.js'
export default {
  name: 'MoreAction',
  data () {
    return {
      // 切换布局显示
      isReport: false
    }
  },
  // 接收父组件传值
  props: {
    value: {
      type: Boolean,
      default: false
    },
    // 接收传过来的当前文章
    currentArticle: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    // 处理不喜欢文章
    async handleDislikeArticle () {
      // 解构当前文章id
      const { art_id: article_Id } = this.currentArticle
      try {
        // 根据当前文章id发送请求,删除后台数据
        await dislikeArticle(article_Id)
        // 触发父组件的dislike-success事件,删除文章
        this.$emit('dislike-success')
        // 关闭对话框
        this.$emit('input', false)
        // vue提示框
        this.$toast('操作成功')
      } catch (err) {
        console.dir(err)
      }
    }
  }
}
</script>

<style>
</style>
