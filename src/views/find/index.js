/*
  列表找房模块
*/
import React from 'react'
import { Flex } from 'antd-mobile'
import { getCurrentCity } from '../../utils/config.js'
import './index.scss'

class Find extends React.Component {

  state = {
    cityName: ''
  }

  componentDidMount () {
    getCurrentCity().then(res => {
      this.setState({
        cityName: res.label
      })
    })
  }

  render () {
    return (
      <div>
        {/*导航栏*/}
        <Flex className='header'>
          <i onClick={() => {
            // 点击时，跳转到主页
            this.props.history.push('/home')
          }} className="iconfont icon-back" />
          <Flex className='search-box searchHeader'>
            {/* 左侧白色区域 */}
            <Flex className="search">
              {/* 位置 */}
              <div className="location" onClick={() => {
                // 点击城市名称，去切换城市
                this.props.history.push('/city')
              }}>
                <span className="name">{this.state.cityName}</span>
                <i className="iconfont icon-arrow" />
              </div>
              {/* 搜索表单 */}
              <div className="form" >
                <i className="iconfont icon-seach" />
                <span className="text">请输入小区或地址</span>
              </div>
            </Flex>
            {/* 右侧地图图标 */}
            <i className="iconfont icon-map" />
          </Flex>
        </Flex>
      </div>
    )
  }
}

export default Find
