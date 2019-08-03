<template>
  <div>
       <van-nav-bar fixed title="搜索结果" left-text="返回" left-arrow @click-left="$router.back()"></van-nav-bar>
       <van-list class="search-list" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
           <van-cell v-for="item in resultdata" :key="item.art_id" :title="item.title"></van-cell></van-cell>
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
      loading: false
    }
  },
  created () {
    this.loadSearchResult()
  },
  //   为什么传过来的关键词和联想建议放在computed里?
  computed: {
    q () {
      return this.$route.params.q
    }
  },
  methods: {
    async loadSearchResult () {
      try {
        const data = await getSearchResult({ q: this.q })
        this.resultdata = data.results
      } catch (err) {
        console.dir(err)
      }
    },
    // list的onload
    onload () {

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
