<template>
<!-- 弹出层组件 -->
<van-popup :value="value"  position="bottom" :style="{ height: '95%' }">

</van-popup>
</template>

<script>
export default {
  name: 'HomeChannel',
  // 接收父元素传值
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
