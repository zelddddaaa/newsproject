<template>
  <div>
    <!-- 导航,fixed固定在顶部,自有属性 -->
    <van-nav-bar title="首页|搜索" fixed @click.native="$router.push({name:'search'})"/>
    <!-- 标签页 v-model = 当前选中标签 默认值 0-->
    <van-tabs v-model="activeChannelIndex" class="channel-tabs" :lazy-render="false" @change="handleChangeTab">
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <!-- 下拉刷新,refresh下拉刷新时触发 -->
        <van-pull-refresh
          :success-text="refreshSuccessText"
          v-model="item.downPullLoading"
          @refresh="onRefresh"
        >
          <van-list
            v-model="item.upPullLoading"
            :finished="item.upPullFinished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <!-- JSONBig转换后,art_id不是数字/字符串类型 -->
            <van-cell
              v-for="item in item.articles"
              :key="item.art_id.toString()"
              :title="item.title"
               @click="$router.push({name:'article',params:{article_id:141314}})"
            >
              <!-- 使用label插槽自定义单元格内容 自定义标题下方描述显示内容 -->
              <template slot="label">
                <!-- 宫格 渲染图片-->
                <van-grid v-show="item.cover.type!==0" :border="false" :column-num="3">
                  <van-grid-item v-for="src in item.cover.images" :key="src">
                    <van-image :src="src" lazy-load></van-image>
                  </van-grid-item>
                </van-grid>
                <!-- 渲染 作者,评论,时间 -->
                <p>
                  <span>作者:{{item.aut_name}}</span>&nbsp;
                  <span>评论:{{item.comm_count}}</span>&nbsp;
                  <span>时间:{{item.pubdate | relTime}}</span>&nbsp;
                  <!-- 点击显示弹出框,并且出入当前文章信息 -->
                  <van-icon class="close" name="cross" @click="showMoreActionDia(item)"></van-icon>
                </p>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <!-- 自定义插槽 按钮 -->
      <div slot="nav-right" class="wap-nav" @click="showChannel">
        <van-icon name="wap-nav"></van-icon>
      </div>
    </van-tabs>
    <!-- 弹出框组件 :value='isShowDiaMore' @input='isShowDiaMore=value'-->
    <more-action
      v-model="isShowDiaMore"
      :currentArticle="currentArticle"
      @dislike-success="handleDislikeSuccess"
    ></more-action>
    <!-- 频道管理的弹出框组件 -->
    <channels @dele-success="handleDeleSuccess" v-model="isShowPopChannel" :channels="channels" :activeIndex="activeChannelIndex"  @update:active-index="activeChannelIndex=$event"></channels>
  </div>
</template>

<script>
// 导入获取频道信息的axios请求方法
import { getChannelsUserOrDefault } from '@/api/channel.js'
// 导入mapState
import { mapState } from 'vuex'
// 导入获取频道文章的请求方法
import { getArticles } from '@/api/article.js'
// 导入弹出框组件
import MoreAction from './components/more-action.vue'
// 导入channels组件
import Channels from './components/channels.vue'
export default {
  name: 'HomeIndex',
  // 注册局部组件
  components: {
    MoreAction,
    Channels
  },
  data () {
    return {
      // 默认激活频道页选择第一个
      activeChannelIndex: 0,
      // 下拉刷新
      // isLoading: false,
      // loading为false，此时会根据列表滚动位置判断是否触发load事件
      loading: false,
      // 是否已加载完成，加载完成后不再触发load事件
      finished: false,
      // 单元格数据
      list: [],
      // 频道信息
      channels: [],
      // 弹出框
      isShowDiaMore: false,
      // 点击弹出框对应的当前文章
      currentArticle: null,
      // 下拉提示
      refreshSuccessText: '',
      // 弹出频道管理
      isShowPopChannel: false
    }
  },
  // 载入加载频道信息
  created () {
    this.Loadchannels()
  },
  // 路由优化  凡是可以使用this.出来的数据,都可以使用watch监测
  watch: {
    // 监听state中的user数据
    user (newV, oldV) {
      // 重新加载频道
      this.Loadchannels()
      // 重新加载当前频道的文章
      this.activeChannel.upPullLoading = true
      this.loadArticles()
    }
  },
  computed: {
    // 通过计算属性拿到user
    // user(){this.$store.state.user}
    ...mapState(['user']),
    // 当前的激活频道依赖activeChannelIndex
    activeChannel () {
      return this.channels[this.activeChannelIndex]
    }
  },
  methods: {
    // 完善删除
    handleChangeTab () {
      // 手动调用onload方法 加载文章
      this.onLoad()
    },
    // 成功删除后,父组件触发的方法
    handleDeleSuccess () {
      // 内容为空,调用onload方法: 自动加载,铺满页面
      if (!this.activeChannel.articles.length) {
        this.onLoad()
      }
    },
    // 显示模态框组件
    showChannel () {
      this.isShowPopChannel = true
    },
    // 点击传值给子组件打开对话框
    showMoreActionDia (currentArticle) {
      this.isShowDiaMore = true
      // 改变data中的当前文章
      this.currentArticle = currentArticle
    },
    // 删除当前文章
    handleDislikeSuccess () {
      const index = this.activeChannel.articles.findIndex(item => {
        // 遍历当前频道所有文章,找到当前文章的index
        return item === this.currentArticle
      })
      // splice方法删除对应下标文章
      this.activeChannel.articles.splice(index, 1)
    },
    // 下拉刷新触发
    async onRefresh () {
      // 延时器
      await this.$sleep(800)
      // 最新时间戳
      this.activeChannel.timestamp = Date.now()
      // 按照最新的时间戳 请求数据
      const data = await this.loadArticles()
      // 有最新数据
      if (data.results.length) {
        // 重置数据 因为拿到的是最新的数据 直接复制 整体替换
        this.activeChannel.articles = data.results
        // 把后台返回的时间戳 进行保存 标记本次返回的数据
        this.activeChannel.timestamp = data.pre_timestamp
        // 保证数据满屏
        this.onLoad()
        // 提示 更新完毕
        this.refreshSuccessText = '更新完毕'
      }
      // 无最细数据
      this.refreshSuccessText = '更新失败'
      // 停止动画
      this.activeChannel.downPullLoading = false
    },
    // 获取频道信息
    async Loadchannels () {
      // 取出本地存储的数据
      const isChannels = JSON.parse(window.localStorage.getItem('channels'))
      try {
        // 用户登录或用户未登录&&本地没有存储数据,向后台发送请求
        if (this.user || (!this.user && !isChannels)) {
          const data = await getChannelsUserOrDefault()
          // 遍历channels,给每一项channel添加各自属性
          console.log(data.channels)
          data.channels.forEach(item => {
            item.downPullLoading = false // 下拉刷新
            item.upPullLoading = false // 当前频道上拉加载更多
            item.upPullFinished = false // 当前频道加载完毕
            item.timestamp = Date.now() // 为每个频道添加默认时间戳属性
            item.articles = [] // 为了控制每个频道自己的文章列表数据
          })
          // 把改造完的channels进行赋值
          this.channels = data.channels
        }
      } catch (err) {
        console.dir(err)
      }
    },
    // 获取当前频道文章列表数据
    async loadArticles () {
      // 获取当前频道id 时间戳
      // 解构赋值重命名
      const { id: channel_id, timestamp } = this.activeChannel
      // 发送ajax请求
      const data = await getArticles({
        // 当前激活频道id
        channel_id,
        // 时间戳
        timestamp,
        // 置顶
        with_top: 1
      })
      return data
    },
    // 滚动条与底部距离小于 offset 时触发
    async onLoad () {
      // 延迟执行 提高用户体验,return的是promise对象 需要await
      await this.$sleep(800)
      let data = []
      // 第一次发送请求
      data = await this.loadArticles()
      console.log(data) // {pre_timestamp: 1556789000001, results: Array(0)}
      // 发过请求,有之前的时间戳,且results为0
      if (data.pre_timestamp && data.results.length === 0) {
        // 更新当前频道的时间戳,把第一次拿到的时间戳赋值给第二次请求
        this.activeChannel.timestamp = data.pre_timestamp
        // 根据当前的时间戳获取频道文章
        // 返回的promise对象,要用await处理,直接返回结果
        data = await this.loadArticles()
        console.log(data) // {pre_timestamp: 1556789000002, results: Array(10)}
      }
      // pre_timestamp为null 所有数据加载完毕
      if (!data.pre_timestamp) {
        this.activeChannel.upPullLoading = false
        this.activeChannel.upPullFinished = true
        return
      }
      // 更新最新的时间戳,之后每次请求都有时间戳
      this.activeChannel.timestamp = data.pre_timestamp
      // 更新当前频道的文章数据
      this.activeChannel.articles.push(...data.results)
      // 停止加载动画,表示加载结束
      this.activeChannel.upPullLoading = false
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
.channel-tabs {
  margin-bottom: 100px;
}
//把tab栏固定定位,渲染出的组件没有scoped的随机字符属性
.channel-tabs /deep/ .van-tabs__wrap {
  position: fixed;
  top: 92px;
}
//调整内容位置,184px
.channel-tabs /deep/ .van-tabs__content {
  margin-top: 184px;
}
//右侧按钮
.channel-tabs /deep/ .wap-nav {
  position: fixed;
  right: 0px;
}
</style>
