<template>
  <div>
       <van-nav-bar fixed title="搜索结果" left-text="返回" left-arrow @click-left="$router.back()"></van-nav-bar>
       <van-list class="search-list" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
           <van-cell v-for="item in resultdata" :key="item.art_id" :title="item.title"></van-cell>
       </van-list>
  </div>
</template>

<script>
// 导入获取搜索结果的api
import { getSearchResult } from '@/api/search.js'
export default {
  name: 'SearchResult',
  data () {
    return {
      // 搜索结果
      resultdata: [],
      // 是否处于加载状态
      loading: false,
      // 加载完毕
      finished: false,
      // 当前页码
      page: 1,
      // 每页数目
      per_page: 10
    }
  },
  // onload 方法在进入页面时也会触发,且每次只获取部分数据,是否是性能优化？
  //   created () {
  //     this.loadSearchResult()
  //   },
  //   为什么传过来的关键词和联想建议放在computed里?
  computed: {
    q () {
      return this.$route.params.q
    }
  },
  // 清除缓存   keep-alive 组件停用时调用-> 缓存刚做完 就触发 清除缓存的组件
  // deactivated（离开页面时调用）
  deactivated () {
    this.$destroy()
  },
  methods: {
    // async loadSearchResult () {
    //   try {
    //     const data = await getSearchResult({ q: this.q })
    //     this.resultdata = data.results
    //   } catch (err) {
    //     console.dir(err)
    //   }
    // },
    // list的onload onload在下拉时触发
    async onload () {
      // 延时执行
      await this.$sleep(800)
      try {
        const data = await getSearchResult({
          // 页码,标记每次数据
          page: this.page,
          per_page: this.per_page,
          q: this.q
        })
        // 无数据
        if (!data.results.length) {
          return ''
        }
        // 有数据
        this.resultdata.push(...data.results)
        // 页码自增 保证每次返回的数据都不同
        this.page++
        // 停止加载动画
        this.loading = false
      } catch (err) {
        console.dir(err)
      }
    }
  }
}
</script>

<style scoped lang="less">
.search-list {
  margin-top: 92px;
}
.van-nav-bar {
  background-color: #0096fa;

  .van-nav-bar__title,
  .van-nav-bar__text,
  .van-icon {
    color: #fff;
  }
}
</style>
