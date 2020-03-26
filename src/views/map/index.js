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
    const point = new window.BMap.Point(116.404, 39.915)
    // 3、设置地图的中心点坐标和缩放级别 
    map.centerAndZoom(point, 11)
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
