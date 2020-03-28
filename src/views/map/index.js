/*
  测试地图的基本使用
*/
import React from 'react'
import './index.scss'
import { NavBar, Icon } from 'antd-mobile'
import { getCurrentCity } from '../../utils/config.js'
import request from '../../utils/request.js'

class MapTest extends React.Component {

  state = {
    houseData: []
  }

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
      
      // 批量绘制一级覆盖物
      this.drawFirstLevelOverlay(map)
    }, '中国')
  }

  // 封装绘制单个覆盖物方法
  drawSingleOverlay = (map, overlayData) => {
    // 覆盖物坐标点
    const point = new window.BMap.Point(overlayData.coord.longitude, overlayData.coord.latitude)
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
        <div>${overlayData.label}</div>
        <div>${overlayData.count}套</div>
      </div>
    `
    let label = new window.BMap.Label(labelContent, opts);
    // 给覆盖物绑定事件
    label.addEventListener('click', () => {
      // 绘制二级覆盖物
      this.drawSecondLevelOverlay(map, overlayData)
    })

    // 设置label本身的样式
    label.setStyle({
      border: '0',
      background: 'rgba(0,0,0,0)'
    })
    // 把地图覆盖物添加到地图中
    map.addOverlay(label)
  }

  // 绘制二级覆盖物 
  drawSecondLevelOverlay = async (map, overlayData) => {
    // 一级覆盖物点击时，
    // 1、需要清空原有覆盖物，
    setTimeout(() => {
      // 防止出现警告
      map.clearOverlays()
    }, 0)
    // 2、根据点击的一级覆盖物，获取对应二级覆盖物的数据
    const res = await request({
      url: 'area/map',
      params: {
        id: overlayData.value
      }
    })
    // 3、重新绘制二级覆盖物（放大地图）
    const point = new window.BMap.Point(overlayData.coord.longitude, overlayData.coord.latitude)
    map.centerAndZoom(point, 13)
    res.body.forEach(item => {
      // 绘制单个二级覆盖物
      this.drawSingleOverlay(map, item)
    })
  }

  // 批量绘制一级覆盖物
  drawFirstLevelOverlay = (map) => {
    const { houseData } = this.state
    houseData.forEach(item => {
      // 绘制单个覆盖物
      this.drawSingleOverlay(map, item)
    })
  }

  // 获取一级覆盖物
  loadFirstLevelData = async () => {
    // 获取当前城市数据
    const city = await getCurrentCity()
    const res = await request({
      url: 'area/map',
      params: {
        id: city.value
      }
    })
    this.setState({
      houseData: res.body
    })
  }

  async componentDidMount () {
    // 获取一级覆盖物数据(加载完成数据后才去初始化地图)
    await this.loadFirstLevelData()
    // 初始化地图
    this.initMap()
    
    // 按照如下的写法也可以
    // this.loadFirstLevelData().then(() => {
    //   this.initMap()
    // })
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
