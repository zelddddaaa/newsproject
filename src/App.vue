<template>
  <div>
    <!-- 一级路由 -->
    <!-- 路由缓存 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
</style>
