/*
  通用接口调用方法
*/
import axios from 'axios'
import { getToken } from './token.js'

// 配置响应拦截器
axios.interceptors.response.use(function (response) {
  return response.data
}, function (error) {
  return Promise.reject(error)
})

// 配置请求拦截器
axios.interceptors.request.use(function (config) {
  const { url } = config
  if (url.startsWith('user') && !url.startsWith('user/login') && !url.startsWith('user/registered')) {
    // 配置请求选项
    config.headers.Authorization = getToken()
  }
  return config
})

// 通过参数的解构赋值获取参数信息
export default ({method = 'get', url, data, params, headers}) => {
  // return的结果是Promise实例对象
  return axios({
    // 请求基准路径
    baseURL: process.env.REACT_APP_APIBASEURL,
    // 请求方式（默认是get）
    method: method,
    // 请求地址
    url: url,
    // post请求参数
    data: data,
    // get请求参数
    params: params,
    // 请求头
    headers: headers
  })  
}
