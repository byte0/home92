/*
  测试地图的基本使用
*/
import React from 'react'
import './index.scss'
import { NavBar, Icon } from 'antd-mobile'
import { getCurrentCity } from '../../utils/config.js'

class MapTest extends React.Component {

  // 初始化地图
  initMap = async () => {
    // 获取当前城市信息
    const city = await getCurrentCity()
    // 根据城市名称获取城市的经纬度
    const geo = new window.BMap.Geocoder()
    // getPoint参数：（1、城市名称；2、回调函数；3、国家名称）
    geo.getPoint(city.label, (data) => {
      // 获取城市经纬度数据
      let info = {
        lng: data && data.lng,
        lat: data && data.lat
      }
      // 1、创建地图实例对象
      const map = new window.BMap.Map("mymap")
      // 2、创建地图中心点坐标
      const point = new window.BMap.Point(info.lng, info.lat)
      // 3、设置地图的中心点坐标和缩放级别 
      map.centerAndZoom(point, 11)
    }, '中国')
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
