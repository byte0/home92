/*
  测试地图的基本使用
*/
import React from 'react'

class MapTest extends React.Component {

  componentDidMount () {
    // 初始化地图
    // 1、创建地图实例对象
    const map = new window.BMap.Map("mymap")
    // 2、创建地图中心点坐标
    const point = new window.BMap.Point(116.40387397,39.91488908)
    // 3、设置地图的中心点坐标和缩放级别 
    map.centerAndZoom(point, 9)
    // ----------------------------------------
    // 基于百度地图进行定位
    // 基于IP的定位（可能不准确）
    // const myCity = new window.BMap.LocalCity()
    // myCity.get((result) => {
    //   console.log(result)
    // })
    
    // 浏览器定位（先根据h5地理定位API实现，如果无效就通过IP定位）
    const geolocation = new window.BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
      if(this.getStatus() === window.BMAP_STATUS_SUCCESS){
        // console.log('success')
        // 定位成功
        // alert('您的位置：'+r.point.lng+','+r.point.lat);
        console.log(r.address.city)
      } else {
        // 定位失败
        console.log('fail')
      }
    })
  }

  render () {
    return (
      <div style={{height: '100%'}}>
        {/*<div>测试地图</div>*/}
        <div style={{height: '100%'}} id='mymap'></div>
      </div>
    )
  }
}

export default MapTest
