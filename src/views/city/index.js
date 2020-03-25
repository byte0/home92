/*
  城市选择
*/

import React from 'react'
import { NavBar, Icon } from 'antd-mobile'
import request from '../../utils/request.js'

class City extends React.Component {

  state = {
    cityList: []
  }

  loadData = async () => {
    const res = await request({url: 'area/city', params: {level: 1}})
    this.setState({
      cityList: res.body
    })
  }

  componentDidMount () {
    this.loadData()
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

      </div>
    )
  }
}

export default City
