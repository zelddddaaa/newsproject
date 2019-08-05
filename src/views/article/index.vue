<template>
    <div class="article">
        <!-- 导航 -->
        <van-nav-bar title="黑马头条" left-text="返回" left-arrow @click-left="$router.back()"></van-nav-bar>
        <div>
            <!-- 标题 -->
            <h2 class="article-title">{{article.title}}</h2>
            <!-- 作者信息组件 父传子-->
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
// 导入作者信息组件 帕斯卡命名法
import AuthInfo from './components/auth-info.vue'
// 导入获取文章详情的请求
import { getArticleById } from '@/api/article.js'
export default {
  // 组件注册
  components: {
    AuthInfo
  },
  data () {
    return {
      // 文章数据
      article: []
    }
  },
  // 准备数据时,获取文章详情数据
  created () {
    this.loadArticle()
  },
  // 跳转路由传递过来的id
  computed: {
    article_id () {
      return this.$route.params.article_id
    }
  },
  methods: {
    // 获取文章详情
    async loadArticle () {
      const data = await getArticleById(this.article_id)
      // 赋值给data中数据 渲染页面
      this.article = data
    }
  }
}
</script>

<style lang="less" scoped>
.article {
  // padding: 20px;
  .article-title {
    font-size: 40px;
    font-weight: 400px;
  }
  .article-content {
    font-size: 20px;
  }
}

</style>
