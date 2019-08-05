// 导入axios实例对象,把请求封装成函数,直接调用,便于维护,复用
import request from '@/utils/request.js'
// 导出用户登录所需请求方式,{mobile,code}直接解构传入的对象user:{mobile,code}
export const login = ({ mobile, code }) => {
  // 把request请求方式return出去
  return request({
    method: 'post',
    url: '/app/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })
}
// 取消关注
export const unFollowUser = user_id => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${user_id}`
  })
}
// 关注
export const followUser = user_id => {
  return request({
    method: 'POST',
    url: `/app/v1_0/user/followings`,
    data: {
      target: user_id
    }
  })
}
