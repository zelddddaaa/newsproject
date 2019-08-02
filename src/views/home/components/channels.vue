<template>
  <!-- 弹出层组件 $event undefined -->
  <van-popup
    :value="value"
    @input="$emit('input',$event)"
    position="bottom"
    :style="{ height: '95%' }"
  >
    <!-- 我的频道 -->
    <div class="channel">
      <div class="channel-head">
        <div>
          <span class="title">我的频道</span>
          <span class="desc">点击进入频道</span>
        </div>
        <div>
          <van-button type="danger" plain size="mini" @click="isEdit=!isEdit">{{!isEdit?'编辑':'完成'}}</van-button>
        </div>
      </div>
      <!-- 宫格 -->
      <van-grid class="channel-content" :gutter="10" clickable>
          <!-- 点击时传入当前频道的信息 索引 -->
        <van-grid-item v-for="(item,index) in channels" :key="item.id" text="文字" @click="handleClickChannel(item,index)">
          <span class="text" :class="{active:activeIndex===index}">{{item.name}}</span>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 推荐频道 -->
    <div class="channel">
      <div class="channel-head">
        <div>
          <span class="title">频道推荐</span>
          <span class="desc">点击添加频道</span>
        </div>
      </div>
      <van-grid class="channel-content" :gutter="10" clickable>
          <van-grid-item v-for="(item,index) in restChannels" :key="item.id" text="文字" @click="handleAddClick(item,index)">
              <div class="info">
                  <span class="text">{{item.name}}</span>
              </div>
          </van-grid-item>
      </van-grid>
    </div>
  </van-popup>
</template>

<script>
// 导入vuex中的state的user 判断是否登录
import { mapState } from 'vuex'
// 导入请求api组件
import { getAllChannels, resetUserChannels } from '@/api/channel.js'
export default {
  name: 'HomeChannel',
  data () {
    return {
      // 切换编辑 完成
      isEdit: false,
      // 所有频道
      allChannels: []
    }
  },
  // 接收父元素传值
  props: {
    // 显示
    value: {
      type: Boolean,
      default: false
    },
    // 我的频道信息
    channels: {
      type: Array,
      default: () => []
    },
    // 激活频道
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  // 加载页面 拿到所有频道数据
  created () {
    this.loadAllChannels()
  },
  computed: {
    // 注册mapState
    ...mapState(['user']),
    // 筛选出推荐频道
    restChannels () {
      // 拿到我的频道的全部id
      const ids = this.channels.map(item => {
        return item.id
      })
      // 筛选出推荐频道 filter返回新数组
      return this.allChannels.filter(item => {
        return !ids.includes(item.id)
      })
    }
  },
  methods: {
    // 点击推荐频道 添加到我的频道
    async handleAddClick (item, index) {
      this.channels.push(item)
      // 用户登录
      if (this.user) {
        // 配置 发送到后台的信息 ;频道id从第二项开始
        const channels = this.channels.splice(1).map((item, index) => {
          return {
            id: item.id,
            seq: index + 2
          }
        })
        // 发送请求
        const data = await resetUserChannels(channels)
        console.log(data)
      } else {
        // 本地存储
        window.localStorage.setItem('channels', JSON.stringify(this.channels))
      }
    },
    // 获取所有频道
    async loadAllChannels () {
      // 拿到所有频道
      const data = await getAllChannels()
      // 重新设计频道解构 原频道 只有id name
      data.channels.forEach(item => {
        item.downPullLoading = false // 当前频道下拉状态
        item.upPullLoading = false // 当前频道上拉加载更多
        item.upPullFinished = false // 当前频道加载完毕
        item.timestamp = Date.now() // 为每个频道添加默认时间戳属性
        item.articles = [] // 为了控制个频道自己的文章列表数据
      })
      this.allChannels = data.channels
    },
    // 点击频道 进入 或 删除
    handleClickChannel (item, index) {
      // 非编辑下进入频道
      if (!this.isEdit) {
        this.channelChannel(item, index)
      } else {
        // 完成下删除频道
        this.deleChannel(item, index)
      }
    },
    // 进入频道
    channelChannel (item, index) {
      // 关闭模态框
      this.$emit('input', false)
      // 修改父组件 传递当前激活频道
      this.$emit('update:active-index', index)
    },
    // 删除频道
    deleChannel (item, index) {

    }
  }
}
</script>

<style scoped lang="less">
.channel {
  .channel-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .title {
      font-size: 30px;
      margin-right: 5px;
    }
    .desc {
      font-size: 12px;
    }
    .action {
    }
  }
  .channel-content {
    .text {
      font-size: 16px;
    }
    .active {
      color: red;
    }
    .close-icon {
      font-size: 20px;
      position: absolute;
      top: -5px;
      right: -5px;
      z-index: 999;
      background-color: #fff;
    }
    .info {
      display: flex;
      align-items: center;
    }
  }
}
</style>
