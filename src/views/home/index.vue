<template>
  <div>
    <!-- 导航,fixed固定在顶部,自有属性 -->
    <van-nav-bar title="首页|搜索" fixed />
    <!-- 标签页 -->
    <van-tabs v-model="activeChannelIndex" class="channel-tabs">
      <van-tab title="第一个">
        <!-- 下拉刷新,refresh下拉刷新时触发 -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in list" :key="item" :title="item" />
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="第二个"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
// 导入获取频道信息的axios请求方法
import { getChannelsUserOrDefault } from '@/api/channel.js'
export default {
  data () {
    return {
      // 默认标签页选择第一个
      activeChannelIndex: 0,
      // 下拉刷新
      isLoading: false,
      // loading为false，此时会根据列表滚动位置判断是否触发load事件
      loading: false,
      // 是否已加载完成，加载完成后不再触发load事件
      finished: false,
      // 单元格数据
      list: [],
      // 频道信息
      channels: []
    }
  },
  // 载入加载频道信息
  created () {
    this.Loadchannels()
  },
  methods: {
    // 下拉刷新触发
    onRefresh () {
      setTimeout(() => {
        // 哪儿来的方法?标签组件自带
        this.$toast('刷新成功')
        // 刷新成功
        this.isLoading = false
      }, 500)
    },
    // 滚动条与底部距离小于 offset 时触发
    onLoad () {
      console.log('加载list列表')
      // 异步更新数据,组件自带
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    },
    // 获取频道信息
    async Loadchannels () {
      try {
        const data = await getChannelsUserOrDefault()
        console.log(data)
        // data:{channel:array(7)}
        this.channels = data.channels
      } catch (err) {
        console.dir(err)
      }
    }
  }
}
</script>

<style scoped lang="less">
//对应的标签会因为scoped带有随机字符属性
.van-nav-bar {
  background-color: #1989fa;
  .van-nav-bar__title {
    color: #ffffff;
  }
}
.channel-tabs{
  margin-bottom: 100px
}
//把tab栏固定定位,渲染出的组件没有scoped的随机字符属性
.channel-tabs /deep/ .van-tabs__wrap{
  position:fixed;
  top: 92px
}
//调整内容位置
/deep/ .van-tabs__content {
  margin-top: 92px
}
</style>
