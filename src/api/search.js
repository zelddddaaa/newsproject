// 搜索api
import request from '@/utils/request.js'
// 获取后台返回的联想建议 q为 搜索框输入内容
export const getSuggestions = q => {
  return request({
    method: 'get',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}
