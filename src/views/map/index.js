/*
  测试地图的基本使用
*/
import React from 'react'
import './index.scss'
import { NavBar, Icon } from 'antd-mobile'

class MapTest extends React.Component {

  // 初始化地图
  initMap = () => {
    // 1、创建地图实例对象
    const map = new window.BMap.Map("mymap")
    // 2、创建地图中心点坐标
    const point = new window.BMap.Point(116.40387397,39.91488908)
    // 3、设置地图的中心点坐标和缩放级别 
    map.centerAndZoom(point, 9)
  }

  componentDidMount () {
    // 初始化地图
    this.initMap()
  }

  render () {
    return (
      <div style={{height: '100%'}}>
        {/*导航栏*/}
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => {
            // 左侧点击事件,跳回到主页面
            this.props.history.push('/home')
          }}
        >城市选择</NavBar>
        {/*地图区域*/}
        <div id='mymap'></div>
      </div>
    )
  }
}

export default MapTest
