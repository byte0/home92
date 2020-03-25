/*
  城市选择
*/

import React from 'react'
import { NavBar, Icon } from 'antd-mobile'

class City extends React.Component {
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
