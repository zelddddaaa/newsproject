import request from '@/utils/request.js'
// 请求频道数据
export const getChannelsUserOrDefault = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/user/channels'
  })
}
// 获取所有频道
export const getAllChannels = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/channels'
  })
}
// 更新用户频道
export const resetUserChannels = channels => {
  return request({
    method: 'PUT',
    url: '/app/v1_0/user/channels',
    data: {
      channels
    }
  })
}
// 删除频道
export const deleUserChannel = channel_Id => {
  return request({
    method: 'delete',
    url: `/app/v1_0/user/channels/${channel_Id}`
  })
}
