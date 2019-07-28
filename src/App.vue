<template>
<div>
  <p>{{this.$store.state.count}}</p>
  <div>{{count}}</div>
  <button @click="setCount(500)">按钮1</button>
  <button @click="acSetcount">按钮2</button>
  <van-button type="primary">默认按钮</van-button>
</div>
</template>

<script>
// 导入vuex方法
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
// 计算属性,有返回值的方法
  computed: {
    // mapState()返回对象{count: function(){return this.$store.state.coount}}
    // ...扩展运算符结构该对象
    // count = function (){return this.$store.state.couont}
    ...mapState(['count'])
  },
  methods: {
    // setCount(){this.$store.commit('setCount','接收实参')}
    ...mapMutations(['setCount']),
    // acSetcount(){this.$store.dispatch('acSetcount')}
    ...mapActions(['acSetcount'])
  }
}
</script>

<style>

</style>
