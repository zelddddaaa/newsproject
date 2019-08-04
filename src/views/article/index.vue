<template>
    <div class="article">
        <!-- 导航 -->
        <van-nav-bar title="黑马头条" left-text="返回" left-arrow @click-left="$router.back()"></van-nav-bar>
        <div>
            <!-- 标题 -->
            <h2 class="article-title">{{article.title}}</h2>
            <!-- 作者组件 父传子-->
             <auth-info :article="article"></auth-info>
             <!-- 内容 -->
             <div class="article-content" v-html="article.content"></div>
        </div>
        <!-- 更多操作组件 -->

        <!-- 评论列表组件 -->

        <!-- 回复列表组件 -->
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 文章数据
      article: []
    }
  }
}
</script>

<style>

</style>
