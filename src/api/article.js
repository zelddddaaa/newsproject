// 获取频道文章
import request from '@/utils/request.js'
// channel_id 是 频道ID,
// timestamp是 时间戳Date.now() 整数 单位毫秒 请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
// with_top	是	0或1	是否包含置顶
export const getArticles = ({ channel_id, timestamp, with_top }) => {
  return request({
    method: 'get',
    url: '/app/v1_1/articles',
    params: {
      channel_id,
      timestamp,
      with_top
    }
  })
}
