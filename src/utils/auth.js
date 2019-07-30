// 处理token
const Token = 'token'
// 存
export const setUser = data => {
  window.localStorage.setItem(Token, JSON.stringify(data))
}
// 取
export const getUser = data => {
  return JSON.parse(window.localStorage.getItem(Token))
}
// 删
export const removeUser = data => {
  return window.localStorage.removeItem(Token)
}
