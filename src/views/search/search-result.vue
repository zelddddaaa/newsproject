<template>
  <div>{{$route.params.q}}</div>
</template>

<script>
// 导入获取搜索结果的api
import { getSearchResult } from '@/api/search.js'
export default {
  name: 'SearchResult',
  data () {
    return {
      // 搜索结果
      resultdata: []
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
    }
  }
}
</script>

<style>
</style>
