<template>
  <!-- 弹出框 -->
  <van-dialog :value="value" close-on-click-overlay @input="$emit('input')" :showConfirmButton="false" :show-cancel-button="false">
    <!-- 第一套布局 -->
    <van-cell-group v-if="!isReport">
      <van-cell  icon="location-o" title="不感兴趣"></van-cell>
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
    }
  }
}
</script>

<style>
</style>
