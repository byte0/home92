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
      map.centerAndZoom(point, 15)
      // 添加地图覆盖物
      // 添加地图覆盖物
      let opts = {
        // 表示覆盖物绘制的坐标
        position: point,
        // 覆盖物中心点的偏移量
        offset: new window.BMap.Size(-30, -30)
      }
      // 如下的覆盖物内容由百度地图解析，而不是React解析
      const labelContent = `
        <div class='map-overlay'>
          <div>海淀区</div>
          <div>123套</div>
        </div>
      `
      let label = new window.BMap.Label(labelContent, opts);
      // 设置label本身的样式
      label.setStyle({
        border: '0',
        background: 'rgba(0,0,0,0)'
      })
      // 把地图覆盖物添加到地图中
      map.addOverlay(label)
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
