<template>
  <!-- 弹出框 -->
  <van-dialog
    :value="value"
    close-on-click-overlay
    @input="$emit('input')"
    :showConfirmButton="false"
    :show-cancel-button="false"
  >
    <!-- 第一套布局 -->
    <van-cell-group v-if="!isReport">
      <van-cell icon="location-o" title="不感兴趣" @click="handleDislikeArticle()"></van-cell>
      <van-cell icon="location-o" title="反馈垃圾内容" is-link @click="isReport=true"></van-cell>
      <van-cell icon="location-o" title="拉黑作者"></van-cell>
    </van-cell-group>
    <!-- 第二套布局 -->
    <van-cell-group v-else>
      <van-cell icon="arrow-left" @click="isReport=false" />
      <!-- 遍历举报内容 -->
      <van-cell v-for="item in reportsType" :title="item.title" :key="item.value" icon="location-o" @click="handleReportArticle(item)"></van-cell>
    </van-cell-group>
  </van-dialog>
</template>

<script>
// 导入对应的请求api,不喜欢,举报
import { dislikeArticle, reportArticleByIdAndType } from '@/api/article.js'
export default {
  name: 'MoreAction',
  data () {
    return {
      // 切换布局显示
      isReport: false,
      // 举报内容
      reportsType: [
        { title: '其他问题', value: 0 },
        { title: '标题夸张', value: 1 },
        { title: '低俗色情', value: 2 },
        { title: '错别字多', value: 3 },
        { title: '旧闻重复', value: 4 },
        { title: '广告软文', value: 5 },
        { title: '内容不实', value: 6 },
        { title: '涉嫌违法犯罪', value: 7 },
        { title: '侵权', value: 8 }
      ]
    }
  },
  // 接收父组件传值
  props: {
    // 弹出框显示/隐藏
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
        this.$toast('操作失败')
      }
    },
    // 举报文章: id 举报类型 type
    async handleReportArticle (item) {
      // 解构当前文章id 重命名为  article_Id
      const { art_id: article_Id } = this.currentArticle
      try {
        await reportArticleByIdAndType({
          article_Id,
          type: item.value
        })
        // 触发父组件事件移除当前文章
        this.$emit('dislike-success')
        // 关闭对话框
        this.$emit('input', false)
        // 提示
        this.$toast('举报成功')
      } catch (err) {
        if (err.response.status === 409) {
          this.$toast('已被其他用户举报过')
        } else {
          this.$toast('举报失败')
        }
      }
    }
  }
}
</script>

<style>
</style>
