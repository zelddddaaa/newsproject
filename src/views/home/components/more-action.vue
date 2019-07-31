<template>
  <!-- 弹出框 -->
  <van-dialog :value="value" close-on-click-overlay @input="$emit('input')" :showConfirmButton="false" :show-cancel-button="false">更多操作</van-dialog>
</template>

<script>
export default {
  name: 'MoreAction',
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
