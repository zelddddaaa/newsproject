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
// 获取用户个人信息
export const getCurrentUserInfo = () => {
  return request({
    method: 'GET',
    url: `/app/v1_0/user`
  })
}
// 获取用户个人资料
export const getCurrentProfileInfo = () => {
  return request({
    method: 'GET',
    url: `/app/v1_0/user/profile`
  })
}
// 编辑用户资料
// name	string	非必须		昵称
// photo	string	非必须		头像 base64编码处理
// gender	integer	非必须		性别，0-男，1-女
// birthday	string	非必须		生日，格式'2018-12-20'
// real_name	string	非必须		真实姓名
// id_number	string	非必须		身份证号
// id_card_front	string	非必须		身份证正面照片 base64编码处理
// id_card_back	string	非必须		身份证背面照片 base64编码处理
// id_card_handheld	string	非必须		手持身份证照片 base64编码处理
// intro	string	非必须		个人介绍
export const patchCurrentProfileInfo = ({
  name,
  photo,
  gender,
  birthday,
  real_name,
  id_number,
  id_card_front,
  id_card_back,
  id_card_handheld,
  intro
}) => {
  return request({
    method: 'PATCH',
    url: `/app/v1_0/user/profile`,
    data: {
      name,
      photo,
      gender,
      birthday,
      real_name,
      id_number,
      id_card_front,
      id_card_back,
      id_card_handheld,
      intro
    }
  })
}
