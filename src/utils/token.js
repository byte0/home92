/*
  封装token的操作
*/

const TOKEN = 'mytoken'

// 获取token
export const getToken = () => {
  return sessionStorage.getItem(TOKEN)
}

// 设置token
export const setToken = (token) => {
  sessionStorage.setItem(TOKEN, token)
}

// 删除token
export const removeToken = () => {
  sessionStorage.removeItem(TOKEN)
}