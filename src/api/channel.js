import request from '@/utils/request.js'
// 请求频道数据
export const getChannelsUserOrDefault = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/user/channels'
  })
}
