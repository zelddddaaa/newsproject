<template>
  <div>
    <!-- 搜索框 -->
    <van-search
      v-model="searchText"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch(searchText)"
      @cancel="onCancel"
    />
    <!-- 联想建议 -->
    <van-cell-group v-if="searchText.length!==0 && suggestionData.length !==0">
      <van-cell v-for="(item,index) in suggestionData" :key="index" icon="search" @click="onSearch(item)"></van-cell>
    </van-cell-group>
    <!-- 历史搜索记录 -->
  </div>
</template>

<script>
// 导入获取联想建议的api请求
import { getSuggestions } from '@/api/search.js'
// 导入防抖函数
import { debounce } from '@/utils/debounce.js'
export default {
  name: 'SearchIndex',
  data () {
    return {
      // 输入框输入内容
      searchText: '',
      // 后端响应内容
      suggestionData: []
    }
  },
  // watch监听 searchText 里面执行异步
  watch: {
    searchText: debounce(async function (newValue, oldValue) {
      // 搜索框未输入内容不执行 !0 为true
      if (!this.searchText.trim().length) {
        return ''
      }
      // 根据输入框内容向后台放请求,获取联想建议
      try {
        // 后台响应成功
        const suggestionData = await getSuggestions()
        // 赋值
        this.suggestionData = suggestionData.options
      } catch (err) {
      }
    }, 800)
  },
  methods: {
    // 删除事件
    onCancel () {},
    // 搜索事件
    onSearch (queryText) {}
  }
}
</script>

<style scoped lang="lesss">
</style>
