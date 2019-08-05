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
// 不喜欢文章 传入对应文章id
export const dislikeArticle = article_Id => {
  return request({
    method: 'post',
    url: '/app/v1_0/article/dislikes',
    data: {
      target: article_Id
    }
  })
}
// 举报文章
export const reportArticleByIdAndType = ({
  article_Id: target,
  type = 0,
  remark = ''
}) => {
  return request({
    method: 'post',
    url: '/app/v1_0/article/reports',
    data: {
      target,
      type,
      remark: ''
    }
  })
}
// 文章详情
export const getArticleById = (article_id) => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${article_id}`
  })
}

// 获取文章评论或评论回复
// type	是	a或c	评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
// source	是		源id，文章id或评论id
// offset	否		获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
// offset就是之前的页码 或者是时间戳
// 形参设置默认值
export const getCommentsOrReply = ({ isCommet = true, source, offset = null }) => {
  return request({
    method: 'GET',
    url: `/app/v1_0/comments`,
    params: {
      type: isCommet ? 'a' : 'c',
      source,
      offset
    }
  })
}
