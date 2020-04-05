/*
  通用的配置
*/
import request from './request.js'
// 后台图片的基准路径
// export const BASE_IMG_URL = 'http://api-haoke-dev.itheima.net'
// 通过环境变量配置基准图片地址
export const BASE_IMG_URL = process.env.REACT_APP_IMGBASEURL

// 封装通用的获取定位信息的方法
export const getCurrentCity = () => {
  return new Promise((resolve, reject) => {
    // 处理异步任务
    // 先判断缓存中是否已经存在了定位信息，如果已经存在直接获取即可，否则通过定位获取信息
    const city = window.localStorage.getItem('current_city')
    if (city) {
      // 获取缓存数据,并终止后续代码执行
      return resolve(JSON.parse(city))
    }
    // 通过地理定位获取城市信息
    const geolocation = new window.BMap.Geolocation();
    geolocation.getCurrentPosition(async function (r) {
      if(this.getStatus() === window.BMAP_STATUS_SUCCESS){
        // 定位成功
        // 根据定位获取的城市名称查询城市的详细信息
        const res = await request({
          url: 'area/info', 
          params: {
            name: r.address.city.substr(0, 2)
          }
        })
        // 把定位得到的数据进行缓存
        window.localStorage.setItem('current_city', JSON.stringify(res.body))
        // 返回定位的数据
        resolve(res.body)
      } else {
        // 定位失败
        console.log('fail')
        reject('定位失败')
      }
    })

  })
}