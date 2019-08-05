<template>
    <van-popup v-model="isShow" position="bottom" :style="{height:'75%'}">
        <van-cell>
            <!-- 自定义左侧图标 -->
            <div slot="icon">
                <img :src="commentTop.aut_photo" alt="" class="avatar">
            </div>
            <div slot="title">
                <span>{{commentTop.aut_name}}</span>
                <van-tag>楼主</van-tag>
            </div>
            <div slot="default">
                <van-button  icon="like-o" size="mini" plain>赞</van-button>
            </div>
            <div slot="label">
                <p>{{commentTop.content}}</p>
                <p>
                    <span>{{commentTop.pubdate | relTime}}</span>
                </p>
            </div>
        </van-cell>
        <hr>
        <!-- 对于楼主评论的回复 父传子 显示为对于当前评论的回复-->
         <comment-list :source="commentTop.com_id.toString()" :isCommet="false"></comment-list>
    </van-popup>
</template>

<script>
// 导入评论组件
import CommentList from './comment-list.vue'
// 导入事件总线 接收评论组件传递的当前评论
import vm from '@/utils/global-bus.js'
export default {
  components: {
    CommentList
  },
  data () {
    return {
      // 弹出框显示
      isShow: false,
      // 评论回复
      commentTop: {}
    }
  },
  // 在另一个组件调用方法时->此方法的声明的要准备好->created钩子函数的使用场景: 为数据做准备工作||获取首屏数据
  created () {
    // 此时评论组件点击回复 => 回复组件弹出
    vm.$on('reply-show', commentTop => {
      // 接收评论组件传递的当前评论
      this.commentTop = commentTop
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
