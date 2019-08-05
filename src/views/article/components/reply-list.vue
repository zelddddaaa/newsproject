<template>
    <van-popup v-model="isShow" position="bottom" :style="{height:'75%'}">
        <van-cell>
            <!-- 自定义左侧图标 -->
            <div slot="icon">
                <img :src="commetTop.aut_photo" alt="" class="avatar">
            </div>
            <div slot="title">
                <span>{{commetTop.aut_name}}</span>
                <van-tag>楼主</van-tag>
            </div>
            <div slot="default">
                <van-button  icon="like-o" size="mini" plain>赞</van-button>
            </div>
            <div slot="label">
                <p>{{commetTop.content}}</p>
                <p>
                    <span>{{commetTop.pubdate | relTime}}</span>
                </p>
            </div>
        </van-cell>
        <hr>
        <!-- 对于楼主评论的回复 -->

    </van-popup>
</template>

<script>
// 导入事件总线 接收评论组件传递的当前评论
import vm from '@/utils/global-bus.js'
export default {
  data () {
    return {
      // 弹出框显示
      isShow: false,
      // 评论回复
      commetTop: {}
    }
  },
  // 在另一个组件调用方法时->此方法的声明的要准备好->created钩子函数的使用场景: 为数据做准备工作||获取首屏数据
  created () {
    // 此时评论组件点击回复 => 回复组件弹出
    vm.$on('reply-show', commetTop => {
      // 接收评论组件传递的当前评论
      this.commetTop = commetTop
      // 显示弹出层
      this.isShow = true
    })
  }

}
</script>

<style lang='less' scoped>
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin-right: 10px;
}

</style>
