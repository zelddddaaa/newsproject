<template>
    <div class="add-comment">
        <div class="input-wrap">
            <input type="text" v-model="content">
        </div>
        <div class="more-wrap">
            <van-button size="small" :disabled="!content.length" @click="handleAdd">发布</van-button>
        </div>
    </div>
</template>

<script>
// 导入发布评论请求
import { addCommentOrReply } from '@/api/article.js'
export default {
  name: 'AddComment',
  data () {
    return {
      content: ''
    }
  },
  // 接收组件使用者传值
  props: {
    art_id: {
      type: [Number, String]
    },
    target: {
      type: [Number, String],
      required: true
    }
  },
  methods: {
    async handleAdd () {
      // target 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
      /// / art_id	对评论内容发表回复时，需要传递此参数 对文章进行评论，不要传此参数
      const data = await addCommentOrReply({
        content: this.content,
        target: this.target,
        art_id: this.art_id
      })
    }
  }

}
</script>

<style lang="less" scoped>
.add-comment {
  width: 100%;
  background: #fff;
  padding: 20px;
  border-top: 2px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .input-wrap {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 20px;
    height: 60px;
    display: flex;
    align-items: center;
    width: 50%;
    input {
      border: none;
      color: #999;
      font-size: 30px;
    }
  }
  .more-wrap {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-evenly;
  }
}

</style>
