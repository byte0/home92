/*
  城市选择
*/

import React from 'react'
import { NavBar, Icon } from 'antd-mobile'
import request from '../../utils/request.js'

class City extends React.Component {

  state = {
    cityInfo: {}
  }

  loadData = async () => {
    // 获取城市列表的原始数据
    const res = await request({url: 'area/city', params: {level: 1}})
    // 把原始城市列表数据进行分组
    const cityInfo = this.formatCityList(res.body)

    // 获取热门城市数据
    const hotCity = await request({url: 'area/hot'})
    cityInfo.cityObj['hot'] = hotCity.body
    cityInfo.cityIndex.unshift('hot')

    // 当前城市数据处理（当前城市信息应该通过地理定位获取）
    cityInfo.cityObj['#'] = [{label: '北京'}]
    cityInfo.cityIndex.unshift('#')

    // 把分好组的城市列表数据更新到状态
    this.setState({
      cityInfo: cityInfo
    })
  }

  formatCityList = (cityList) => {
    // 把原始的城市列表数据进行分组
    /*
      let cityObj = {
        'a':[{label:'安庆',short:'aq'},.....],
        'b':[{label:'北京',short:'bj'},{label:'宝鸡',short:'bj'},...],
        'c':[{label:'长沙',short:'cs'},....]
      }
    */
    let cityObj = {}
    cityList.forEach(item => {
      // 判断cityObj中是否已经包含特定字符，
      // 如果不包含，添加一个新的字符并且初始化一个数组
      // 如果包含，项目对应数组中添加一项数据
      // 1、获取城市的首字符
      let firstLetter = item.short.substr(0, 1)
      // 2、判断对象中是否包含指定的属性
      if (cityObj.hasOwnProperty(firstLetter)) {
        // 已经存在该属性
        cityObj[firstLetter].push(item)
      } else {
        // 不存在该属性，向对象中添加一个属性
        cityObj[firstLetter] = [item]
      }
    })
    // 获取对象所有的key并且进行排序
    let letters = Object.keys(cityObj).sort()
    return {
      cityObj: cityObj,
      cityIndex: letters
    }
  }

  componentDidMount () {
    this.loadData()
  }

  renderCityList = () => {
    // 展示城市列表
    const { cityObj, cityIndex } = this.state.cityInfo
    // 遍历对象
    let tags = []
    // 由于数据是异步更新的，所有必须进行存在性判断
    cityIndex && cityIndex.forEach((letter, index) => {
      // 把分组的字符添加到数组
      tags.push(<div key={index}>{letter}</div>)
      let cityList = cityObj[letter]
      cityList.forEach((city, i) => {
        // 把分组下的每一个城市名称添加到数组
        tags.push(<div key={index + '-' + i}>{city.label}</div>)
      })
    })
    return (
      <div>
        {tags}
      </div>
    )
  }

  render () {
    return (
      <div>
        {/*顶部导航*/}
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => {
            // 左侧点击事件
            // 跳回到主页面
            this.props.history.push('/home')
            // this.props.history.goBack()
            // this.props.history.go(-1)
          }}
        >城市选择</NavBar>
        {/*城市列表*/}
        {this.renderCityList()}
      </div>
    )
  }
}

export default City
