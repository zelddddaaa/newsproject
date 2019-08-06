<template>
    <div>
        <van-dialog :value="value" @input="$emit('input', $event)" :show-confirm-button="false">
            <van-cell-group>
                <van-cell title="从相册选择"/>
                <!-- 为什么隐藏 -->
                <input style="display: none;">
                <van-cell  title="拍照"/>
                <!-- 传值父组件 隐藏弹出框 -->
                <van-cell  title="取消" @click="$emit('input', false)"/>
            </van-cell-group>
        </van-dialog>
    </div>
</template>

<script>
export default {
  name: 'UploadPhoto',
  data () {
    return {

    }
  },
  // 接收父组件传值 控制对话框弹出
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
